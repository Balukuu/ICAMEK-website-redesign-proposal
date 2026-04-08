const fs = require('fs');
const glob = require('fs').readdirSync('.');

const htmlFiles = glob.filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace cropped logo with white logo
    content = content.replace(/https:\/\/icamek\.org\/wp-content\/uploads\/2021\/11\/cropped-logo-32x32\.png/g, "https://icamek.org/wp-content/uploads/2021/11/icamek-logo-white.png");
    content = content.replace(/https:\/\/icamek\.org\/wp-content\/uploads\/2021\/11\/cropped-logo-180x180\.png/g, "https://icamek.org/wp-content/uploads/2021/11/icamek-logo-white.png");

    fs.writeFileSync(file, content, 'utf8');
});

console.log("Favicon updated to white logo!");
