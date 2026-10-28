# Week-off Entry UI

A responsive work-calendar configuration interface built with React and Tailwind CSS. The application allows users to configure weekly holidays and manage full-day and half-day working schedules.

## Features

- Responsive work-calendar interface.
- Select or deselect individual weekdays and week numbers.
- Select all weeks for a particular day.
- Toggle **Half working day & half weekend** mode.
- Configure individual week timings as Full Day, 1st Half, or 2nd Half.
- Saturday selected by default.
- Save calendar configuration and inspect the resulting data in the browser console.
- Reset the calendar using the Cancel button.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Lucide React
- JavaScript

## Prerequisites

- Node.js (LTS recommended)
- npm

## Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
```

Replace the repository URL and folder name with the actual values.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the localhost URL displayed in your terminal, usually `http://localhost:5173`.

## How to Use

1. Open the application.
2. Select or deselect the desired weekdays and week numbers.
3. Use the **All** checkbox to toggle all five weeks for a particular day.
4. Enable **Half working day & half weekend** to display individual week checkboxes and timing dropdowns.
5. Choose the appropriate timing for each week.
6. Click **Save** to inspect the selected calendar configuration in the browser console.
7. Click **Cancel** to reset the calendar.

## Project Structure

```text
.
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

The exact structure may vary slightly depending on the project setup.

## Current Limitations

- Calendar data is logged to the browser console and is not persisted to a database.
- There is no authentication or backend integration.
- The calendar-year definition section is a placeholder if it has not yet been implemented.

## License

Add a license if you intend to distribute the project under specific terms.
