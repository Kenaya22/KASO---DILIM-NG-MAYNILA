#!/usr/bin/env python3
"""Generate the game's illustrations with Google Gemini, using the prompts in docs/art-prompts.json.

Setup:   get an API key at https://aistudio.google.com/apikey, then
         export GEMINI_API_KEY=your-key            (Windows: set GEMINI_API_KEY=your-key)

Examples:
  python3 tools/gemini_art.py --dry-run                     # list what would be made, no API calls
  python3 tools/gemini_art.py --group chars --required-only  # every character's base image
  python3 tools/gemini_art.py --only "c1-"                   # everything for Case #001
  python3 tools/gemini_art.py --group chars                  # characters incl. expressions
  python3 tools/gemini_art.py                                # everything still missing

What it does:
  * skips images that already exist (use --overwrite to redo one, e.g. with --only "chars/kanor.png")
  * makes base images before their variants, and sends the base as the reference image for expressions
    and for "after" clue sprites, so they match
  * sends a style reference (default: assets/art/chars/mateo.png) with every other image so the whole
    game keeps one look
  * saves into assets/art/<file>, then updates assets/art/manifest.json
"""
import argparse
import base64
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(ROOT, 'assets', 'art')
API = 'https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent'
ASPECT = {'chars': '2:3', 'scenes': '3:2', 'bg': '3:2', 'clues': '1:1'}
STYLE_NOTE = ('STYLE REFERENCE: the attached image only shows the art style to match exactly — line weight, '
              'colour palette, shading and level of detail. Do NOT copy its subject, pose or background. ')
REF_RE = re.compile(r'Use (\S+?\.png) as the reference image')


def mime_of(path):
    return 'image/png' if path.lower().endswith('.png') else 'image/jpeg'


def part_for(path):
    with open(path, 'rb') as f:
        return {'inline_data': {'mime_type': mime_of(path), 'data': base64.b64encode(f.read()).decode()}}


def order_key(it):
    f = it['file']
    rank = {'chars': 0, 'scenes': 2, 'clues': 3, 'bg': 5}[it['grp']]
    if it['grp'] == 'chars' and REF_RE.search(it['text']):
        rank = 1
    if it['grp'] == 'clues' and f.endswith('-after.png'):
        rank = 4
    return (0 if it['req'] else 1, rank, f)


def call(model, key, parts, aspect, retries=5):
    body = {'contents': [{'role': 'user', 'parts': parts}],
            'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': aspect}}}
    data = json.dumps(body).encode()
    for attempt in range(retries):
        req = urllib.request.Request(API % model, data=data, method='POST',
                                     headers={'Content-Type': 'application/json', 'x-goog-api-key': key})
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                res = json.loads(r.read().decode())
            for cand in res.get('candidates', []):
                for p in cand.get('content', {}).get('parts', []):
                    blob = p.get('inlineData') or p.get('inline_data')
                    if blob and blob.get('data'):
                        return base64.b64decode(blob['data'])
            reason = (res.get('candidates') or [{}])[0].get('finishReason') or res.get('promptFeedback')
            raise RuntimeError('no image in the answer (%s)' % reason)
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors='replace')[:300]
            if e.code in (429, 500, 502, 503, 504) and attempt < retries - 1:
                wait = 15 * (attempt + 1)
                print('    busy (%d), waiting %ds...' % (e.code, wait))
                time.sleep(wait)
                continue
            raise RuntimeError('HTTP %d: %s' % (e.code, msg))
        except (urllib.error.URLError, TimeoutError) as e:
            if attempt < retries - 1:
                time.sleep(10)
                continue
            raise RuntimeError(str(e))
    raise RuntimeError('gave up after %d tries' % retries)


def save_png(raw, dest):
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    try:
        from PIL import Image  # optional: converts JPEG answers to real PNG
        import io
        Image.open(io.BytesIO(raw)).save(dest, 'PNG', optimize=True)
    except ImportError:
        with open(dest, 'wb') as f:
            f.write(raw)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--style', default='komiks', choices=['komiks', 'pixel'])
    ap.add_argument('--group', choices=['chars', 'scenes', 'clues', 'bg'])
    ap.add_argument('--only', help='only files whose name contains this text (or matches this regex)')
    ap.add_argument('--required-only', action='store_true')
    ap.add_argument('--limit', type=int, default=0, help='stop after this many new images')
    ap.add_argument('--overwrite', action='store_true')
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--model', default=os.environ.get('GEMINI_IMAGE_MODEL', 'gemini-2.5-flash-image'))
    ap.add_argument('--style-ref', default='chars/mateo.png', help="file inside assets/art used as the style reference ('' = none)")
    ap.add_argument('--delay', type=float, default=4.0, help='seconds between requests')
    a = ap.parse_args()

    with open(os.path.join(ROOT, 'docs', 'art-prompts.json'), encoding='utf-8') as f:
        items = json.load(f)[a.style]
    if a.group:
        items = [it for it in items if it['grp'] == a.group]
    if a.required_only:
        items = [it for it in items if it['req']]
    if a.only:
        rx = re.compile(a.only)
        items = [it for it in items if a.only in it['file'] or rx.search(it['file'])]
    items.sort(key=order_key)
    todo = [it for it in items if a.overwrite or not os.path.exists(os.path.join(ART, it['file']))]
    if a.limit:
        todo = todo[:a.limit]
    print('%d prompts match, %d to make (%s style, model %s)' % (len(items), len(todo), a.style, a.model))
    if a.dry_run:
        for it in todo:
            print('  ' + it['file'])
        return
    key = os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_API_KEY')
    if not key:
        sys.exit('Set GEMINI_API_KEY first (get one at https://aistudio.google.com/apikey).')
    style_ref = os.path.join(ART, a.style_ref) if a.style_ref else ''
    made = failed = 0
    for i, it in enumerate(todo, 1):
        dest = os.path.join(ART, it['file'])
        parts, text = [], it['text']
        m = REF_RE.search(text)
        if m:
            ref = os.path.join(ART, m.group(1))
            if not os.path.exists(ref):
                print('[%d/%d] skip %s — make %s first' % (i, len(todo), it['file'], m.group(1)))
                continue
            parts.append(part_for(ref))
        elif style_ref and os.path.exists(style_ref) and os.path.abspath(style_ref) != os.path.abspath(dest):
            parts.append(part_for(style_ref))
            text = STYLE_NOTE + text
        parts.insert(0, {'text': text})
        aspect = '16:9' if it['file'] == 'bg/desk.png' else ASPECT[it['grp']]
        print('[%d/%d] %s ...' % (i, len(todo), it['file']), flush=True)
        try:
            save_png(call(a.model, key, parts, aspect), dest)
            made += 1
        except Exception as e:  # keep going with the rest
            failed += 1
            print('    FAILED: %s' % e)
        time.sleep(a.delay)
    print('done: %d made, %d failed' % (made, failed))
    os.system('"%s" "%s"' % (sys.executable, os.path.join(ROOT, 'tools', 'art_manifest.py')))


if __name__ == '__main__':
    main()
