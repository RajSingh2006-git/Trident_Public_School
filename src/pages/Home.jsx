import React from 'react';
import { Award, Users, BookOpen, Award as Trophy, ArrowRight, ShieldCheck, Cpu, Library } from 'lucide-react';
import banner from '../assets/banner.png';

export default function Home({ setCurrentTab }) {
  const stats = [
    { label: 'Students Enrolled', value: '1,500+', icon: <Users className="h-6 w-6 text-brand-500" /> },
    { label: 'Qualified Teachers', value: '120+', icon: <BookOpen className="h-6 w-6 text-emerald-500" /> },
    { label: 'Sports & Academic Awards', value: '50+', icon: <Trophy className="h-6 w-6 text-yellow-500" /> },
    { label: 'Years of Excellence', value: '25+', icon: <Award className="h-6 w-6 text-sky-500" /> },
  ];

  const highlights = [
    {
      title: 'State-of-the-Art Labs',
      description: 'Fully equipped modern laboratories for Physics, Chemistry, Biology, and Computer Science to encourage practical innovation.',
      icon: <Cpu className="h-7 w-7 text-brand-600 dark:text-brand-400" />
    },
    {
      title: 'Rich Library & Research Hub',
      description: 'Over 15,000+ volumes, scientific journals, digital reading logs, and academic journals to support research and lifelong reading.',
      icon: <Library className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
    },
    {
      title: 'Safe & Secure Campus',
      description: '24/7 CCTV surveillance, comprehensive emergency training, trained guards, and automated GPS-tracked school transport.',
      icon: <ShieldCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
    }
  ];

  const notices = [
    'Admissions open for Academic Session 2026-27. Enroll early to secure a seat.',
    'Trident Public School wins District Science Olympiad for the 3rd consecutive year!',
    'Annual Athletic Meet scheduled for July 15th, 2026. Registrations are open now.',
    'Parent-Teacher Meeting (PTM) for Term 1 scheduled for this coming Saturday, June 27th.'
  ];

  const navigateTo = (tabId) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 pb-20 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={banner} alt="Trident School Campus" className="w-full h-full object-cover scale-105 animate-[pulse_6s_infinite_ease-in-out]" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-800/80 to-transparent dark:from-slate-950/95 dark:via-slate-900/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center text-left">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-brand-500 text-white dark:bg-brand-600 uppercase tracking-widest animate-bounce">
              ★ Admission Open 2026-27 ★
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Nurturing Minds,<br />
              <span className="text-accent-sky">Shaping Leaders.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-medium">
              Welcome to Trident Public School. A legacy of 25 years in fostering academic excellence, integrity, leadership, and global values.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigateTo('admissions')}
                className="px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold shadow-lg hover:shadow-brand-500/20 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center space-x-2"
              >
                <span>Apply Online</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 hover:border-white/40 backdrop-blur-sm transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Board Banner Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 relative z-10">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row items-stretch">
          <div className="bg-brand-600 text-white font-extrabold px-6 py-4 flex items-center justify-center shrink-0 uppercase tracking-wider text-sm select-none">
            📢 Latest Notice
          </div>
          <div className="flex-1 py-4 px-6 overflow-hidden flex items-center bg-slate-50 dark:bg-slate-900/50">
            <div className="w-full relative h-6 overflow-hidden">
              <div className="absolute w-full animate-[marquee_20s_linear_infinite] whitespace-nowrap flex space-x-12 text-sm font-semibold text-slate-700 dark:text-slate-300">
                {notices.map((n, i) => (
                  <span key={i} className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-brand-500"></span>
                    <span>{n}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-brand-500/20 transform hover:-translate-y-1 transition-all duration-350 flex flex-col items-center text-center space-y-4"
            >
              <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-800">
                {stat.icon}
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-slate-900 dark:text-white">
                  {stat.value}
                </span>
                <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome Message Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gradient-to-br from-brand-900 to-brand-800 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle background graphics */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative max-w-3xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              A Warm Welcome from Trident
            </h2>
            <div className="h-1 w-20 bg-accent-sky rounded-full"></div>
            <p className="text-slate-100 leading-relaxed text-base sm:text-lg">
              At Trident Public School, our mission is to empower students to reach their highest potential. We focus not only on high academic standards but also on the overall physical, mental, and social development of each child.
            </p>
            <p className="text-slate-205 leading-relaxed text-sm sm:text-base">
              With a student-to-teacher ratio of 12:1, our classrooms are vibrant workspaces where creative curiosity is celebrated. Explore our modern laboratories, interactive smart setups, and comprehensive athletic facilities.
            </p>
            <div className="pt-4">
              <button
                onClick={() => navigateTo('about')}
                className="px-6 py-3.5 rounded-xl bg-white text-brand-900 font-extrabold shadow-lg hover:bg-slate-100 transition-colors duration-250 cursor-pointer flex items-center space-x-2"
              >
                <span>Read Principal's Welcome Message</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Campus Specialties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Why Trident Stands Out
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-semibold">
            We provide a healthy learning ecosystem backed by premium infrastructure, safe transport, and high learning standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-brand-500/20 transform hover:-translate-y-1 transition-all duration-300 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-2xl bg-brand-50 dark:bg-slate-800">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('about')}
                  className="text-brand-600 hover:text-brand-700 dark:text-accent-sky dark:hover:text-sky-400 font-extrabold text-sm flex items-center space-x-1 hover:translate-x-1 transform duration-150 cursor-pointer"
                >
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-brand-50 dark:bg-slate-900 border border-brand-100 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Give Your Child the Trident Advantage
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm font-semibold">
            Applications are accepted online or via our admissions coordinator. Download our guidelines or fill out our quick admission form.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('admissions')}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold shadow-md cursor-pointer"
            >
              Apply Online
            </button>
            <button
              onClick={() => navigateTo('academics')}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 border border-slate-200 dark:border-slate-700 font-bold cursor-pointer"
            >
              Explore Curriculum
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
