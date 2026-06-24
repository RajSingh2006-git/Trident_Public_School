import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer({ setCurrentTab }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navigateTo = (tabId) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-300">
      {/* Top Newsletter / CTA banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-2">Subscribe to our Academic Newsletter</h3>
            <p className="text-slate-400">Get the latest school updates, announcements, schedules, and newsletters directly in your inbox.</p>
          </div>
          <div>
            <form onSubmit={handleSubscribe} className="flex relative">
              <input
                type="email"
                placeholder="Enter parent or student email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-all duration-200 cursor-pointer flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-emerald-400 text-xs font-semibold mt-2 animate-pulse">
                ✓ Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <img src={logo} alt="Trident Crest" className="h-12 w-12 object-contain filter brightness-110" />
            <div>
              <span className="text-lg font-black tracking-tight text-white block">TRIDENT</span>
              <span className="text-xxs font-bold tracking-widest text-brand-400 uppercase block">Public School</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Empowering students with knowledge, character, and leadership skills for over 25 years. Offering holistic education with state-of-the-art infrastructure.
          </p>
          {/* Social icons */}
          <div className="flex space-x-3 pt-2">
            {[
              { icon: <Facebook className="h-5 w-5" />, href: '#', label: 'Facebook' },
              { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
              { icon: <Instagram className="h-5 w-5" />, href: '#', label: 'Instagram' },
              { icon: <Linkedin className="h-5 w-5" />, href: '#', label: 'LinkedIn' }
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                className="p-2 rounded-lg bg-slate-800 hover:bg-brand-600 text-slate-400 hover:text-white transition-all duration-200"
                aria-label={soc.label}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 tracking-wide border-l-2 border-brand-500 pl-3">Quick Links</h4>
          <ul className="space-y-3.5 text-sm">
            {[
              { id: 'about', label: 'About Us' },
              { id: 'academics', label: 'Academics & Curriculum' },
              { id: 'admissions', label: 'Admissions & Fees' },
              { id: 'faculty', label: 'Our Faculty' },
              { id: 'gallery', label: 'Campus Gallery' },
              { id: 'events', label: 'Latest News & Events' }
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => navigateTo(link.id)}
                  className="hover:text-white transition-colors duration-200 text-slate-400 hover:translate-x-1 inline-block transform duration-150 cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Portals */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 tracking-wide border-l-2 border-brand-500 pl-3">Portals</h4>
          <ul className="space-y-3.5 text-sm">
            {[
              { id: 'student', label: 'Student Dashboard' },
              { id: 'parent', label: 'Parent Portal' },
              { id: 'student', label: 'Homework & Timetable' },
              { id: 'student', label: 'Results Checker' },
              { id: 'parent', label: 'Attendance Heatmap' },
              { id: 'contact', label: 'Contact Help Desk' }
            ].map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => navigateTo(link.id)}
                  className="hover:text-white transition-colors duration-200 text-slate-400 hover:translate-x-1 inline-block transform duration-150 cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 tracking-wide border-l-2 border-brand-500 pl-3">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-brand-400 shrink-0 mt-0.5" />
              <span className="text-slate-400 leading-relaxed">
                Trident Boulevard, Sector 12, Main Academic Hub, City-800001
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-brand-400 shrink-0" />
              <a href="tel:9576543213" className="hover:text-white text-slate-400 transition-colors">
                +91 95765 43213
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-brand-400 shrink-0" />
              <a href="mailto:rajsing9576@gmail.com" className="hover:text-white text-slate-400 transition-colors break-all">
                rajsing9576@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950 text-slate-500 text-xs py-6 border-t border-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} Trident Public School. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
