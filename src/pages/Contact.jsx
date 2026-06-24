import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, HelpCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { CONFIG } from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const validateForm = () => {
    let err = {};
    if (!formData.name.trim()) err.name = 'Full name is required.';
    
    if (!formData.email.trim()) {
      err.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      err.email = 'Invalid email format.';
    }
    
    if (!formData.phone.trim()) {
      err.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      err.phone = 'Phone number must be a 10-digit number.';
    }
    
    if (!formData.message.trim()) err.message = 'Message description is required.';
    
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (CONFIG.WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      alert("Verification Notice:\nTo receive these contact submissions in your Gmail (rajsing9576@gmail.com), please get a free Access Key from Web3Forms (https://web3forms.com) and paste it into 'src/config.js'.\n\nI will simulate successful submission for now!");
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 5000);
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: CONFIG.WEB3FORMS_ACCESS_KEY,
          subject: `Contact Inquiry: ${formData.name}`,
          from_name: "Trident Contact Helpdesk",
          to_email: CONFIG.CONTACT_EMAIL,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({ name: '', email: '', phone: '', message: '' });
        }, 5000);
      } else {
        alert(`Web3Forms Error: ${result.message || 'Check your Access Key configuration in src/config.js.'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Connection Error: Failed to submit form. Please check your internet connection.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Contact Us
        </h1>
        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-semibold">
          Reach out for general admission queries, feedback, transport logistics, or school timing updates.
        </p>
      </div>

      {/* Main Grid: Details + Form */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-brand-50 dark:bg-slate-850 text-brand-600 dark:text-accent-sky shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-900 dark:text-white">School Campus Address</h4>
              <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                Trident Boulevard, Sector 12, Main Academic Hub, City-800001, India
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-slate-850 text-emerald-600 dark:text-emerald-450 shrink-0">
              <Phone className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-900 dark:text-white">Admission Helpdesk</h4>
              <p className="text-sm text-slate-550 dark:text-slate-400 font-bold">
                +91 95765 43213
              </p>
              <p className="text-xxs text-slate-450 dark:text-slate-500 font-semibold">
                Available Mon - Sat, 08:30 AM - 03:00 PM IST
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-slate-850 text-indigo-650 dark:text-indigo-400 shrink-0">
              <Mail className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-900 dark:text-white">General Email Address</h4>
              <p className="text-sm text-slate-550 dark:text-slate-405 font-bold break-all">
                rajsing9576@gmail.com
              </p>
              <p className="text-xxs text-slate-450 dark:text-slate-500 font-semibold">
                Expect a response within 12 business hours.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-brand-500 pl-3 mb-6">
            Send us a Direct Message
          </h3>

          {formSubmitted ? (
            <div className="bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-3.5 animate-in zoom-in duration-300">
              <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto" />
              <h4 className="text-lg font-black text-emerald-855 dark:text-white">Message Dispatched!</h4>
              <p className="text-xs font-semibold text-slate-550 dark:text-slate-400 max-w-sm mx-auto">
                Thank you for contacting us. Our administration desk will respond to your query at <span className="font-bold">{formData.email}</span> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                    placeholder="E.g. Raj Singh"
                  />
                  {errors.name && <p className="text-red-505 text-xxs font-semibold flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> {errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                    placeholder="rajsing9576@gmail.com"
                  />
                  {errors.email && <p className="text-red-505 text-xxs font-semibold flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> {errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-bold">10-Digit Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                  placeholder="9576543213"
                />
                {errors.phone && <p className="text-red-505 text-xxs font-semibold flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> {errors.phone}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Message Description *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                  placeholder="How can we assist you? Include grade and application queries..."
                ></textarea>
                {errors.message && <p className="text-red-505 text-xxs font-semibold flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> {errors.message}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center space-x-1.5 cursor-pointer transition-all duration-250 ${
                    isSending ? 'opacity-50 cursor-not-allowed bg-slate-550' : 'hover:-translate-y-0.5 transform'
                  }`}
                >
                  <Send className="h-4.5 w-4.5" />
                  <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </section>

      {/* Map Integration */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-center text-slate-905 dark:text-white">Our Location</h3>
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg h-96 relative">
          {/* Real Google Map Iframe for a professional user experience */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233917631584!2d77.06013627549618!3d28.487823975744804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18c575000001%3A0xc3911c757c3a0604!2sSector%2012%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1719230000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Trident Public School Location Map"
          ></iframe>
        </div>
      </section>

    </div>
  );
}
