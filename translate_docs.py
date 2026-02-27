import os
import glob
import re
import time
from deep_translator import GoogleTranslator

def is_vietnamese(text):
    vn_chars = set('áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ')
    return any(c in vn_chars for c in text.lower())

def clean_markdown_translation(text):
    if not text:
        return text
    # Fix markdown links: [text] (site) -> [text](site)
    text = re.sub(r'\]\s+\(', '](', text)
    # Fix bold text: ** text ** -> **text**
    text = re.sub(r'\*\*\s+(.*?)\s+\*\*', r'**\1**', text)
    return text

def translate_markdown(text):
    translator = GoogleTranslator(source='en', target='vi')
    
    # Extract code blocks to not translate them
    code_blocks = []
    
    def replace_code_block(match):
        code_blocks.append(match.group(0))
        return f"\n\n---CODEBLOCK_{len(code_blocks)-1}---\n\n"
        
    text_no_code = re.sub(r'```[\s\S]*?```', replace_code_block, text)
    
    # Chunk by newlines to respect structure
    blocks = text_no_code.split('\n\n')
    translated_blocks = []
    
    for idx, block in enumerate(blocks):
        block = block.strip()
        if not block:
            translated_blocks.append("")
            continue
            
        if block.startswith('---CODEBLOCK_'):
            translated_blocks.append(block)
            continue
            
        # Try to translate
        try:
            # If it's a markdown table or something structurally complex, we try our best
            # But deep-translator limits 5000 chars, chunk shouldn't be larger
            if len(block) > 4500:
                translated_blocks.append(block) # Fallback for huge blocks
                continue
                
            res = translator.translate(block)
            time.sleep(0.5) # Avoid rate limiting
            if res is None:
                res = block
            else:
                res = clean_markdown_translation(res)
            translated_blocks.append(res)
            print(f"Translated block {idx+1}/{len(blocks)}")
        except Exception as e:
            print(f"Error translating: {e}")
            translated_blocks.append(block)

    res_text = '\n\n'.join(translated_blocks)
    
    # Restore code blocks
    for i, code in enumerate(code_blocks):
        res_text = res_text.replace(f"---CODEBLOCK_{i}---", code)
        
    return res_text

files_translated = 0
for file in glob.glob('docs/**/*.md', recursive=True):
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if not is_vietnamese(content):
            print(f"Translating {file}...")
            translated_content = translate_markdown(content)
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(translated_content)
                
            files_translated += 1
            print(f"Done translating {file}\n")
    except Exception as e:
        print(f'Error processing {file}: {e}')

print(f"\nAll done! Translated {files_translated} files.")
