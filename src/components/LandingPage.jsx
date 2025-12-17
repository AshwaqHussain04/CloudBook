import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">CloudBook</h1>
          <p className="hero-subtitle">Your Personal Cloud Note Taking App</p>
          <p className="hero-description">
            Keep your thoughts organized, secure, and always accessible
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary btn-lg hero-btn">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-primary btn-lg hero-btn">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose CloudBook?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">☁️</div>
            <h3>Cloud Storage</h3>
            <p>Access your notes anytime, anywhere from any device</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Your notes are encrypted and protected with authentication</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Priority System</h3>
            <p>Mark notes by importance to focus on what matters</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Organize</h3>
            <p>Manage and categorize your notes with ease</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Rich Content</h3>
            <p>Add titles, descriptions, and importance levels</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Reliable</h3>
            <p>Quick sync and instant access to your data</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Create Account</h4>
            <p>Sign up with your email and secure password</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h4>Add Notes</h4>
            <p>Create notes with title, description, and importance level</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h4>Organize</h4>
            <p>Manage your notes and track progress</p>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <h4>Sync</h4>
            <p>All your notes are synced to the cloud automatically</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of users who are organizing their thoughts with CloudBook</p>
        <Link to="/signup" className="btn btn-primary btn-lg">
          Create Your Account Now
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
