import React, { useState } from 'react';
import { Eye, X, ArrowLeft, ArrowRight, Video, Camera } from 'lucide-react';
import scienceLab from '../assets/science_lab.png';
import smartClassroom from '../assets/smart_classroom.png';
import libraryImg from '../assets/library.png';
import banner from '../assets/banner.png';

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = [
    {
      title: 'Trident Knowledge Commons Library',
      category: 'campus',
      type: 'image',
      src: libraryImg,
      desc: 'Our expansive multi-level reading library and research tables.'
    },
    {
      title: 'Advanced Science Laboratory',
      category: 'labs',
      type: 'image',
      src: scienceLab,
      desc: 'Students conducting chemical reactions under expert faculty supervision.'
    },
    {
      title: 'Interactive Smart Classroom',
      category: 'campus',
      type: 'image',
      src: smartClassroom,
      desc: 'Grade VIII students studying statistical diagrams via interactive board.'
    },
    {
      title: 'Main School Campus Facade',
      category: 'campus',
      type: 'image',
      src: banner,
      desc: 'Morning view of the Trident Public School main brick academic building.'
    },
    {
      title: 'Annual Inter-School Sports Meet',
      category: 'sports',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=800',
      desc: 'Finalists lining up at the synthetic running tracks for 100m sprint.'
    },
    {
      title: 'District Basketball Finals Tournament',
      category: 'sports',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&q=80&w=800',
      desc: 'Trident basketball squad securing the gold trophy against city academy.'
    },
    {
      title: 'Annual Musical Drama Performance',
      category: 'cultural',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&q=80&w=800',
      desc: 'Students performing the opening scene of their theatrical adaptation.'
    },
    {
      title: 'Oil Painting Workshop in Art Studio',
      category: 'cultural',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
      desc: 'Fine art scholars learning shading styles in the campus art studio.'
    }
  ];

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Campus Gallery & Media
        </h1>
        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-semibold">
          Explore snapshots of school life, infrastructure, competitive sports, and cultural festivals.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: 'All Media' },
          { id: 'campus', label: 'Campus Blocks' },
          { id: 'labs', label: 'Laboratories' },
          { id: 'sports', label: 'Athletic Sports' },
          { id: 'cultural', label: 'Cultural & Arts' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`px-4.5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              filter === item.id
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-350 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="group relative bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden aspect-square shadow-sm hover:shadow-xl border border-slate-200/20 hover:border-brand-500/20 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
              <div className="space-y-1">
                <span className="text-xxs font-extrabold text-accent-sky tracking-widest uppercase">
                  {item.category}
                </span>
                <h4 className="text-white font-bold text-sm leading-snug">
                  {item.title}
                </h4>
                <p className="text-slate-300 text-xxs font-medium line-clamp-2">
                  {item.desc}
                </p>
              </div>
              <div className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white backdrop-blur-md border border-white/20">
                {item.type === 'video' ? <Video className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer transition-colors"
            title="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer transition-colors"
            title="Previous"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          {/* Lightbox Image Container */}
          <div
            className="max-w-4xl max-h-[80vh] w-full flex flex-col space-y-4 items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-250"
            />
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white leading-snug">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-sm font-semibold text-slate-450">
                {filteredItems[lightboxIndex].desc}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer transition-colors"
            title="Next"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      )}

    </div>
  );
}
