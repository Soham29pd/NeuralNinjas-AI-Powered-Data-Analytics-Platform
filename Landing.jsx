import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // Navbar background on scroll
      setScrolled(window.scrollY > 50);
      
      // Show scroll-to-top button
      setShowScrollTop(window.scrollY > 500);

      // Active section detection
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="landing-container">
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-content">
          <div className="navbar-logo" onClick={() => scrollToTop()}>
            <span className="logo-text">TrendSight</span>
            <span className="logo-badge">AI</span>
          </div>

          <div className="navbar-links">
  <a
    className={activeSection === "hero" ? "active" : ""}
    onClick={() => scrollToSection("hero")}
  >
    Home
  </a>

  <a
    className={activeSection === "platforms" ? "active" : ""}
    onClick={() => scrollToSection("platforms")}
  >
    Platforms
  </a>

  <a
    className={activeSection === "intelligence" ? "active" : ""}
    onClick={() => scrollToSection("intelligence")}
  >
    AI Intelligence
  </a>

  <a
    className={activeSection === "features" ? "active" : ""}
    onClick={() => scrollToSection("features")}
  >
    Features
  </a>

  <a
    className={activeSection === "customers" ? "active" : ""}
    onClick={() => scrollToSection("customers")}
  >
    Solutions
  </a>
</div>


          <div className="navbar-actions">
            <button className="nav-btn secondary" onClick={() => navigate("/auth")}>
              Sign In
            </button>
            <button className="nav-btn primary" onClick={() => navigate("/dashboard")}>
              Launch
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* SCROLL TO TOP BUTTON */}
      <button
        className={`scroll-to-top ${showScrollTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <div className="badge">
          <span className="pulse-dot"></span>
          Enterprise-Grade Intelligence
        </div>
        
        <h1 className="title">TrendSight</h1>
        
        <h2 className="tagline">
          Unified Social Intelligence Platform for Data-Driven Growth
        </h2>

        <p className="description">
          Transform fragmented social data into strategic insights. 
          Make confident decisions backed by <span>AI-powered analytics</span>, 
          <span>predictive modeling</span>, and <span>real-time intelligence</span>.
        </p>

        <div className="hero-buttons">
          <button onClick={() => navigate("/dashboard")} className="primary-btn">
            Launch Platform
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="secondary-btn" onClick={() => navigate("/auth")}>
            Sign In
          </button>
        </div>

        <div className="social-proof">
          <div className="stat">
            <span className="stat-number">10M+</span>
            <span className="stat-label">Data Points Analyzed</span>
          </div>
          <div className="stat">
            <span className="stat-number">Multiple</span>
            <span className="stat-label">Platforms Integrated</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Real-Time Monitoring</span>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="section value-prop">
        <div className="content-wrapper">
          <span className="section-label">The Challenge</span>
          <h2>Scattered Data. Fragmented Insights. Missed Opportunities.</h2>
          <p className="lead">
            Managing multiple social platforms creates data silos that obscure performance patterns 
            and delay critical decisions. Traditional analytics tools show you numbers—but not the story behind them.
          </p>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="section platforms-section" id="platforms">
        <div className="content-wrapper">
          <span className="section-label">Unified Integration</span>
          <h2>One Dashboard. All Your Channels.</h2>
          <p className="lead">
            Seamlessly aggregate data across platforms with enterprise-grade API integrations
          </p>

          <div className="platforms">
            <div className="platform-card">
              <div className="platform-icon instagram"></div>
              <span>Instagram</span>
            </div>
            <div className="platform-card">
              <div className="platform-icon tiktok"></div>
              <span>TikTok</span>
            </div>
            <div className="platform-card">
              <div className="platform-icon youtube"></div>
              <span>YouTube</span>
            </div>
            <div className="platform-card">
              <div className="platform-icon linkedin"></div>
              <span>LinkedIn</span>
            </div>
            <div className="platform-card">
              <div className="platform-icon x"></div>
              <span>X (Twitter)</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI INTELLIGENCE */}
      <section className="section dark intelligence-section" id="intelligence">
        <div className="content-wrapper">
          <span className="section-label">AI-Powered Intelligence</span>
          <h2>From Metrics to Strategic Intelligence</h2>
          <p className="lead">
            Advanced machine learning transforms raw data into actionable business intelligence
          </p>

          <div className="intelligence-grid">
            <div className="intelligence-card">
              <div className="icon-wrapper descriptive">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Descriptive Analytics</h3>
              <p>What happened across all channels</p>
            </div>

            <div className="intelligence-card">
              <div className="icon-wrapper diagnostic">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Diagnostic Analysis</h3>
              <p>Why performance changed</p>
            </div>

            <div className="intelligence-card">
              <div className="icon-wrapper predictive">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 7V10L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Predictive Modeling</h3>
              <p>What to expect next</p>
            </div>

            <div className="intelligence-card featured">
              <div className="icon-wrapper prescriptive">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Prescriptive Recommendations</h3>
              <p>Optimized actions to take now</p>
            </div>
          </div>

          <div className="nlp-feature">
            <div className="nlp-icon">💬</div>
            <div className="nlp-content">
              <h4>Natural Language Queries</h4>
              <p>Ask questions in plain English—get instant, data-backed answers from your complete social presence</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features-section" id="features">
        <div className="content-wrapper">
          <span className="section-label">Platform Capabilities</span>
          <h2>Enterprise Features for Modern Marketers</h2>

          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Cross-Platform Attribution</h3>
              <p>Unified performance tracking with multi-touch attribution modeling</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Content Performance Analysis</h3>
              <p>AI-driven insights on what resonates with your audience segments</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Optimal Timing Intelligence</h3>
              <p>ML-powered predictions for maximum reach and engagement windows</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Audience Segmentation</h3>
              <p>Deep behavioral analysis and demographic profiling across platforms</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Trend Detection Engine</h3>
              <p>Real-time identification of emerging topics and viral patterns</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Automated Reporting</h3>
              <p>Scheduled executive summaries with key performance indicators</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Creative Intelligence</h3>
              <p>Format and style recommendations based on historical performance</p>
            </div>

            <div className="feature-card premium">
              <div className="feature-icon">📄</div>
              <h3>White-Label Reports</h3>
              <p>Professional PDF exports with custom branding for clients</p>
              <span className="premium-badge">Pro</span>
            </div>
          </div>
        </div>
      </section>

      {/* DECISION ENGINE */}
      <section className="section dark engine-section">
        <div className="content-wrapper">
          <span className="section-label">Strategic Automation</span>
          <h2>Decision-to-Execution Engine</h2>
          <p className="lead">
            Eliminate guesswork with AI-generated, ready-to-implement strategies
          </p>

          <div className="engine-grid">
            <div className="engine-card">
              <div className="engine-number">01</div>
              <h4>Publish Schedule Optimization</h4>
              <p>Audience activity patterns analyzed across time zones and platforms</p>
            </div>

            <div className="engine-card">
              <div className="engine-number">02</div>
              <h4>Format Strategy</h4>
              <p>Video, carousel, static, or story—recommended by engagement data</p>
            </div>

            <div className="engine-card">
              <div className="engine-number">03</div>
              <h4>Messaging Architecture</h4>
              <p>Tone, length, and CTA strategies proven to drive conversions</p>
            </div>

            <div className="engine-card">
              <div className="engine-number">04</div>
              <h4>Hashtag Intelligence</h4>
              <p>Optimized tag combinations for reach, trending topics, and niche targeting</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT DNA */}
      <section className="section dna-section">
        <div className="content-wrapper">
          <div className="dna-content">
            <div className="dna-visual">
              <div className="dna-orbit orbit-1"></div>
              <div className="dna-orbit orbit-2"></div>
              <div className="dna-orbit orbit-3"></div>
              <div className="dna-core">🧬</div>
            </div>
            <div className="dna-text">
              <span className="section-label">Adaptive Learning</span>
              <h2>Content DNA Memory System</h2>
              <p className="lead">
                Our proprietary machine learning models continuously analyze your brand's unique 
                voice, audience preferences, and performance patterns. The longer you use TrendSight, 
                the smarter your recommendations become—creating a competitive advantage that compounds over time.
              </p>
              <ul className="dna-features">
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.5 6L7.5 15L3.5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Pattern recognition across historical content
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.5 6L7.5 15L3.5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Audience behavior modeling and segmentation
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.5 6L7.5 15L3.5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Real-time strategy optimization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS MODEL */}
      <section className="section dark business-section">
        <div className="content-wrapper">
          <span className="section-label">Personalization at Scale</span>
          <h2>Your Data. Your Intelligence. Your Advantage.</h2>
          <div className="business-content">
            <p>
              TrendSight delivers a <span>fully personalized intelligence layer</span> built 
              exclusively from your proprietary social media data. Unlike generic analytics tools 
              that offer one-size-fits-all insights, we create a custom analytical framework 
              unique to your brand, industry, and objectives.
            </p>

            <p>
              Each integration creates a <span>proprietary data model</span> that learns your 
              audience's behavior, content preferences, and engagement patterns. Our AI identifies 
              micro-trends invisible to standard analytics—giving you the strategic edge to 
              <span>outperform competitors and maximize ROI</span>.
            </p>

            <div className="business-highlights">
              <div className="highlight">
                <h4>100% Personalized</h4>
                <p>Every dashboard is unique to your brand</p>
              </div>
              <div className="highlight">
                <h4>Proprietary Models</h4>
                <p>Custom AI trained on your performance data</p>
              </div>
              <div className="highlight">
                <h4>Competitive Intelligence</h4>
                <p>Insights your competitors can't access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER SEGMENTS */}
      <section className="section customers-section" id="customers">
        <div className="content-wrapper">
          <span className="section-label">Built For</span>
          <h2>Solutions for Every Scale</h2>

          <div className="customers">
            <div className="customer-card">
              <div className="customer-icon">🎨</div>
              <h3>Content Creators & Influencers</h3>
              <p>
                Maximize engagement and monetization opportunities with data-driven 
                content strategies and brand partnership insights.
              </p>
              <ul>
                <li>Cross-platform growth tracking</li>
                <li>Audience demographic analysis</li>
                <li>Optimal posting schedules</li>
              </ul>
            </div>

            <div className="customer-card">
              <div className="customer-icon">🏢</div>
              <h3>Small & Medium Businesses</h3>
              <p>
                Enterprise-grade analytics without the enterprise price tag. 
                Compete with larger brands through intelligent social strategy.
              </p>
              <ul>
                <li>ROI tracking and attribution</li>
                <li>Competitor benchmarking</li>
                <li>Campaign performance analysis</li>
              </ul>
            </div>

            <div className="customer-card featured">
              <div className="customer-icon">📊</div>
              <h3>Marketing Agencies</h3>
              <p>
                Manage multiple clients with unified dashboards, white-label reports, 
                and automated insights that scale with your portfolio.
              </p>
              <ul>
                <li>Multi-client management</li>
                <li>Custom branded reports</li>
                <li>Team collaboration tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="footer">
        <div className="footer-content">
          <span className="section-label">Ready to Transform Your Strategy?</span>
          <h2>Start Making Data-Driven Decisions Today</h2>
          <p>Join forward-thinking brands leveraging AI-powered social intelligence</p>
          
          <div className="footer-buttons">
           
            <button onClick={() => navigate("/auth")} className="cta-secondary">
              Request Demo
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;