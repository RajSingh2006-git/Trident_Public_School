import React, { useState } from 'react';
import { Target, Eye, Award, History, BookOpen, Sparkles, Building, Play } from 'lucide-react';
import scienceLab from '../assets/science_lab.png';
import smartClassroom from '../assets/smart_classroom.png';
import libraryImg from '../assets/library.png';

export default function About() {
  const [infraTab, setInfraTab] = useState('labs');

  const historyEvents = [
    { year: '2001', title: 'Foundation Laid', desc: 'Trident Public School founded with 100 students and a vision for quality education.' },
    { year: '2008', title: 'CBSE Affiliation', desc: 'Received secondary school CBSE affiliation and opened advanced chemistry & physics labs.' },
    { year: '2015', title: 'Campus Expansion', desc: 'Added smart digital classrooms, indoor sports complex, and a state-of-the-art library block.' },
    { year: '2023', title: 'Global Recognition', desc: 'Recognized as the "Best Innovative School" by the National Education Board.' }
  ];

  const infrastructure = {
    labs: {
      title: 'Modern Science & Innovation Labs',
      desc: 'Our Chemistry, Physics, Biology, and computer laboratories are equipped with premium analytical tools, IoT boards, and microscopes to help students transition theory into practice.',
      image: scienceLab
    },
    classrooms: {
      title: 'Interactive Smart Classrooms',
      desc: 'All classrooms are fully air-conditioned and fitted with premium digital interactive screens, high-fidelity sound, and ergonomic furniture supporting collaborative learning environments.',
      image: smartClassroom
    },
    library: {
      title: 'Trident Knowledge Commons',
      desc: 'A grand library housing 15,000+ print volumes, online scientific journal subscriptions, and cozy reading rooms. Host to our weekly literary guild meets and scientific research clubs.',
      image: libraryImg
    },
    sports: {
      title: 'Olympic-grade Sports Complex',
      desc: 'Featuring a professional synthetic athletics track, outdoor basketball courts, cricket nets, indoor swimming pool, and dedicated rooms for gymnastics, karate, and yoga.',
      image: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=800' // High-quality unsplash sports court
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 animate-in fade-in duration-500">
      
      {/* Intro Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          About Trident Public School
        </h1>
        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-semibold">
          Discover our rich history, leadership team, and the infrastructure that fuels our students’ growth.
        </p>
      </div>

      {/* Principal's Message */}
      <section className="bg-white dark:bg-slate-900 border border-slate-155 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-3">
        <div className="bg-slate-50 dark:bg-slate-850 p-8 flex flex-col justify-center items-center text-center border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-850">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600"
            alt="Dr. Richard Vance, Principal"
            className="w-48 h-48 rounded-2xl object-cover shadow-md mb-6 border-4 border-white dark:border-slate-800"
          />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dr. Richard Vance</h3>
          <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest mt-1">Principal & Academic Chair</p>
          <p className="text-xxs text-slate-450 dark:text-slate-500 mt-2 font-medium">Ph.D. in Educational Leadership, Harvard</p>
          <p className="text-xxs text-slate-450 dark:text-slate-500 font-medium">20+ Years in Academic Administration</p>
        </div>
        <div className="lg:col-span-2 p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Principal's Message</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
            "Dear Parents, Guardians, and Students, Welcome to Trident. At Trident, we believe that education is not merely the loading of information, but the ignition of creative passion. Every child has unique potential, and our role is to supply the spark.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
            We prepare our students to succeed in an increasingly complex and global world. By blending high academic rigor with character building, digital citizenship, and competitive athletics, our alumni leave Trident as confident, compassionate leaders. We invite you to join us on this educational journey."
          </p>
          <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
            <span className="font-serif italic text-3xl">Richard Vance</span>
            <span className="text-xs font-semibold">— Dr. Richard Vance, Principal</span>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-brand-600 to-indigo-700 text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="inline-flex p-3 rounded-2xl bg-white/10">
            <Target className="h-6 w-6 text-accent-sky" />
          </div>
          <h3 className="text-2xl font-bold">Our Mission</h3>
          <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
            To provide a stimulating learning environment where students excel academically, acquire strong ethical values, foster physical well-being, and develop critical thinking to become global citizens.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl"></div>
          <div className="inline-flex p-3 rounded-2xl bg-slate-800">
            <Eye className="h-6 w-6 text-accent-sky" />
          </div>
          <h3 className="text-2xl font-bold">Our Vision</h3>
          <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
            To be a leading educational beacon that inspires students to achieve academic mastery, innovative solutions, and self-discipline, while remaining deeply rooted in cultural integrity and social empathy.
          </p>
        </div>
      </section>

      {/* School Infrastructure Interactive Showcase */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            World-class Infrastructure
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm font-semibold">
            Our campus spans 10 acres of modern facility blocks, giving students a perfect space to discover, experiment, and play.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { id: 'labs', label: 'Science & Computer Labs', icon: <Sparkles className="h-4 w-4" /> },
            { id: 'classrooms', label: 'Digital Classrooms', icon: <Building className="h-4 w-4" /> },
            { id: 'library', label: 'Library & Reading Room', icon: <BookOpen className="h-4 w-4" /> },
            { id: 'sports', label: 'Athletic Sports Complex', icon: <Award className="h-4 w-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setInfraTab(tab.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all duration-200 cursor-pointer ${
                infraTab === tab.id
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-350 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
          <div className="space-y-6 order-2 lg:order-1">
            <span className="text-xxs font-extrabold tracking-widest text-brand-500 dark:text-accent-sky uppercase block">
              Campus Amenities
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {infrastructure[infraTab].title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              {infrastructure[infraTab].desc}
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src={infrastructure[infraTab].image}
              alt={infrastructure[infraTab].title}
              className="w-full h-72 sm:h-96 object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Timeline of School Growth */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Journey</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm font-semibold">
            Follow our path of educational innovation and milestones since inception.
          </p>
        </div>

        <div className="relative border-l-2 border-brand-200 dark:border-slate-850 ml-4 md:ml-32 space-y-12">
          {historyEvents.map((ev, idx) => (
            <div key={idx} className="relative pl-6 md:pl-12">
              {/* Timeline marker node */}
              <span className="absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 ring-4 ring-white dark:ring-slate-950"></span>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <div className="md:col-span-1">
                  <span className="text-xl font-extrabold text-brand-600 dark:text-accent-sky block">
                    {ev.year}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider block mt-0.5">
                    {ev.title}
                  </span>
                </div>
                <div className="md:col-span-3 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {ev.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
