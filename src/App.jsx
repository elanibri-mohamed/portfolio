import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Internships from './components/Internships';
import Education from './components/Education';
import Contact from './components/Contact';
import Skills from './components/Skills';
import profileImg from './assets/profile.jpg';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home />;
      case 'Certifications':
        return <Certifications />;
      case 'Projects':
        return <Projects />;
      case 'Internships':
        return <Internships />;
      case 'Education':
        return <Education />;
      case 'Contact':
        return <Contact />;
      case 'Skills':
        return <Skills />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <header className="top-bar">
        <div className="profile">
          <img src={profileImg} alt="Profile" className="profile-img" />
        </div>
        <nav className="nav">
          {['Home', 'Certifications', 'Projects', 'Internships', 'Education', 'Skills', 'Contact'].map(page => (
            <button
              key={page}
              className={`nav-button ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </nav>
      </header>
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
