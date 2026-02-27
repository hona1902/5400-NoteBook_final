import os
import glob
import re

def is_vietnamese(text):
    vn_chars = set('áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ')
    return any(c in vn_chars for c in text.lower())

untranslated = []
translated = []
for file in glob.glob('docs/**/*.md', recursive=True):
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            if not is_vietnamese(content):
                untranslated.append(file)
            else:
                translated.append(file)
    except Exception as e:
        print(f'Error reading {file}: {e}')

print('Untranslated files:')
for f in untranslated:
    print(f)
