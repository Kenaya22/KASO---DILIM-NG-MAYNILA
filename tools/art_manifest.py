#!/usr/bin/env python3
"""List the illustration files in assets/art/ so the game knows which ones exist.

Usage:  python3 tools/art_manifest.py            (komiks / smooth art)
        python3 tools/art_manifest.py --pixel    (pixel art: keeps pixels crisp)

Run it every time you add, rename or delete an image in assets/art/.
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(ROOT, 'assets', 'art')
EXT = ('.png', '.jpg', '.jpeg', '.webp')


def main():
    os.makedirs(ART, exist_ok=True)
    files = []
    for folder in ('chars', 'scenes', 'clues', 'bg'):
        d = os.path.join(ART, folder)
        if not os.path.isdir(d):
            continue
        for name in sorted(os.listdir(d)):
            if name.lower().endswith(EXT):
                if not name.endswith('.png'):
                    print('  note: %s/%s — the game looks for .png names; convert or rename it' % (folder, name))
                files.append(folder + '/' + name)
    path = os.path.join(ART, 'manifest.json')
    old = {}
    if os.path.exists(path):
        with open(path) as f:
            old = json.load(f)
    pixel = '--pixel' in sys.argv or (old.get('pixel', False) and '--smooth' not in sys.argv)
    with open(path, 'w') as f:
        json.dump({'pixel': pixel, 'layout': os.path.exists(os.path.join(ART, 'layout.json')), 'files': files}, f, indent=1)
    print('assets/art/manifest.json: %d images (%s)' % (len(files), 'pixel art' if pixel else 'smooth art'))


if __name__ == '__main__':
    main()
