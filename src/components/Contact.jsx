import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaCopy,
  FaCheck,
  FaDownload,
  FaShieldAlt,
  FaCloud
} from 'react-icons/fa';
import './Contact.css';

// EmailJS configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_96qa7si',
  TEMPLATE_ID: 'template_jlzq23n',
  PUBLIC_KEY: '-Pw0JM1xRb99AFGor'
};

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Spam protection field
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [copiedEmail, setCopiedEmail] = useState(false);
  const formRef = useRef(null);

  // Contact information
  const contactInfo = {
    email: 'elanibrimohammed2016@gmail.com',
    phone: '+212 653-785089',
    location: 'Casablanca, Morocco',
    linkedin: 'https://www.linkedin.com/in/elanibri-mohamed',
    github: 'https://github.com/elanibri',
    resumePath: 'ELANIBRI-Mohamed_Resume.pdf'
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    // Honeypot check - if filled, it's likely a bot
    if (formData.honeypot) {
      newErrors.honeypot = 'Spam detected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Send email using EmailJS
    try {
      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: '',
        honeypot: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Copy email to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="contact" id="contact">
      <motion.div 
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="contact-header" variants={itemVariants}>
          <div className="contact-header-icon">
            <FaShieldAlt className="shield-icon" />
            <FaCloud className="cloud-icon" />
          </div>
          <h2 className="contact-title">Let's Connect</h2>
          <p className="contact-subtitle">
            Seeking opportunities in cybersecurity and cloud engineering. 
            Let's discuss how I can contribute to your organization's security infrastructure.
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Form */}
          <motion.div className="contact-form-wrapper" variants={itemVariants}>
            <div className="contact-card">
              <h3 className="card-title">
                <FaPaperPlane className="card-icon" />
                Send a Message
              </h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
                {/* Honeypot field - hidden from users, visible to bots */}
                <div className="honeypot-field" aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="John Doe"
                    aria-required="true"
                    aria-invalid={errors.fullName ? 'true' : 'false'}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  />
                  {errors.fullName && (
                    <span id="fullName-error" className="error-message" role="alert">
                      <FaExclamationCircle /> {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="john@example.com"
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" className="error-message" role="alert">
                      <FaExclamationCircle /> {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject <span className="optional">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Job Opportunity / Collaboration / Question"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                    placeholder="Tell me about the opportunity or how I can help..."
                    rows="5"
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" className="error-message" role="alert">
                      <FaExclamationCircle /> {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <motion.div 
                    className="status-message success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                  >
                    <FaCheckCircle />
                    <div>
                      <strong>Message sent successfully!</strong>
                      <p>Thank you for reaching out. I'll get back to you within 24-48 hours.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    className="status-message error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                  >
                    <FaExclamationCircle />
                    <div>
                      <strong>Failed to send message</strong>
                      <p>Please try again or contact me directly via email.</p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Information Panel */}
          <motion.div className="contact-info-wrapper" variants={itemVariants}>
            <div className="contact-card">
              <h3 className="card-title">
                <FaShieldAlt className="card-icon" />
                Contact Information
              </h3>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <FaEnvelope />
                  </div>
                  <div className="contact-item-content">
                    <span className="contact-label">Email</span>
                    <div className="contact-value-wrapper">
                      <a 
                        href={`mailto:${contactInfo.email}`}
                        className="contact-value"
                      >
                        {contactInfo.email}
                      </a>
                      <button 
                        className="copy-btn"
                        onClick={copyToClipboard}
                        title={copiedEmail ? 'Copied!' : 'Copy email'}
                        aria-label={copiedEmail ? 'Email copied' : 'Copy email to clipboard'}
                      >
                        {copiedEmail ? <FaCheck /> : <FaCopy />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <FaPhone />
                  </div>
                  <div className="contact-item-content">
                    <span className="contact-label">Phone</span>
                    <a 
                      href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                      className="contact-value"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-item-content">
                    <span className="contact-label">Location</span>
                    <span className="contact-value">{contactInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-links">
                <h4 className="social-title">Connect With Me</h4>
                <div className="social-icons">
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link linkedin"
                    aria-label="Visit my LinkedIn profile"
                  >
                    <FaLinkedin />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link github"
                    aria-label="Visit my GitHub profile"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="social-link email"
                    aria-label="Send me an email"
                  >
                    <FaEnvelope />
                    <span>Email</span>
                  </a>
                </div>
              </div>

              {/* Download CV Button */}
              <div className="cv-section">
                <h4 className="cv-title">Download My Resume</h4>
                <a
                  href={contactInfo.resumePath}
                  download="ELANIBRI-Mohamed_Resume.pdf"
                  className="cv-btn"
                >
                  <FaDownload />
                  <span>Download CV</span>
                </a>
                <p className="cv-note">
                  PDF format • Updated February 2026
                </p>
              </div>
            </div>

            {/* Availability Card */}
            <motion.div 
              className="availability-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="availability-status">
                <span className="status-dot available" />
                <span className="status-text">Available for Opportunities</span>
              </div>
              <p className="availability-text">
                Currently seeking roles in <strong>Cybersecurity</strong> and <strong>Cloud Engineering</strong>. 
                Open to full-time positions, internships, and freelance projects.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
