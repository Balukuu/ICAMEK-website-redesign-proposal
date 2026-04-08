import os
import glob

new_link = '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">'

for html_file in glob.glob('*.html'):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace google fonts link
    # The exact string may be long, let's target just the font part or the whole link.
    # Searching for the exact link if we know it:
    old_fonts = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@400;500;600;700&display=swap'
    if old_fonts in content:
        content = content.replace(old_fonts, 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;500;600;700&display=swap')

    # Replace fonts in CSS universally
    content = content.replace("'Cinzel', serif", "'Montserrat', sans-serif")
    content = content.replace("'Libre Baskerville', serif", "'Montserrat', sans-serif")
    content = content.replace("'Inter', sans-serif", "'Open Sans', sans-serif")
    content = content.replace("'Open Sans', sans-serif", "'Open Sans', sans-serif") # safe
    
    # Hero adjustments
    if html_file == 'index.html':
        # Remove radial gradients that overlay and make text hard to read
        # Current CSS:
        # background: #0D1B2E;
        # background: radial-gradient...;
        
        # We can just clear the whole background gradient string if we find it.
        import re
        content = re.sub(r'background:\s*radial-gradient[^;]+;', '', content)
        
        # Change padding and spacing
        content = content.replace('padding-top: 100px;\n      padding-bottom: 60px;', 'padding-top: 160px;\n      padding-bottom: 100px;')
        content = content.replace('padding-top: 100px;\r\n      padding-bottom: 60px;', 'padding-top: 160px;\n      padding-bottom: 100px;')
        
        content = content.replace('line-height: 1.1;\n      max-width: 800px;\n      margin-bottom: 28px;', 'line-height: 1.2;\n      max-width: 900px;\n      margin-bottom: 35px;\n      letter-spacing: 0.04em;')
        content = content.replace('line-height: 1.1;\r\n      max-width: 800px;\r\n      margin-bottom: 28px;', 'line-height: 1.2;\n      max-width: 900px;\n      margin-bottom: 35px;\n      letter-spacing: 0.04em;')

        content = content.replace('Dispute Resolution for Uganda and East Africa', 'RESOLUTION FOR UGANDA AND EAST AFRICA')
        
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updates completed successfully.")
