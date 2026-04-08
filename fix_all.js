const fs = require('fs');
const path = require('path');

const standardFooter = `  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div>
          <div class="footer-brand-name">ICAMEK</div>
          <div class="footer-brand-sub">International Centre for Arbitration and Mediation in Kampala</div>
          <p class="footer-brand-desc">Uganda's first private sector-led institution for world-class Alternative Dispute Resolution, serving businesses, governments, and communities across East Africa.</p>
          <div class="footer-social">
            <a href="https://ug.linkedin.com/company/international-centre-for-arbitration-and-mediation-in-kampala" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://www.facebook.com/ICAMEKUG/" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon" aria-label="Twitter/X"><i class="fab fa-x-twitter"></i></a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Services</div>
          <ul class="footer-links">
            <li><a href="services.html#arbitration" class="footer-link">Arbitration</a></li>
            <li><a href="services.html#mediation" class="footer-link">Mediation</a></li>
            <li><a href="services.html#conciliation" class="footer-link">Conciliation</a></li>
            <li><a href="training.html" class="footer-link">Training & Accreditation</a></li>
            <li><a href="services.html#venue" class="footer-link">Venue & Facilities</a></li>
            <li><a href="services.html#secretariat" class="footer-link">Secretariat Services</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">Quick Links</div>
          <ul class="footer-links">
            <li><a href="index.html" class="footer-link">Home</a></li>
            <li><a href="about.html" class="footer-link">About Us</a></li>
            <li><a href="arbitration-rules.html" class="footer-link">Arbitration Rules</a></li>
            <li><a href="mediation-rules.html" class="footer-link">Mediation Rules</a></li>
            <li><a href="news.html" class="footer-link">News & Events</a></li>
            <li><a href="contact.html" class="footer-link">Contact Us</a></li>
            <li><a href="https://icamek.org/wp-content/uploads/2022/01/ICAMEK-ARBITRATION-RULES-2018.pdf" class="footer-link" target="_blank"> Arbitration Rules PDF</a></li>
            <li><a href="https://icamek.org/wp-content/uploads/2022/01/ICAMEK-MEDIATION-RULES-2018.pdf" class="footer-link" target="_blank"> Mediation Rules PDF</a></li>
            <li><a href="https://icamek.org/wp-content/uploads/2022/01/ICAMEK-Request-for-Arbitration_Application-for-appointment-of-Arbitrator-Form.pdf" class="footer-link" target="_blank"> Request for Arbitration Form</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">Contact</div>
          <div class="footer-contact-item">
            <i class="fas fa-map-marker-alt footer-contact-icon"></i>
            <div class="footer-contact-text">4th Floor, Trust Tower, Nakasero Road, Kampala, Uganda</div>
          </div>
          <div class="footer-contact-item">
            <i class="fas fa-envelope footer-contact-icon"></i>
            <div class="footer-contact-text"><a href="mailto:admin@icamek.org">admin@icamek.org</a></div>
          </div>
          <div class="footer-contact-item">
            <i class="fas fa-folder-open footer-contact-icon"></i>
            <div class="footer-contact-text"><a href="mailto:file@icamek.org">file@icamek.org</a><br><span style="font-size: 0.78rem; color: rgba(255,255,255,0.4);">For filing cases</span></div>
          </div>
          <div class="footer-contact-item">
            <i class="fas fa-clock footer-contact-icon"></i>
            <div class="footer-contact-text">Monday Friday, 9:00 AM 5:00 PM</div>
          </div>
        </div>
      </div>
      <div class="footer-partners">
        <div class="footer-partners-title">Founding Partners & Supporters</div>
        <div class="footer-partners-logos">
          <div class="footer-partner-logo"><span>Uganda Law Society</span></div>
          <div class="footer-partner-logo"><span>Uganda Bankers' Association</span></div>
          <div class="footer-partner-logo"><span>Private Sector Foundation Uganda</span></div>
          <div class="footer-partner-logo"><span>Bank of Uganda</span></div>
          <div class="footer-partner-logo"><span>Uganda Insurers Association</span></div>
          <div class="footer-partner-logo"><span>Justice, Law & Order Sector</span></div>
          <div class="footer-partner-logo"><span>Uganda Judiciary</span></div>
          <div class="footer-partner-logo"><span>Ministry of Justice</span></div>
          <div class="footer-partner-logo"><span>KACITA</span></div>
          <div class="footer-partner-logo"><span>ICPAU</span></div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">2026 International Centre for Arbitration and Mediation in Kampala (ICAMEK). All rights reserved.</div>
        <div class="footer-authority">An Appointing Authority by the Minister of Justice &mdash; Instrument issued 23 April 2019</div>
      </div>
    </div>
  </footer>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  if (file === 'index.html' || file === 'about.html' || file === 'services.html') return; // already fixed footer manually but let's just make sure
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // fix corrupted <section> tags right before footer
  content = content.replace(/<\/secti?o?n?(\s+)?<footer/g, '</section>\n  <footer');

  // replace entire footer block with the standardized one
  content = content.replace(/<!--.*?FOOTE.*?<footer\s+class="footer">.*?<\/footer>([>a-zA-Z\n\s]*)/s, standardFooter + '\n\n');
  content = content.replace(/<footer\s+class="footer">.*?<\/footer>([>a-zA-Z]*)/s, standardFooter);

  // remove CTAs
  content = content.replace(/<a\s+href="contact\.html#file-a-case"\s+class="nav-cta">File a Case<\/a>/g, '<!-- Removed File a Case CTA -->');
  content = content.replace(/<a\s+href="contact\.html#file-a-case"\s+class="mobile-menu-cta">File a Case<\/a>/g, '<!-- Removed File a Case CTA -->');
  content = content.replace(/<a\s+href="contact\.html#file-a-case"\s+class="float-file-btn"[^>]*>File a Case<\/a>/g, '<!-- Removed Floating File a Case Button -->');

  // fix script tags
  content = content.replace(/<\/script>ript>/g, '</script>');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed ' + file);
  }
});
