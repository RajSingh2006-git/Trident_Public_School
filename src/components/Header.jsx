import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Search, GraduationCap } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Header({ currentTab, setCurrentTab, darkMode, toggleDarkMode, onSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'academics', label: 'Academics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'events', label: 'Events' },
    { id: 'student', label: 'Student' },
    { id: 'parent', label: 'Parent' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearch(searchVal);
    }
  };

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Name */}
          <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => handleNavClick('home')}>
            <img src={logo} alt="Trident Public School Crest" className="h-14 w-14 object-contain" />
            <div>
              <span className="text-xl font-extrabold tracking-tight text-brand-800 dark:text-brand-100 block">
                TRIDENT
              </span>
              <span className="text-xs font-semibold tracking-widest text-brand-500 dark:text-accent-sky uppercase block">
                Public School
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 flex-nowrap">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  currentTab === item.id
                    ? 'bg-brand-500 text-white shadow-sm dark:bg-brand-600'
                    : 'text-slate-600 hover:text-brand-500 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions: Search, Theme Toggle, Apply, Mobile Menu Button */}
          <div className="flex items-center space-x-3 shrink-0">
            {/* Search Bar Desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search school site..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-48 lg:w-56 pl-9 pr-4 py-2 text-sm rounded-full border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900 transition-all duration-300"
              />
              <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            </form>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-300 transition-colors duration-200 cursor-pointer"
              title="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Apply CTA */}
            <button
              onClick={() => handleNavClick('admissions')}
              className="hidden lg:flex items-center space-x-1 px-4 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/10 hover:shadow-brand-500/20 transition-all duration-300 cursor-pointer"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Apply Now</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-300 transition-colors duration-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {/* Mobile Search Form */}
            <form onSubmit={handleSearchSubmit} className="flex md:hidden items-center relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-850 dark:text-white"
              />
              <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            </form>

            {/* Mobile Nav Links */}
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-all duration-200 flex items-center ${
                  currentTab === item.id
                    ? 'bg-brand-500 text-white'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Apply Now Button */}
            <button
              onClick={() => handleNavClick('admissions')}
              className="w-full mt-4 flex items-center justify-center space-x-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold shadow-lg"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Admission Open - Apply Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
