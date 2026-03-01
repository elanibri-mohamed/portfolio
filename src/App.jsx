import { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';

// Lazy load components for better performance
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Internships = lazy(() => import('./components/Internships'));
const Certifications = lazy(() => import('./components/Certifications'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));

/**
 * Loading Spinner Component
 * Displayed while lazy-loaded components are loading
 */
const PageLoader = () => (
  <div className="page-loader" role="status" aria-live="polite">
    <motion.div
      className="page-loader__spinner"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
    <p className="page-loader__text">Loading...</p>
  </div>
);

/**
 * Page Transition Wrapper
 * Adds smooth transitions between page changes
 */
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  /**
   * Render the current page based on state
   * Home is not lazy-loaded for faster initial render
   */
  const renderPage = () => {
    const pageProps = { onNavigate: setCurrentPage };

    switch (currentPage) {
      case 'Home':
        return <Home {...pageProps} />;
      case 'Skills':
        return <Skills />;
      case 'Projects':
        return <Projects />;
      case 'Experience':
        return <Internships />;
      case 'Certifications':
        return <Certifications />;
      case 'Education':
        return <Education />;
      case 'Contact':
        return <Contact />;
      default:
        return <Home {...pageProps} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        
        <main className="main-content">
          <AnimatePresence mode="wait">
            <PageTransition key={currentPage}>
              <Suspense fallback={<PageLoader />}>
                {renderPage()}
              </Suspense>
            </PageTransition>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer__container">
            <p className="footer__text">
              © {new Date().getFullYear()} ELANIBRI Mohamed. All rights reserved.
            </p>
            <p className="footer__tagline">
              Cybersecurity & Cloud Engineering Student
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
