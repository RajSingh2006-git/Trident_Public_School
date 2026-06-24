import React, { useState } from 'react';
import { BookOpen, FileText, CheckSquare, Calendar, Search, Award, Printer, CheckCircle, Clock } from 'lucide-react';

export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState('materials');
  
  // Results State
  const [rollNo, setRollNo] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');

  // Homework checklist state
  const [homeworkList, setHomeworkList] = useState([
    { id: 1, subject: 'Mathematics', title: 'Calculus Limits Worksheet Q1-Q15', due: 'Tomorrow', completed: false },
    { id: 2, subject: 'Science (Physics)', title: 'Lab report on Ohm\'s law verification', due: 'June 28, 2026', completed: true },
    { id: 3, subject: 'English', title: 'Write an essay comparing MacBeth and Hamlet', due: 'July 02, 2026', completed: false },
    { id: 4, subject: 'Computer Science / AI', title: 'Code a standard linear search algorithm in Python', due: 'June 30, 2026', completed: false }
  ]);

  // Mock Result Database
  const resultDb = {
    'TPS-2026-001': {
      name: 'Raj Singh',
      class: 'Grade X-A',
      roll: 'TPS-2026-001',
      session: '2025-26 (Term 1)',
      subjects: [
        { name: 'English Core', max: 100, obtained: 95, grade: 'A1' },
        { name: 'Mathematics', max: 100, obtained: 98, grade: 'A1' },
        { name: 'Science & Labs', max: 100, obtained: 94, grade: 'A1' },
        { name: 'Social Sciences', max: 100, obtained: 90, grade: 'A2' },
        { name: 'Information Tech', max: 100, obtained: 99, grade: 'A1' }
      ],
      totalObtained: 476,
      totalMax: 500,
      percentage: '95.2%',
      gpa: '9.8',
      remarks: 'Excellent work! Consistent performance across all streams.',
      status: 'PASS'
    },
    'TPS-2026-002': {
      name: 'Aditya Sen',
      class: 'Grade X-B',
      roll: 'TPS-2026-002',
      session: '2025-26 (Term 1)',
      subjects: [
        { name: 'English Core', max: 100, obtained: 82, grade: 'B1' },
        { name: 'Mathematics', max: 100, obtained: 74, grade: 'B2' },
        { name: 'Science & Labs', max: 100, obtained: 80, grade: 'B1' },
        { name: 'Social Sciences', max: 100, obtained: 85, grade: 'A2' },
        { name: 'Information Tech', max: 100, obtained: 88, grade: 'B1' }
      ],
      totalObtained: 409,
      totalMax: 500,
      percentage: '81.8%',
      gpa: '8.4',
      remarks: 'Good progress. Math requires slightly more conceptual practice.',
      status: 'PASS'
    }
  };

  const handleToggleHomework = (id) => {
    setHomeworkList(prev => prev.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleResultSearch = (e) => {
    e.preventDefault();
    setSearchError('');
    setSearchResult(null);

    const cleanRoll = rollNo.trim().toUpperCase();
    if (!cleanRoll) {
      setSearchError('Please enter a valid student roll number.');
      return;
    }

    if (resultDb[cleanRoll]) {
      setSearchResult(resultDb[cleanRoll]);
    } else {
      setSearchError('Roll number not found. (Use TPS-2026-001 or TPS-2026-002 to test).');
    }
  };

  const studyMaterials = [
    { subject: 'Mathematics', title: 'NCERT Grade X Calculus Formulas & Limits', size: '1.2 MB', date: 'June 22, 2026' },
    { subject: 'Physics', title: 'Electromagnetism Lecture Notes & Lab Diagrams', size: '2.5 MB', date: 'June 18, 2026' },
    { subject: 'Chemistry', title: 'Periodic Table Trends & Reaction Sheets', size: '940 KB', date: 'June 15, 2026' },
    { subject: 'Computer Science', title: 'Python File Handling & Data Structs Guide', size: '3.1 MB', date: 'June 10, 2026' }
  ];

  const timetable = [
    { time: '08:30 - 09:30', mon: 'Mathematics', tue: 'Science (Phy)', wed: 'English', thu: 'History', fri: 'Mathematics' },
    { time: '09:30 - 10:30', mon: 'English', tue: 'Mathematics', wed: 'Science (Che)', thu: 'Geography', fri: 'Science (Phy)' },
    { time: '10:30 - 11:00', mon: 'BREAK', tue: 'BREAK', wed: 'BREAK', thu: 'BREAK', fri: 'BREAK' },
    { time: '11:00 - 12:00', mon: 'Science (Bio)', tue: 'History', wed: 'Mathematics', thu: 'English', fri: 'Computer Sci' },
    { time: '12:00 - 01:00', mon: 'Computer Sci', tue: 'Geography', wed: 'Civics', thu: 'Physical Ed', fri: 'Library Hour' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Student Portal Dashboard
        </h1>
        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-semibold">
          Access digital syllabus books, log homework checkers, review timetables, and check test results.
        </p>
      </div>

      {/* Grid: Navigation tabs + Content Area */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Tab List */}
        <div className="lg:col-span-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-4 lg:pb-0 scrollbar-none">
          {[
            { id: 'materials', label: 'Study Materials', icon: <BookOpen className="h-4.5 w-4.5" /> },
            { id: 'homework', label: 'Homework Checklist', icon: <CheckSquare className="h-4.5 w-4.5" /> },
            { id: 'timetable', label: 'Weekly Timetable', icon: <Calendar className="h-4.5 w-4.5" /> },
            { id: 'results', label: 'Results Portal', icon: <Award className="h-4.5 w-4.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4.5 py-3.5 rounded-xl text-xs font-bold text-left shrink-0 flex items-center space-x-2 transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-350 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg min-h-[400px]">
          
          {/* TAB 1: Study Materials */}
          {activeTab === 'materials' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Syllabus & Homework Materials</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
                  Download chapters, laboratory formulas, and model question papers uploaded by teachers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studyMaterials.map((mat, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 hover:border-brand-500/20 transition-all duration-200 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <span className="px-2 py-0.5 rounded-md text-xxs font-extrabold bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 uppercase">
                        {mat.subject}
                      </span>
                      <h4 className="text-sm font-bold text-slate-905 dark:text-white leading-snug">
                        {mat.title}
                      </h4>
                      <div className="flex space-x-3 text-xxs font-semibold text-slate-450 dark:text-slate-500">
                        <span>{mat.size}</span>
                        <span>•</span>
                        <span>Uploaded: {mat.date}</span>
                      </div>
                    </div>
                    <button className="p-2 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-brand-600 dark:text-accent-sky border border-slate-200 dark:border-slate-700 cursor-pointer">
                      <FileText className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Homework Checklist */}
          {activeTab === 'homework' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Active Homework Tracker</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
                  Check off assignments to track tasks and study timings. (Simulated client checklist).
                </p>
              </div>

              <div className="space-y-4">
                {homeworkList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleHomework(item.id)}
                    className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 select-none ${
                      item.completed
                        ? 'bg-emerald-500/5 border-emerald-200/50 dark:border-emerald-800/30 opacity-75'
                        : 'bg-slate-50 dark:bg-slate-850 border-slate-100 dark:border-slate-800 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        readOnly
                        className="mt-1 h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                      />
                      <div className="space-y-1">
                        <span className={`px-2 py-0.5 rounded-md text-xxs font-extrabold uppercase ${
                          item.completed
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                            : 'bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-accent-sky'
                        }`}>
                          {item.subject}
                        </span>
                        <h4 className={`text-sm font-bold leading-snug ${
                          item.completed
                            ? 'line-through text-slate-450 dark:text-slate-500'
                            : 'text-slate-900 dark:text-white'
                        }`}>
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 text-xxs font-bold shrink-0">
                      {item.completed ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> Done</span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-400 flex items-center"><Clock className="h-4 w-4 mr-1" /> Due: {item.due}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Timetable Grid */}
          {activeTab === 'timetable' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Class Schedule (Grade X-A)</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
                  Standard weekly class distribution ledger. Periods are 60 minutes long.
                </p>
              </div>

              <div className="border border-slate-150 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-white font-extrabold border-b border-slate-100 dark:border-slate-800">
                      <th className="p-3">Time Period</th>
                      <th className="p-3">Mon</th>
                      <th className="p-3">Tue</th>
                      <th className="p-3">Wed</th>
                      <th className="p-3">Thu</th>
                      <th className="p-3">Fri</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-350 font-bold">
                    {timetable.map((row, idx) => (
                      <tr
                        key={idx}
                        className={row.mon === 'BREAK' ? 'bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 text-center font-black tracking-widest' : ''}
                      >
                        <td className="p-3 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white font-extrabold">{row.time}</td>
                        {row.mon === 'BREAK' ? (
                          <td colSpan="5" className="p-3 py-1 bg-amber-500/5 dark:bg-amber-500/5 text-amber-600 dark:text-amber-400 text-center select-none uppercase font-extrabold text-xxs tracking-widest">
                            ☕ Lunch Break (30 Mins)
                          </td>
                        ) : (
                          <>
                            <td className="p-3">{row.mon}</td>
                            <td className="p-3">{row.tue}</td>
                            <td className="p-3">{row.wed}</td>
                            <td className="p-3">{row.thu}</td>
                            <td className="p-3">{row.fri}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Results Portal */}
          {activeTab === 'results' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Interactive Term Exam Results</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold font-bold">
                  Enter student roll number to fetch the marks details.
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={handleResultSearch} className="flex flex-col sm:flex-row gap-4 items-stretch">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Enter Roll No. E.g. TPS-2026-001"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                  />
                  <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-405" />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-655 hover:bg-brand-700 text-white font-extrabold text-sm shadow-md cursor-pointer transition-colors duration-150"
                >
                  Retrieve Scorecard
                </button>
              </form>

              {searchError && (
                <p className="text-red-500 text-xs font-semibold flex items-center animate-pulse">
                  <AlertCircle className="h-4 w-4 mr-1.5" />
                  <span>{searchError}</span>
                </p>
              )}

              {/* Scorecard Display */}
              {searchResult && (
                <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md animate-in zoom-in-95 duration-250">
                  {/* Top metadata */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-750 pb-4 gap-4">
                    <div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white">{searchResult.name}</h4>
                      <p className="text-xxs font-semibold text-slate-500 dark:text-slate-400">
                        Roll Number: <span className="font-extrabold text-slate-700 dark:text-slate-200">{searchResult.roll}</span> | Class: {searchResult.class}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex px-3 py-1 rounded-full text-xxs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase border border-emerald-500/20">
                        {searchResult.status}
                      </span>
                      <p className="text-xxs font-semibold text-slate-400 mt-1">{searchResult.session}</p>
                    </div>
                  </div>

                  {/* Marks Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="text-slate-400 font-extrabold border-b border-slate-200 dark:border-slate-750 pb-2">
                          <th className="py-2">Subject</th>
                          <th className="py-2 text-center">Max Marks</th>
                          <th className="py-2 text-center">Marks Obtained</th>
                          <th className="py-2 text-center">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-750 text-slate-700 dark:text-slate-300 font-bold">
                        {searchResult.subjects.map((sub, idx) => (
                          <tr key={idx}>
                            <td className="py-3 text-slate-900 dark:text-white font-extrabold">{sub.name}</td>
                            <td className="py-3 text-center">{sub.max}</td>
                            <td className="py-3 text-center text-brand-600 dark:text-accent-sky font-black">{sub.obtained}</td>
                            <td className="py-3 text-center">
                              <span className="px-2.5 py-0.5 rounded bg-brand-50 dark:bg-slate-800 text-brand-655 dark:text-sky-305 text-xxs font-black">
                                {sub.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-4 sm:p-5 text-center">
                    <div>
                      <span className="block text-xxs font-bold text-slate-405 dark:text-slate-500">Aggregate Marks</span>
                      <span className="text-base font-extrabold text-slate-900 dark:text-white">{searchResult.totalObtained} / {searchResult.totalMax}</span>
                    </div>
                    <div>
                      <span className="block text-xxs font-bold text-slate-405 dark:text-slate-500">Percentage</span>
                      <span className="text-base font-extrabold text-brand-600 dark:text-accent-sky">{searchResult.percentage}</span>
                    </div>
                    <div>
                      <span className="block text-xxs font-bold text-slate-405 dark:text-slate-500">Term GPA</span>
                      <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-450">{searchResult.gpa}</span>
                    </div>
                  </div>

                  <p className="text-xxs font-semibold text-slate-500 dark:text-slate-400 italic">
                    * Remarks: {searchResult.remarks}
                  </p>

                  {/* Download Action */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 text-xxs font-extrabold flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Printer className="h-4 w-4" />
                      <span>Print Scorecard</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>

      </section>

    </div>
  );
}
