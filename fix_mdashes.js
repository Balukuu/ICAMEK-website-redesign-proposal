const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(/ICAMEK\s{2,}International/g, 'ICAMEK &mdash; International');
  content = content.replace(/ICAMEK\s{2,}Uganda/g, 'ICAMEK &mdash; Uganda');
  content = content.replace(/ICAMEK\s{2,}Arbitration/g, 'ICAMEK &mdash; Arbitration');
  
  content = content.replace(/courts\s{2,}offering/g, 'courts &mdash; offering');
  content = content.replace(/2019\s{2,}Trust Tower/g, '2019 &mdash; Trust Tower');
  content = content.replace(/Road\s{2,}one of Kampala/g, 'Road &mdash; one of Kampala');
  content = content.replace(/addresses\s{2,}ICAMEK/g, 'addresses &mdash; ICAMEK');
  content = content.replace(/addresses\s{2,}the facilities/g, 'addresses &mdash; the facilities');
  
  content = content.replace(/dispute\s{2,}this informs/g, 'dispute &mdash; this informs');
  content = content.replace(/arbitrator\s{2,}important/g, 'arbitrator &mdash; important');
  content = content.replace(/availability\s{2,}must/g, 'availability &mdash; must');
  content = content.replace(/balance\s{2,}balance/g, 'balance &mdash; balance');
  content = content.replace(/Diversity\s{2,}where/g, 'Diversity &mdash; where');
  content = content.replace(/author\">\s{2,}ICAMEK/g, 'author\">&mdash; ICAMEK');
  
  content = content.replace(/conciliation\s{2,}ensuring/g, 'conciliation &mdash; ensuring');
  content = content.replace(/Avoidance\s{2,}presented/g, 'Avoidance &mdash; presented');
  
  fs.writeFileSync(file, content, 'utf8');
}

fixFile('about.html');
fixFile('services.html');
console.log('Fixed em-dashes');
