#!/usr/bin/env python3
"""Build release files for Kaso: Dilim ng Maynila.

Usage:  python3 tools/build.py

Creates in dist/:
  kaso-dilim-ng-maynila-web.zip  -> upload to itch.io as an HTML5 game (index.html is at the root of the zip)
  kaso-dilim-ng-maynila.html     -> single self-contained file (open in any browser, works offline except Google Fonts)
"""
import base64
import os
import re
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, 'dist')
FILES = ['index.html', 'manifest.json', 'sw.js', 'css/style.css', 'assets/cover.jpg', 'assets/icon-192.png', 'assets/icon-512.png']


def read(rel):
    with open(os.path.join(ROOT, rel), encoding='utf-8') as f:
        return f.read()


def script_list(html):
    return re.findall(r'<script src="(js/[^"]+)"></script>', html)


def build_zip(html):
    out = os.path.join(DIST, 'kaso-dilim-ng-maynila-web.zip')
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
        for rel in FILES + script_list(html):
            z.write(os.path.join(ROOT, rel), rel)
    return out


def build_single(html):
    css = read('css/style.css')
    with open(os.path.join(ROOT, 'assets/cover.jpg'), 'rb') as f:
        cover = 'data:image/jpeg;base64,' + base64.b64encode(f.read()).decode()
    css = css.replace("url('../assets/cover.jpg')", "url('" + cover + "')")
    html = html.replace('<link rel="stylesheet" href="css/style.css">', '<style>\n' + css + '\n</style>')
    html = re.sub(r'<link rel="(manifest|icon|apple-touch-icon)"[^>]*>\n?', '', html)
    for rel in script_list(html):
        html = html.replace('<script src="%s"></script>' % rel, '<script>\n' + read(rel) + '\n</script>')
    out = os.path.join(DIST, 'kaso-dilim-ng-maynila.html')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(html)
    return out


if __name__ == '__main__':
    os.makedirs(DIST, exist_ok=True)
    page = read('index.html')
    for path in (build_zip(page), build_single(page)):
        print('%-60s %8.1f KB' % (os.path.relpath(path, ROOT), os.path.getsize(path) / 1024))
