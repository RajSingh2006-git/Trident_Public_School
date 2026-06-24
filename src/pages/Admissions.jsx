import React, { useState } from 'react';
import { ClipboardList, Award, HelpCircle, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { CONFIG } from '../config';

export default function Admissions() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: 'Male',
    classApplied: 'Grade I',
    parentName: '',
    parentOccupation: '',
    phone: '',
    email: '',
    address: '',
    agreement: false
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const classes = ['Nursery', 'KG', 'Grade I', 'Grade II', 'Grade III', 'Grade IV', 'Grade V', 'Grade VI', 'Grade VII', 'Grade VIII', 'Grade IX', 'Grade X', 'Grade XI (Science)', 'Grade XI (Commerce)', 'Grade XI (Humanities)'];

  const validateStep = (step) => {
    let err = {};
    if (step === 1) {
      if (!formData.studentName.trim()) err.studentName = 'Student name is required.';
      if (!formData.dob) err.dob = 'Date of birth is required.';
    } else if (step === 2) {
      if (!formData.parentName.trim()) err.parentName = 'Parent name is required.';
      if (!formData.phone.trim()) {
        err.phone = 'Phone number is required.';
      } else if (!/^\d{10}$/.test(formData.phone.trim())) {
        err.phone = 'Invalid phone. Must be a 10-digit number.';
      }
      if (!formData.email.trim()) {
        err.email = 'Email address is required.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        err.email = 'Invalid email address format.';
      }
    } else if (step === 3) {
      if (!formData.address.trim()) err.address = 'Communication address is required.';
      if (!formData.agreement) err.agreement = 'You must accept the admission conditions.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (validateStep(formStep)) {
      setFormStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setErrors({});
    setFormStep(prev => prev - 1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // State to track if local admissions exist for exporter
  const [hasSubmissions, setHasSubmissions] = useState(!!localStorage.getItem('trident_admissions'));

  const generateAndDownloadCSV = (entry) => {
    // 1. Save entry to localStorage list
    const saved = localStorage.getItem('trident_admissions');
    const list = saved ? JSON.parse(saved) : [];
    list.push(entry);
    localStorage.setItem('trident_admissions', JSON.stringify(list));
    setHasSubmissions(true);

    // 2. Format CSV values
    const headers = ["Student Name", "DOB", "Gender", "Class Applied", "Parent Name", "Parent Occupation", "Phone", "Email", "Address"];
    const row = [
      entry.studentName,
      entry.dob,
      entry.gender,
      entry.classApplied,
      entry.parentName,
      entry.parentOccupation,
      entry.phone,
      entry.email,
      `"${entry.address.replace(/"/g, '""')}"`
    ];
    const csvContent = [headers.join(","), row.join(",")].join("\n");

    // 3. Trigger Browser Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${entry.studentName.replace(/\s+/g, '_')}_admission_entry.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Return raw CSV row string for email representation
    return row.join(", ");
  };

  const downloadCumulativeCSV = () => {
    const saved = localStorage.getItem('trident_admissions');
    if (!saved) {
      alert("No admissions entries found in this browser.");
      return;
    }
    const list = JSON.parse(saved);
    const headers = ["Student Name", "DOB", "Gender", "Class Applied", "Parent Name", "Parent Occupation", "Phone", "Email", "Address"];
    const rows = list.map(entry => [
      entry.studentName,
      entry.dob,
      entry.gender,
      entry.classApplied,
      entry.parentName,
      entry.parentOccupation,
      entry.phone,
      entry.email,
      `"${entry.address.replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `trident_admissions_cumulative.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    // Generate CSV local files and get row text
    const csvRowText = generateAndDownloadCSV(formData);

    if (CONFIG.WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      alert("Verification Notice:\nTo receive these form submissions in your Gmail (rajsing9576@gmail.com), please get a free Access Key from Web3Forms (https://web3forms.com) and paste it into 'src/config.js'.\n\nI have saved this entry locally and downloaded your CSV file!");
      setFormSubmitted(true);
      setFormStep(1);
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
          subject: `Admission Application: ${formData.studentName} (${formData.classApplied})`,
          from_name: "Trident Admissions Portal",
          to_email: CONFIG.CONTACT_EMAIL,
          student_name: formData.studentName,
          date_of_birth: formData.dob,
          gender: formData.gender,
          class_applied: formData.classApplied,
          parent_name: formData.parentName,
          parent_occupation: formData.parentOccupation,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          CSV_Format_Entry: csvRowText
        })
      });

      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true);
        setFormStep(1);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 animate-in fade-in duration-500">
      
      {/* Page Title */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Admission Portal
        </h1>
        <div className="h-1.5 w-24 bg-brand-500 mx-auto rounded-full"></div>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-semibold">
          Check eligibility, explore fee details, and apply online in minutes.
        </p>
        {hasSubmissions && (
          <div className="pt-2">
            <button
              onClick={downloadCumulativeCSV}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-extrabold text-xs shadow-sm cursor-pointer inline-flex items-center space-x-1.5 transition-all duration-200"
            >
              <span>📊 Download Cumulative CSV (Admin)</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid: Process and Age Table */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Step-by-step Process */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Admission Process</h3>
          <div className="space-y-6">
            {[
              { num: '01', title: 'Fill Registration Form', desc: 'Submit basic student, parent, and contact details using our online application form below.' },
              { num: '02', title: 'Interactive Meet / Test', desc: 'A basic interactive meet for nursery-KG, or a concept check assessment for class I to XI.' },
              { num: '03', title: 'Document Submission', desc: 'Verify Birth Certificate, Transfer Certificate, Aadhar Card, and previous report card.' },
              { num: '04', title: 'Admission Confirmed', desc: 'Pay the term fees to secure student ledger, uniforms, and class schedule ledger.' }
            ].map((step, idx) => (
              <div key={idx} className="flex space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 dark:bg-slate-800 text-brand-600 dark:text-accent-sky font-extrabold text-lg shrink-0">
                  {step.num}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">{step.title}</h4>
                  <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Age Criteria */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Eligibility Criteria</h3>
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-white font-extrabold border-b border-slate-100 dark:border-slate-800">
                  <th className="p-4 sm:p-5">Class Group</th>
                  <th className="p-4 sm:p-5">Min Age (As on Mar 31)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-650 dark:text-slate-355 font-semibold">
                <tr>
                  <td className="p-4 sm:p-5">Nursery</td>
                  <td className="p-4 sm:p-5 text-brand-600 dark:text-accent-sky font-bold">3+ Years</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5">Kindergarten (KG)</td>
                  <td className="p-4 sm:p-5 text-brand-600 dark:text-accent-sky font-bold">4+ Years</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5">Grade I</td>
                  <td className="p-4 sm:p-5 text-brand-600 dark:text-accent-sky font-bold">5+ Years</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5">Grade II to V</td>
                  <td className="p-4 sm:p-5 text-brand-600 dark:text-accent-sky font-bold">6 to 9+ Years</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5">Grade VI to X</td>
                  <td className="p-4 sm:p-5 text-brand-600 dark:text-accent-sky font-bold">10 to 14+ Years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fee Structure Section */}
      <section className="space-y-8">
        <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white">Fee Structure 2026-27</h3>
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg max-w-4xl mx-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-white font-extrabold border-b border-slate-100 dark:border-slate-800">
                <th className="p-4 sm:p-5">Academic Level</th>
                <th className="p-4 sm:p-5">Annual Tuition Fee</th>
                <th className="p-4 sm:p-5">Activity & Lab Fee</th>
                <th className="p-4 sm:p-5">Security (Refundable)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-650 dark:text-slate-355 font-semibold">
              <tr>
                <td className="p-4 sm:p-5">Nursery & KG</td>
                <td className="p-4 sm:p-5 font-bold">₹42,000</td>
                <td className="p-4 sm:p-5">₹6,000</td>
                <td className="p-4 sm:p-5">₹5,005</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5">Grade I to V</td>
                <td className="p-4 sm:p-5 font-bold">₹54,000</td>
                <td className="p-4 sm:p-5">₹8,000</td>
                <td className="p-4 sm:p-5">₹5,005</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5">Grade VI to VIII</td>
                <td className="p-4 sm:p-5 font-bold">₹62,000</td>
                <td className="p-4 sm:p-5">₹10,000</td>
                <td className="p-4 sm:p-5">₹5,005</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5">Grade IX to X</td>
                <td className="p-4 sm:p-5 font-bold">₹72,000</td>
                <td className="p-4 sm:p-5">₹12,000</td>
                <td className="p-4 sm:p-5">₹5,005</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5">Grade XI to XII</td>
                <td className="p-4 sm:p-5 font-bold">₹85,000</td>
                <td className="p-4 sm:p-5">₹16,000</td>
                <td className="p-4 sm:p-5">₹5,005</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Online Admission Form */}
      <section className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Online Admission Form</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
            Apply today and our academic admissions officer will contact you within 24 hours.
          </p>
        </div>

        {formSubmitted ? (
          <div className="bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-4 animate-in zoom-in duration-300">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto" />
            <h4 className="text-2xl font-black text-emerald-805 dark:text-white">Form Submitted Successfully!</h4>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Thank you for applying. A copy of the application summary has been dispatched to <span className="font-bold text-brand-600 dark:text-accent-sky">{formData.email}</span>. Please keep this registration name (<span className="font-bold text-slate-800 dark:text-slate-100">{formData.studentName}</span>) handy.
            </p>
            <button
              onClick={() => {
                setFormSubmitted(false);
                setFormData({
                  studentName: '',
                  dob: '',
                  gender: 'Male',
                  classApplied: 'Grade I',
                  parentName: '',
                  parentOccupation: '',
                  phone: '',
                  email: '',
                  address: '',
                  agreement: false
                });
              }}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-md cursor-pointer"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
            {/* Step Indicators */}
            <div className="bg-slate-50 dark:bg-slate-850 px-8 py-4 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between">
              {[
                { num: 1, label: 'Student Info' },
                { num: 2, label: 'Parent Info' },
                { num: 3, label: 'Submission' }
              ].map((step) => (
                <div key={step.num} className="flex items-center space-x-2">
                  <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-extrabold ${
                    formStep === step.num
                      ? 'bg-brand-600 text-white'
                      : formStep > step.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {step.num}
                  </span>
                  <span className="hidden sm:inline text-xs font-bold text-slate-650 dark:text-slate-400">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* STEP 1: Student Information */}
              {formStep === 1 && (
                <div className="space-y-5 animate-in slide-in-from-right duration-250">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-brand-500 pl-3">
                    Student Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Student Full Name *</label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                        placeholder="E.g. Raj Singh"
                      />
                      {errors.studentName && <p className="text-red-500 text-xxs font-semibold flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> {errors.studentName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Date of Birth *</label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                        />
                        {errors.dob && <p className="text-red-500 text-xxs font-semibold flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> {errors.dob}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Gender *</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 font-bold">Class Applied For *</label>
                    <select
                      name="classApplied"
                      value={formData.classApplied}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                    >
                      {classes.map((cls) => <option key={cls}>{cls}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2: Parent Information */}
              {formStep === 2 && (
                <div className="space-y-5 animate-in slide-in-from-right duration-250">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-brand-500 pl-3">
                    Parent Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Father/Mother/Guardian Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                        placeholder="E.g. Rajender Singh"
                      />
                      {errors.parentName && <p className="text-red-500 text-xxs font-semibold flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> {errors.parentName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Occupation</label>
                      <input
                        type="text"
                        name="parentOccupation"
                        value={formData.parentOccupation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                        placeholder="E.g. Engineer, Business"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Mobile Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                        placeholder="E.g. 9576543213"
                      />
                      {errors.phone && <p className="text-red-500 text-xxs font-semibold flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> {errors.phone}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                        placeholder="E.g. rajsing9576@gmail.com"
                      />
                      {errors.email && <p className="text-red-500 text-xxs font-semibold flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> {errors.email}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Submission & Agreement */}
              {formStep === 3 && (
                <div className="space-y-5 animate-in slide-in-from-right duration-250">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white border-l-4 border-brand-500 pl-3">
                    Contact & Declaration
                  </h4>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Postal Address *</label>
                    <textarea
                      rows="3"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                      placeholder="E.g. 123 Trident Avenue, Sector 5..."
                    ></textarea>
                    {errors.address && <p className="text-red-500 text-xxs font-semibold flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> {errors.address}</p>}
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                      />
                      <span className="text-xs text-slate-550 dark:text-slate-450 leading-relaxed font-semibold">
                        I hereby declare that the particulars given above are correct and authentic to the best of my knowledge. I understand that submitting this form does not guarantee an automated admission seat.
                      </span>
                    </label>
                    {errors.agreement && <p className="text-red-500 text-xxs font-semibold flex items-center mt-1.5"><AlertCircle className="h-3 w-3 mr-1" /> {errors.agreement}</p>}
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                {formStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center space-x-1 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {formStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-md flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSending}
                    className={`px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-md cursor-pointer transition-all duration-250 ${
                      isSending ? 'opacity-50 cursor-not-allowed bg-slate-550' : ''
                    }`}
                  >
                    {isSending ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </section>

    </div>
  );
}
