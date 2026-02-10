# Portfolio Chatbot - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

The chatbot will open at `http://localhost:3000`

### 3. Build for Production
```bash
npm build
```

## Integration with Existing Portfolio

### Option 1: Add to Existing HTML (Simple)

Add this to your `index.html` before `</body>`:

```html
<div id="chatbot-root"></div>
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="chatbot-bundle.js"></script>
```

### Option 2: Standalone React App

Run as separate React application on different port and embed via iframe.

## How It Works

1. **Keyword Matching**: User input is matched against keywords in `chatbot-data.json`
2. **Response Selection**: Appropriate response is selected based on matched category
3. **State Management**: React useState manages conversation history
4. **Quick Questions**: Pre-defined questions for easy interaction

## Customization

- Edit `chatbot-data.json` to modify responses
- Modify `chatbot.css` to change appearance
- Update `Chatbot.jsx` to add new features

## Features

✅ Keyword-based intent detection
✅ Pre-defined responses from JSON
✅ Quick question buttons
✅ Smooth animations
✅ Mobile responsive
✅ Chat history
✅ Auto-scroll to latest message
