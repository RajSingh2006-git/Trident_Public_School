# Trident Public School Website

A modern, highly responsive, and professional educational institution website built with **React**, **Tailwind CSS v4**, and **Vite**. Features premium UX styling, interactive portals, and built-in direct email forwarding.

---

## ✨ Features

- **🌓 System-wide Dark Mode**: Fluid theme toggle between light and dark modes.
- **🔍 Smart Search Routing**: Site-wide search indexer that automatically redirects to matching sections.
- **📝 Form Gmail Forwarding**: Direct contact and multi-step admission forms connected via Web3Forms API to send responses to Gmail.
- **🏫 Student Portal Dashboard**:
  - Downloadable study materials and lab portfolios.
  - Interactive homework checklist tracker.
  - Periodic timetable grid.
  - Roll-based Term scorecard lookup.
- **📈 Parent Connection Portal**:
  - Visual monthly attendance logging calendar (heatmaps).
  - Custom SVG performance tracking line charts.
  - Inbox feeds for admin notifications.
- **📍 Location Map**: Embedded responsive Google Maps iframe.

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 (Zero-config, CSS theme variables)
- **Icons**: Lucide React
- **Email Gateway**: Web3Forms API

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Run Locally (Development)
Start the hot-reloading dev server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
Compile optimized static assets inside the `dist` folder:
```bash
npm run build
```

---

## 📬 Gmail Configuration (Web3Forms Key)

To receive inquiries and admission forms in your Gmail:
1. Go to [Web3Forms](https://web3forms.com) (free, no login required).
2. Register your email to receive an **Access Key**.
3. Open `src/config.js` and paste your key:
   ```javascript
   WEB3FORMS_ACCESS_KEY: "your-access-key-here"
   ```

---

## 🌐 Hosting & Deployment

The easiest way to host this website for free is via **Netlify Drop**:
1. Run `npm run build` to generate the `dist` folder.
2. Drag and drop the `dist` folder directly onto **[Netlify Drop](https://app.netlify.com/drop)**.
3. Your site will be online in seconds!
