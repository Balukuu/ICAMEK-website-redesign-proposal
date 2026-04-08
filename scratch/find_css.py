import re

def get_selectors(css_text):
    # Very basic regex to grab selectors and blocks. 
    # Disclaimer: CSS parsing with regex is bad, but works for simple flat files which this is.
    matches = re.finditer(r'([^{}]+?)\s*\{([^{}]*)\}', css_text)
    return {m.group(1).strip(): m.group(0).strip() for m in matches if '@' not in m.group(1)}

with open('assets/css/main.css', 'r', encoding='utf-8') as f:
    main_css = f.read()

with open('scratch/all_styles.css', 'r', encoding='utf-8') as f:
    all_css = f.read()

main_selectors = get_selectors(main_css).keys()
# Normalize selectors to avoid whitespace issues
def norm(sel): return set(s.strip() for s in sel.split(','))

main_normalized = []
for sel in main_selectors:
    main_normalized.extend(norm(sel))
main_normalized = set(main_normalized)

all_blocks = get_selectors(all_css)
missing_blocks = []

for sel, block in all_blocks.items():
    if not sel: continue
    # If ANY component of this selector is missing in main_css, we might want it (heuristic)
    sel_parts = norm(sel)
    # Exclude basic HTML tags, root, navbar, etc. that we know are in main.css
    base_tags = {'html', 'body', '*', '*::before', '*::after', 'a', 'ul', 'img', ':root'}
    if sel_parts.issubset(base_tags): continue
    if any('nav' in s for s in sel_parts): continue
    if any('.reveal' in s for s in sel_parts): continue
    if any('hero' in s for s in sel_parts): continue
    
    if not all(s in main_normalized for s in sel_parts):
        # We don't want to duplicate what we already have
        missing_blocks.append(block)

with open('scratch/missing_css.css', 'w', encoding='utf-8') as f:
    f.write('\n\n'.join(missing_blocks))

