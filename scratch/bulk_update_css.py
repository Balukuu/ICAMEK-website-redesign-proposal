import os
import re

# Path to the directory
directory = "c:/Users/spidd16/Downloads/ICAMEK website redesign proposal"
css_link = '<link rel="stylesheet" href="assets/css/main.css">'

def update_html_files():
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Replace internal <style> block
            # This regex finds the first <style>...</style> block
            new_content = re.sub(r'<style>.*?</style>', css_link, content, flags=re.DOTALL)
            
            if content != new_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename}")
            else:
                print(f"No <style> block found in {filename} or already updated")

if __name__ == "__main__":
    update_html_files()
