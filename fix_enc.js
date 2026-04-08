const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Explicit long broken strings
    content = content.replace(/ÃƒÂ°Ã…Â¸Ã‚Â Ã‚Â¢,ÃƒÂ¢Ã…Â¡Ã¢â‚¬â€œ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â/g, "");
    content = content.replace(/ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¡ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“/g, "");
    content = content.replace(/ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ/g, "");
    content = content.replace(/ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â/g, "");
    content = content.replace(/ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“/g, "");
    
    // The A broken sequences
    content = content.replace(/AAA\?sAA,A\?/g, "");
    content = content.replace(/AAA\.AA,\?o/g, "");
    content = content.replace(/AAA\.A,A,A\?A,A/g, "");
    content = content.replace(/AAA\.A,A,A\?A,A/g, "");
    
    // The copyright broken sequence
    content = content.replace(/A\?sA,Ac/g, "&copy;");
    
    // General fallback for Ã followed by garbled chars
    let weirdRegex = /Ã(?:ƒÆ’|‚Â¢|ƒâ€¦|‚Â¡|ƒÂ¢|¢â€š|¬¢â‚¬|Å“|ƒÂ°|Å¸|‚|¢|ƒ|¢|…|¡|â‚¬|â€|œ)[\S]{0,30}\s?/g;
    content = content.replace(weirdRegex, "");

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Encoding fix complete!");
