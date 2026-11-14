#!/bin/sh
# Assemble the public site into _site/ (pages, assets and host config only; no README, workflows or docs).
# Used by Cloudflare Pages (build command: sh build.sh, output directory: _site).
set -eu
rm -rf _site
mkdir _site
cp index.html privacy.html terms.html 404.html robots.txt sitemap.xml _headers _site/
cp -r assets .well-known _site/
