import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Faculty from './pages/Faculty';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import StudentPortal from './pages/StudentPortal';
import ParentPortal from './pages/ParentPortal';
import Contact from './pages/Contact';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [searchNotification, setSearchNotification] = useState('');

  // Synchronize Dark Mode Class with document root
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newVal = !prev;
      if (newVal) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newVal;
    });
  };

  // Smart Search Redirection Engine
  const handleSearch = (query) => {
    const q = query.toLowerCase().trim();
    let targetTab = 'home';
    let matchReason = '';

    if (q.includes('fee') || q.includes('admission') || q.includes('apply') || q.includes('eligibility') || q.includes('process') || q.includes('cost')) {
      targetTab = 'admissions';
      matchReason = 'Admission requirements & pricing structure';
    } else if (q.includes('principal') || q.includes('history') || q.includes('mission') || q.includes('vision') || q.includes('infrastructure') || q.includes('lab') || q.includes('classroom') || q.includes('library')) {
      targetTab = 'about';
      matchReason = 'School background, principal message, or facilities';
    } else if (q.includes('course') || q.includes('subject') || q.includes('curriculum') || q.includes('calendar') || q.includes('nep') || q.includes('board') || q.includes('cbse')) {
      targetTab = 'academics';
      matchReason = 'Offered curriculum streams & school calendar';
    } else if (q.includes('teacher') || q.includes('faculty') || q.includes('experience') || q.includes('qualification') || q.includes('staff') || q.includes('mentor')) {
      targetTab = 'faculty';
      matchReason = 'Distinguished teaching faculty and credentials';
    } else if (q.includes('photo') || q.includes('video') || q.includes('gallery') || q.includes('campus') || q.includes('sports meet') || q.includes('arts')) {
      targetTab = 'gallery';
      matchReason = 'Campus snapshots, sports, and cultural galleries';
    } else if (q.includes('news') || q.includes('announcement') || q.includes('notice') || q.includes('assembly') || q.includes('event')) {
      targetTab = 'events';
      matchReason = 'Upcoming events calendar & announcements notice board';
    } else if (q.includes('homework') || q.includes('assignment') || q.includes('result') || q.includes('report') || q.includes('mark') || q.includes('score') || q.includes('timetable') || q.includes('schedule') || q.includes('material') || q.includes('pdf')) {
      targetTab = 'student';
      matchReason = 'Student portal tools (results, homework checklist, timetable)';
    } else if (q.includes('parent') || q.includes('attendance') || q.includes('inbox') || q.includes('message') || q.includes('progress chart')) {
      targetTab = 'parent';
      matchReason = 'Parent dashboard (attendance heatmaps, progress tracking)';
    } else if (q.includes('phone') || q.includes('email') || q.includes('address') || q.includes('map') || q.includes('contact') || q.includes('route') || q.includes('location')) {
      targetTab = 'contact';
      matchReason = 'Campus map, physical address, and inquiry form';
    } else {
      // Fallback or generic keyword check
      targetTab = 'home';
      matchReason = 'General site query. Check home metrics';
    }

    setCurrentTab(targetTab);
    setSearchNotification(`Found matching results in ${targetTab.toUpperCase()}: "${matchReason}"`);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Clear notification after 6 seconds
    setTimeout(() => {
      setSearchNotification('');
    }, 6000);
  };

  // Render Active Tab Component
  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home setCurrentTab={setCurrentTab} />;
      case 'about':
        return <About />;
      case 'academics':
        return <Academics />;
      case 'admissions':
        return <Admissions />;
      case 'faculty':
        return <Faculty />;
      case 'gallery':
        return <Gallery />;
      case 'events':
        return <Events />;
      case 'student':
        return <StudentPortal />;
      case 'parent':
        return <ParentPortal />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-205 transition-colors duration-300">
      
      {/* Header Sticky Navigation */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onSearch={handleSearch}
      />

      {/* Floating Smart Search Alert */}
      {searchNotification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-brand-600 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top duration-300">
            <span>🔍 {searchNotification}</span>
            <button
              onClick={() => setSearchNotification('')}
              className="text-white hover:text-slate-200 font-extrabold ml-4 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Page Body */}
      <main className="flex-grow">
        {renderTabContent()}
      </main>

      {/* Footer Navigation */}
      <Footer setCurrentTab={setCurrentTab} />

    </div>
  );
}
