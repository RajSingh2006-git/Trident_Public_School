import React from 'react';
import { Mail, GraduationCap, Award, Calendar } from 'lucide-react';

export default function Faculty() {
  const teachers = [
    {
      name: 'Dr. Emily Thorne',
      role: 'HOD English Literature',
      qualification: 'M.A., Ph.D. in English Literature (Oxford)',
      experience: '15 Years of Teaching Experience',
      email: 'emily.t@trident.edu',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Mr. Vikram Malhotra',
      role: 'HOD Science & Physics Lead',
      qualification: 'M.Sc. in Physics, B.Ed. (IISc Bangalore)',
      experience: '12 Years of Laboratory Research & Teaching',
      email: 'vikram.m@trident.edu',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Mrs. Sarah Jenkins',
      role: 'Mathematics Coordinator',
      qualification: 'M.Sc. in Applied Mathematics (Stanford)',
      experience: '10 Years in Advanced Geometry & Calculus Coaching',
      email: 'sarah.j@trident.edu',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Dr. Alok Ranjan',
      role: 'Director of Computer Science & AI',
      qualification: 'M.Tech. in CSE (IIT Kanpur), Ph.D. in Machine Learning',
      experience: '8 Years of Software Mentorship & Robotic Labs',
      email: 'alok.r@trident.edu',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Mrs. Priya Sharma',
      role: 'Social Studies & Civics Expert',
      qualification: 'M.A. in World History & Public Administration, B.Ed.',
      experience: '9 Years in Student Parliament & MUN Coordination',
      email: 'priya.s@trident.edu',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Mr. Marcus Sterling',
      role: 'Director of Physical Education & Athletics',
      qualification: 'Master of Physical Education (M.P.Ed.)',
      experience: '11 Years in Sports Training & State Level Athletics',
      email: 'marcus.s@trident.edu',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Our Distinguished Faculty
        </h1>
        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-semibold">
          Meet our world-class team of educators, academic researchers, and subject coordinators committed to guiding Trident scholars.
        </p>
      </div>

      {/* Grid of Teachers */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.map((t, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:border-brand-500/20 transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
          >
            {/* Teacher Image & Role Tag */}
            <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white text-xxs font-extrabold tracking-wide border border-white/10 uppercase">
                {t.role}
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {t.name}
                </h3>
                <div className="space-y-2.5 text-xs text-slate-500 dark:text-slate-450 font-semibold leading-relaxed">
                  <div className="flex items-start space-x-2.5">
                    <GraduationCap className="h-4.5 w-4.5 text-brand-600 dark:text-accent-sky shrink-0 mt-0.5" />
                    <span>{t.qualification}</span>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <Calendar className="h-4.5 w-4.5 text-brand-600 dark:text-accent-sky shrink-0 mt-0.5" />
                    <span>{t.experience}</span>
                  </div>
                </div>
              </div>

              {/* Action Contact Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={`mailto:${t.email}`}
                  className="flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 hover:text-brand-600 dark:text-slate-350 dark:hover:text-accent-sky border border-slate-200 dark:border-slate-700 hover:border-brand-500/20 text-xs font-bold transition-all duration-200 cursor-pointer"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact Teacher</span>
                </a>
              </div>
            </div>

          </div>
        ))}
      </section>

      {/* Advisory Banner */}
      <section className="bg-brand-50 dark:bg-slate-900 border border-brand-100 dark:border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Interested in joining our team?</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm font-semibold">
          We are always looking for creative, passionate, and qualified subject-matter experts. Send your detailed CV and cover letter.
        </p>
        <div className="pt-2">
          <a
            href="mailto:careers@trident.edu"
            className="inline-flex px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-md transition-all duration-200"
          >
            Open Careers Portal
          </a>
        </div>
      </section>

    </div>
  );
}
