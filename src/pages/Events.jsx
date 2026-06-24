import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Bell, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Events() {
  const [registeredEvent, setRegisteredEvent] = useState(null);

  const upcomingEvents = [
    {
      id: 1,
      day: '15',
      month: 'JUL',
      title: 'Annual Inter-House Sports Track Meet',
      time: '08:30 AM - 04:00 PM',
      location: 'Trident Olympic Athletics Field',
      desc: 'Annual sports meet featuring 100m dashes, relays, long jumps, and high jumps. House trophies will be awarded by local Olympian guest.'
    },
    {
      id: 2,
      day: '28',
      month: 'JUL',
      title: 'Young Scientists Chemistry Exhibition',
      time: '10:00 AM - 02:00 PM',
      location: 'Advanced Science Labs Complex',
      desc: 'Middle and High school scholars presenting molecular design models, active chemistry labs, and robotic projects.'
    },
    {
      id: 3,
      day: '12',
      month: 'AUG',
      title: 'Parent-Teacher Council Synergy Meet',
      time: '09:00 AM - 12:30 PM',
      location: 'School Main Auditorium',
      desc: 'An open panel discussing standard syllabus speeds, children health metrics, digital safety logs, and holiday tasks.'
    },
    {
      id: 4,
      day: '05',
      month: 'SEP',
      title: 'Teachers Day Grand Assembly',
      time: '08:00 AM - 11:30 AM',
      location: 'School Assembly Grounds',
      desc: 'A student-organized cultural play, classical music tribute, and speech assemblies thanking Trident teaching mentors.'
    }
  ];

  const announcements = [
    {
      date: 'June 24, 2026',
      title: 'Grade X & XII CBSE Results Declared',
      desc: 'Trident records 100% pass rate. 42 students score above 95% aggregate. Kudos to students and mentors!'
    },
    {
      date: 'June 20, 2026',
      title: 'Summer Worksheets & Syllabus Guidelines',
      desc: 'Summer study packets and reading logs are now available inside the student portal dashboard.'
    },
    {
      date: 'June 15, 2026',
      title: 'Bus Transport GPS App Launch',
      desc: 'Parents can now track school buses in real-time. Link details sent to registered phone numbers.'
    }
  ];

  const handleRegister = (eventTitle) => {
    setRegisteredEvent(eventTitle);
    setTimeout(() => setRegisteredEvent(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Events & Announcements
        </h1>
        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-semibold">
          Stay updated with upcoming assemblies, sports meet calendars, and official news letters.
        </p>
      </div>

      {/* Grid: Events on left, Announcements on right */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Upcoming Events Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="h-6 w-6 text-brand-655" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Upcoming Events</h3>
          </div>

          {registeredEvent && (
            <div className="bg-emerald-50 dark:bg-slate-905 border border-emerald-250 dark:border-slate-800 p-4 rounded-xl text-emerald-800 dark:text-emerald-400 text-xs font-semibold flex items-center space-x-2 animate-bounce">
              <CheckCircle2 className="h-5 w-5 text-emerald-555 shrink-0" />
              <span>Successfully registered for: <span className="font-bold">{registeredEvent}</span>! Event gate pass sent.</span>
            </div>
          )}

          <div className="space-y-6">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-brand-500/20 transition-all duration-200 flex flex-col sm:flex-row gap-6 items-start"
              >
                {/* Date Badge */}
                <div className="bg-brand-50 dark:bg-slate-850 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0 w-20 h-20 text-center border border-brand-100 dark:border-slate-800">
                  <span className="text-2xl font-black text-brand-600 dark:text-accent-sky block leading-none">
                    {evt.day}
                  </span>
                  <span className="text-xxs font-extrabold text-slate-500 dark:text-slate-400 block mt-1 tracking-widest uppercase">
                    {evt.month}
                  </span>
                </div>

                {/* Event info */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {evt.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-semibold">
                      {evt.desc}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 text-xxs font-semibold text-slate-450 dark:text-slate-500">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="h-4 w-4 text-brand-500 dark:text-accent-sky" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="h-4 w-4 text-brand-500 dark:text-accent-sky" />
                      <span>{evt.location}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleRegister(evt.title)}
                      className="px-4.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xxs shadow-sm cursor-pointer transition-all hover:shadow"
                    >
                      Register to Attend
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Announcements Column */}
        <div className="space-y-8">
          <div className="flex items-center space-x-2.5">
            <Bell className="h-6 w-6 text-brand-655" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Notice Board</h3>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm divide-y divide-slate-100 dark:divide-slate-800 space-y-6">
            {announcements.map((ann, idx) => (
              <div key={idx} className="pt-6 first:pt-0 space-y-2">
                <span className="text-xxs font-extrabold text-brand-500 dark:text-accent-sky tracking-wider block">
                  {ann.date}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white hover:text-brand-600 transition-colors">
                  {ann.title}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-xxs font-semibold leading-relaxed">
                  {ann.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Download Brochure Box */}
          <div className="bg-gradient-to-br from-brand-900 to-brand-850 text-white rounded-3xl p-6 space-y-4 shadow-lg text-left">
            <h4 className="text-base font-black">Annual Newsletter 2026</h4>
            <p className="text-slate-200 text-xxs leading-relaxed font-semibold">
              Read the complete recap of our scientific accomplishments, sports championship rosters, and student galleries.
            </p>
            <button className="w-full py-2.5 rounded-xl bg-white text-brand-900 font-extrabold text-xxs shadow flex items-center justify-center space-x-1 hover:bg-slate-50 cursor-pointer">
              <span>Download Newsletter (12MB)</span>
            </button>
          </div>
        </div>

      </section>

    </div>
  );
}
