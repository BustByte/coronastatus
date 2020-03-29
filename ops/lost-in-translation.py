from subprocess import call, check_output, STDOUT
from json import loads as decode_json, JSONDecodeError

'''
   This script finds all the english translation keys across
   all commits (including branches and pull requests) for each
   locale.json in app/locales. Afterwards it looks at each locale
   separately to see if it's missing any one the english keys.

   Usage: python3 ops/lost-in-translation.py
   Important: You need to run it from the root directory.
'''

def git(*args):
    '''Calls git cli with arguments.'''
    stdout = check_output(['git', *args], stderr=STDOUT)
    return stdout

def find_commit_hashes_for_file(file_path):
    '''Returns the commit hashes for a file path across all local branches.'''
    lines = git('log', '--pretty=format:"%h"', '--all', '--', file_path)
    hashes = [line.replace('"', '') for line in lines.decode('utf-8').split('\n')]
    return hashes

def retrieve_json_for_file_at_commit_hash(file_path, commit_hash):
   '''Returns the JSON representation of the contents of a file at certain commit hash.'''
   contents_at_commit_hash = git('show', '%s:%s' % (commit_hash, file_path))
   try:
       json = decode_json(contents_at_commit_hash.decode('utf-8'))
       return json
   except JSONDecodeError:
       # Sometimes the file is not in a proper JSON format. We simply return nothing in that case.
       return {}

if __name__ == '__main__':
    all_locales = ('no', 'se', 'en-IN')
    
    # Step 1: Find all the (english) translation keys across all branches and PRs.
    #
    # If a Dutch developer has made a feature in a branch, we expect that him/her added a key
    # to one or many locale files (usually the english locale (en.json) or to their own locale
    # file (nl.json), or both).
    #
    # But they probably haven't added translations to all the other locales, because they don't
    # speak the other languages. And this is the problem, because now we need find people to help
    # translate the added keys to all the other locales.
    #
    # So what we do here is simply to find *all* the english translation keys across the entire
    # project. That means looking at all the english translations keys in all the locale files
    # since the start of the project across all branches and PRs. We throw them into a set that
    # we use in the next step.
    all_english_translation_keys = set([])
    for locale in all_locales:
        file_path = 'app/locales/%s.json' % locale
        for commit_hash in find_commit_hashes_for_file(file_path):
            translation = retrieve_json_for_file_at_commit_hash(file_path, commit_hash)
            all_english_translation_keys.update(translation.keys())

    # Step 2: For each locale file check if there are any missing english translation keys
    #         across all branches and PRs and all commits/changes.
    #
    # If there's a missing english translation key, we know that we're most likely missing
    # a translation for that locale. So what we need to do is to translate it, or get help
    # to translate it.
    # 
    # We throw it into a dictionary where the key is the locale and the value is a set of 
    # missing translations from english to that locale.
    translation_keys_by_locale = {}
    for locale in all_locales:
        file_path = 'app/locales/%s.json' % locale
        for commit_hash in find_commit_hashes_for_file(file_path):
            translation = retrieve_json_for_file_at_commit_hash(file_path, commit_hash)
            translation_keys_by_locale[locale] = translation_keys_by_locale.get(locale, set()).union(translation.keys())

    # Step 3: Print out the missing keys for each locale.
    for locale in all_locales:
        for english_translation_key in all_english_translation_keys:
            if not english_translation_key in translation_keys_by_locale[locale]:
                print(locale, 'missing translation for:', english_translation_key)
