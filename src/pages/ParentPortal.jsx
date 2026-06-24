import React, { useState } from 'react';
import { ShieldCheck, MessageSquare, Calendar, Award, UserCheck, AlertCircle, FileText, CheckCircle } from 'lucide-react';

export default function ParentPortal() {
  const [activeTab, setActiveTab] = useState('attendance');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Mrs. Sarah Jenkins (Maths Lead)', subject: 'Math Quiz Performance', body: 'Raj scored 10/10 in today\'s limits quiz. He is showing excellent understanding of the foundation concepts.', date: 'Yesterday, 02:40 PM', read: false },
    { id: 2, sender: 'School Administration Office', subject: 'PTM Schedule Notification', body: 'This is a reminder that the Term 1 Parent-Teacher Meeting is scheduled for Saturday, June 27th. Please book your slots early.', date: 'June 23, 2026', read: false },
    { id: 3, sender: 'Trident Transport Desk', subject: 'Route 12 Bus Delay Update', body: 'Route 12 school bus is delayed by 10 minutes today due to construction work near Sector 5 road crossings.', date: 'June 20, 2026', read: true }
  ]);

  const handleMarkAsRead = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  // Mock Calendar Days for June 2026 (Starting Monday, June 1st)
  // Let's create a list representing calendar days.
  // June 2026 has 30 days.
  // June 1st, 2026 is a Monday.
  const calendarDays = Array.from({ length: 30 }, (_, idx) => {
    const dayNum = idx + 1;
    // Let's mark weekends: Saturday is index % 7 === 5, Sunday is index % 7 === 6
    const isWeekend = idx % 7 === 5 || idx % 7 === 6;
    let status = 'present'; // present, absent, weekend, holiday
    
    if (isWeekend) {
      status = 'weekend';
    } else if (dayNum === 10) {
      status = 'absent'; // Mock absent day
    } else if (dayNum === 25) {
      status = 'holiday'; // Mock academic holiday
    }
    
    return { day: dayNum, status };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Parent Connection Portal
        </h1>
        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-semibold">
          Monitor your ward’s attendance heatmaps, term progress charts, and communications.
        </p>
      </div>

      {/* Ward Info Summary */}
      <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150"
            alt="Student Avatar"
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
          />
          <div>
            <h4 className="text-base font-black text-slate-905 dark:text-white">Raj Singh</h4>
            <p className="text-xxs font-semibold text-slate-500 dark:text-slate-400">Class Grade X-A | Roll 01</p>
          </div>
        </div>

        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-xxs font-bold text-slate-450 dark:text-slate-500">June Attendance Rate</span>
            <span className="text-lg font-black text-slate-909 dark:text-white">96.2%</span>
          </div>
        </div>

        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-655 dark:text-sky-400">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-xxs font-bold text-slate-450 dark:text-slate-500">Term Average Score</span>
            <span className="text-lg font-black text-slate-909 dark:text-white">95.2%</span>
          </div>
        </div>

        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-red-500/10 text-red-655 dark:text-red-400">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-xxs font-bold text-slate-450 dark:text-slate-500">Unread Messages</span>
            <span className="text-lg font-black text-slate-909 dark:text-white">
              {messages.filter(m => !m.read).length}
            </span>
          </div>
        </div>
      </section>

      {/* Grid: Navigation tabs + Content */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side Tabs */}
        <div className="lg:col-span-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-4 lg:pb-0 scrollbar-none">
          {[
            { id: 'attendance', label: 'Attendance Heatmap', icon: <Calendar className="h-4.5 w-4.5" /> },
            { id: 'performance', label: 'Academic Performance', icon: <Award className="h-4.5 w-4.5" /> },
            { id: 'messages', label: 'Teacher Inbox', icon: <MessageSquare className="h-4.5 w-4.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4.5 py-3.5 rounded-xl text-xs font-bold text-left shrink-0 flex items-center space-x-2 transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-905 text-slate-650 dark:text-slate-350 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Side Content Block */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg min-h-[400px]">
          
          {/* TAB 1: Attendance Heatmap */}
          {activeTab === 'attendance' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Attendance Tracking - June 2026</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
                  Review daily login registry. Absent days are marked in red.
                </p>
              </div>

              {/* Grid Legend */}
              <div className="flex flex-wrap gap-4 text-xxs font-bold text-slate-500 dark:text-slate-400 pb-2">
                <div className="flex items-center space-x-1.5">
                  <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                  <span>Present</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500"></span>
                  <span>Absent</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  <span>Academic Holiday</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-3 w-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-750"></span>
                  <span>Weekend</span>
                </div>
              </div>

              {/* Monthly Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 max-w-md">
                {/* Week Day Labels */}
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((wd, i) => (
                  <div key={i} className="text-center text-xxs font-extrabold text-slate-400 p-2">
                    {wd}
                  </div>
                ))}

                {/* Calendar Cells */}
                {calendarDays.map((cell) => (
                  <div
                    key={cell.day}
                    className={`aspect-square rounded-xl flex items-center justify-center text-xs font-black relative ${
                      cell.status === 'present'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : cell.status === 'absent'
                        ? 'bg-red-500/10 text-red-650 dark:text-red-400 border border-red-500/20 animate-pulse'
                        : cell.status === 'holiday'
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-350'
                        : 'bg-slate-50 dark:bg-slate-850 text-slate-400 dark:text-slate-600 border border-slate-200/40 dark:border-slate-800/40'
                    }`}
                  >
                    <span>{cell.day}</span>
                    {cell.status === 'absent' && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Academic Performance Graph */}
          {activeTab === 'performance' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Exam Progress Chart</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
                  Progress tracking of primary subject scores across tests in the current session.
                </p>
              </div>

              {/* Custom SVG Line Chart */}
              <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-150 dark:border-slate-800">
                <div className="relative w-full overflow-hidden">
                  <svg className="w-full h-64" viewBox="0 0 500 220">
                    {/* Y-axis grid lines */}
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#e2e8f0" strokeDasharray="4 4" className="dark:stroke-slate-800" />
                    <text x="30" y="25" className="text-xxs font-extrabold fill-slate-400">100%</text>

                    <line x1="40" y1="70" x2="480" y2="70" stroke="#e2e8f0" strokeDasharray="4 4" className="dark:stroke-slate-800" />
                    <text x="30" y="75" className="text-xxs font-extrabold fill-slate-400">90%</text>

                    <line x1="40" y1="120" x2="480" y2="120" stroke="#e2e8f0" strokeDasharray="4 4" className="dark:stroke-slate-800" />
                    <text x="30" y="125" className="text-xxs font-extrabold fill-slate-400">80%</text>

                    <line x1="40" y1="170" x2="480" y2="170" stroke="#e2e8f0" strokeDasharray="4 4" className="dark:stroke-slate-800" />
                    <text x="30" y="175" className="text-xxs font-extrabold fill-slate-400">70%</text>

                    {/* Chart lines */}
                    {/* Math line (values: UT-1: 90%, Term-1: 95%, UT-2: 98%) -> coordinates: (100, 70), (280, 45), (440, 30) */}
                    <path
                      d="M 100 70 L 280 45 L 440 30"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="70" r="5" fill="#2563eb" className="cursor-pointer" />
                    <circle cx="280" cy="45" r="5" fill="#2563eb" className="cursor-pointer" />
                    <circle cx="440" cy="30" r="5" fill="#2563eb" className="cursor-pointer" />

                    {/* Science line (values: UT-1: 85%, Term-1: 94%, UT-2: 92%) -> coordinates: (100, 95), (280, 50), (440, 60) */}
                    <path
                      d="M 100 95 L 280 50 L 440 60"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="95" r="5" fill="#10b981" />
                    <circle cx="280" cy="50" r="5" fill="#10b981" />
                    <circle cx="440" cy="60" r="5" fill="#10b981" />

                    {/* X-axis labels */}
                    <text x="100" y="195" textAnchor="middle" className="text-xxs font-extrabold fill-slate-500 dark:fill-slate-400">Unit Test I</text>
                    <text x="280" y="195" textAnchor="middle" className="text-xxs font-extrabold fill-slate-500 dark:fill-slate-400">Term 1 Exams</text>
                    <text x="440" y="195" textAnchor="middle" className="text-xxs font-extrabold fill-slate-500 dark:fill-slate-400">Unit Test II</text>
                  </svg>
                </div>

                {/* Legend Chart */}
                <div className="flex justify-center space-x-6 pt-4 text-xxs font-bold text-slate-500">
                  <div className="flex items-center space-x-1.5">
                    <span className="h-2.5 w-6 rounded-full bg-brand-500"></span>
                    <span>Mathematics (Average 94.3%)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="h-2.5 w-6 rounded-full bg-emerald-500"></span>
                    <span>Science & Practical (Average 90.3%)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Message Inbox */}
          {activeTab === 'messages' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Academic Messages & Communication</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
                  Read active logs sent by school administration and class mentors.
                </p>
              </div>

              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-2xl border transition-all duration-200 ${
                      msg.read
                        ? 'bg-slate-50 dark:bg-slate-850/50 border-slate-100 dark:border-slate-800/80 opacity-75'
                        : 'bg-brand-500/5 dark:bg-brand-500/5 border-brand-100 dark:border-slate-850'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                          <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                            {msg.sender}
                          </span>
                          {!msg.read && (
                            <span className="px-2 py-0.5 rounded-full text-xxs font-black bg-brand-500 text-white animate-pulse">
                              NEW
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-black text-brand-655 dark:text-sky-305">
                          {msg.subject}
                        </h4>
                      </div>
                      <span className="text-xxs font-bold text-slate-450 dark:text-slate-500 shrink-0">
                        {msg.date}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-semibold mt-3">
                      {msg.body}
                    </p>

                    {!msg.read && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => handleMarkAsRead(msg.id)}
                          className="px-4.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-350 hover:bg-slate-50 text-xxs font-extrabold flex items-center space-x-1 cursor-pointer"
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-555" />
                          <span>Mark Read</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </section>

    </div>
  );
}
