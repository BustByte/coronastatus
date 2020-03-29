#!/usr/bin/env bash
cat ./README.md | grep '^\-' | grep 'https://corona' | cut -c3-4 | paste -sd " " - | sed 's/ //g'
