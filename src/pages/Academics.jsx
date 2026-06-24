import React, { useState } from 'react';
import { BookOpen, GraduationCap, Calendar, Download, Sparkles, BookMarked, UserCheck } from 'lucide-react';

export default function Academics() {
  const [activeLevel, setActiveLevel] = useState('senior');

  const academicLevels = {
    primary: {
      title: 'Primary School (Grades I - V)',
      description: 'Focuses on building essential motor skills, reading literacy, mathematical logic, and emotional development through active playtime and thematic worksheets.',
      subjects: ['English Literature & Grammar', 'Mathematics', 'Environmental Studies (EVS)', 'Second Language (Hindi/Sanskrit)', 'Digital Arts & Music', 'Aerobics & Physical Education'],
      ratio: '15:1',
      assessments: 'Continuous & Comprehensive Evaluation (CCE) without high-pressure terminal testing.'
    },
    middle: {
      title: 'Middle School (Grades VI - VIII)',
      description: 'Strengthens core logical subjects, introduces critical laboratory experiments, and builds foundational communication and teamwork attributes.',
      subjects: ['English Communication', 'Mathematics', 'General Science (Physics, Chemistry, Biology)', 'Social Sciences (History, Geography, Civics)', 'Third Language (Sanskrit/French)', 'Introductory Coding & ICT', 'Life Skills & Craftwork'],
      ratio: '20:1',
      assessments: 'Term exams + interactive classroom quizzes, scientific labs, and public speaking tasks.'
    },
    high: {
      title: 'High School (Grades IX - X)',
      description: 'CBSE affiliated preparatory program focused on core logical foundations, scientific theories, and critical thinking development.',
      subjects: ['English Communicative', 'Mathematics (Standard / Basic)', 'Science (Integrated Labs)', 'Social Science', 'Information Technology / AI', 'Physical & Health Education'],
      ratio: '25:1',
      assessments: 'CBSE Board Pattern Tests, Mock Boards, internal assessments, and lab portfolios.'
    },
    senior: {
      title: 'Senior Secondary (Grades XI - XII)',
      description: 'Advanced specialized streams designed to prepare scholars for national competitive examinations (JEE, NEET, CLAT, CUET) and global university entrance paths.',
      subjects: [
        'Science Stream: Physics, Chemistry, Mathematics / Biology, Computer Science, English Core.',
        'Commerce Stream: Accountancy, Business Studies, Economics, Mathematics / Informatics Practices, English Core.',
        'Humanities Stream: History, Political Science, Psychology, Sociology / Economics, English Core.'
      ],
      ratio: '20:1',
      assessments: 'Mid-terms, Pre-boards, board practical assessments, research projects, and stream-wise seminars.'
    }
  };

  const calendarEvents = [
    { date: 'July 15, 2026', type: 'Exams', title: 'Unit Test I Commences', desc: 'First round of internal assessments for classes I to XII.' },
    { date: 'August 15, 2026', type: 'Holiday', title: 'Independence Day celebration', desc: 'Flag hoisting ceremony at 8:00 AM. Attendance mandatory for all students.' },
    { date: 'September 20, 2026', type: 'Exams', title: 'Term 1 / Half-Yearly Exams', desc: 'Main examinations for classes I through XII. Full syllabus coverage.' },
    { date: 'October 12-18, 2026', type: 'Break', title: 'Autumn / Dussehra Break', desc: 'School campus closed. Study worksheets will be uploaded in student portal.' },
    { date: 'November 14, 2026', type: 'Event', title: 'Trident Annual Cultural Festival', desc: 'Cultural dances, art galleries, drama displays, and musical ensembles.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 animate-in fade-in duration-500">
      
      {/* Page Title */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Academic Structure
        </h1>
        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-semibold">
          Explore our customized CBSE curriculum levels, subjects offered, and annual calendar.
        </p>
      </div>

      {/* Curriculum Section */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side Tab Navigation */}
        <div className="lg:col-span-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-4 lg:pb-0 scrollbar-none">
          {[
            { id: 'primary', label: 'Primary School' },
            { id: 'middle', label: 'Middle School' },
            { id: 'high', label: 'High School' },
            { id: 'senior', label: 'Senior Secondary' }
          ].map((level) => (
            <button
              key={level.id}
              onClick={() => setActiveLevel(level.id)}
              className={`px-4 py-3.5 rounded-xl text-xs font-bold text-left shrink-0 transition-all duration-200 cursor-pointer ${
                activeLevel === level.id
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-350 border border-slate-200 dark:border-slate-800 hover:bg-slate-55'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>

        {/* Right Side Detail Display */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in duration-300">
          <div className="flex items-center space-x-3 text-brand-600 dark:text-accent-sky">
            <GraduationCap className="h-8 w-8" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {academicLevels[activeLevel].title}
            </h3>
          </div>

          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
            {academicLevels[activeLevel].description}
          </p>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Grid Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                Key Subjects
              </span>
              <ul className="space-y-2">
                {academicLevels[activeLevel].subjects.map((sub, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-brand-500 mt-1.5 shrink-0"></span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2 text-brand-600 dark:text-accent-sky font-extrabold text-sm mb-2">
                  <UserCheck className="h-4.5 w-4.5" />
                  <span>Student-Teacher Ratio</span>
                </div>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {academicLevels[activeLevel].ratio}
                </p>
                <p className="text-xxs text-slate-450 dark:text-slate-500 mt-1">
                  Guarantees personalized attention and individual study mentoring.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2 text-brand-600 dark:text-accent-sky font-extrabold text-sm mb-2">
                  <BookMarked className="h-4.5 w-4.5" />
                  <span>Evaluation & Grading</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                  {academicLevels[activeLevel].assessments}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Summary / Affiliation Banner */}
      <section className="bg-gradient-to-br from-brand-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative max-w-3xl space-y-4">
          <span className="text-xxs font-extrabold text-accent-sky tracking-widest uppercase block">
            Official Board Affiliation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Central Board of Secondary Education (CBSE)
          </h2>
          <p className="text-slate-100 leading-relaxed text-sm sm:text-base">
            Trident Public School is officially affiliated with CBSE (Affiliation Number: 5302XX). We strictly adhere to CBSE guidelines, NCERT textbook standards, and incorporate National Education Policy (NEP) 2020 features, including experiential training, coding classes, and integrated arts curriculum.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button className="px-5 py-3 rounded-xl bg-white text-brand-900 font-extrabold text-xs shadow-md hover:bg-slate-50 cursor-pointer flex items-center space-x-1">
              <Download className="h-4.5 w-4.5" />
              <span>Download Syllabus (PDF)</span>
            </button>
            <button className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs cursor-pointer">
              NEP Guidelines
            </button>
          </div>
        </div>
      </section>

      {/* Academic Calendar Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex p-3 rounded-full bg-brand-50 dark:bg-slate-900 border border-brand-100 dark:border-slate-800">
            <Calendar className="h-6 w-6 text-brand-600 dark:text-accent-sky" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Academic Calendar 2026
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm font-semibold">
            Track key examinations, cultural holidays, break periods, and school functions.
          </p>
        </div>

        {/* Timeline of calendar events */}
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl shadow-lg p-6 sm:p-10 divide-y divide-slate-100 dark:divide-slate-800">
          {calendarEvents.map((evt, idx) => (
            <div key={idx} className="py-6 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-xxs font-extrabold uppercase ${
                    evt.type === 'Exams' ? 'bg-red-500/10 text-red-500' :
                    evt.type === 'Holiday' ? 'bg-emerald-500/10 text-emerald-500' :
                    evt.type === 'Break' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-indigo-500/10 text-indigo-550'
                  }`}>
                    {evt.type}
                  </span>
                  <span className="text-xs font-semibold text-slate-450 dark:text-slate-500">
                    {evt.date}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {evt.title}
                </h4>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {evt.desc}
                </p>
              </div>
              <div>
                <button className="text-xxs font-bold px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 cursor-pointer">
                  Add to Calendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
