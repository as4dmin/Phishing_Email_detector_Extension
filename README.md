

# Phishing Email Detector Extension 🚨

A Chrome extension (with a Flask backend) that helps detect phishing emails in Gmail (Outlook support planned), leveraging Gmail API and LLMs (e.g. ChatGPT) for content analysis.

---

## ✨ Features

- Scan emails and flag potential phishing attempts  
- Works directly within Gmail via a Chrome extension  
- Backend powered by Flask  
- Uses LLM (like ChatGPT) for contextual phishing detection  
- (Planned) OAuth support for Gmail and Outlook  

---

## 🛠 Tech Stack

- **Frontend**: JavaScript, HTML, CSS (Chrome Extension APIs)  
- **Backend**: Python, Flask  
- **APIs**: Gmail API, OpenAI (or other LLMs)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/as4dmin/Phishing_Email_detector_Extension.git
cd Phishing_Email_detector_Extension
````

---

### 2. Set Up the Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file with your credentials:

```env
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
OPENAI_API_KEY=your_openai_api_key
FLASK_ENV=development
```

Run the Flask server:

```bash
python app.py
```

---

### 3. Load the Chrome Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `chrome_extension/` folder

You should now see the extension icon in your browser toolbar.

---

## 🧪 Usage

1. Open Gmail in Chrome
2. Click the extension icon
3. Authenticate with your Gmail account
4. Click **Fetch Emails**
5. Choose an email and click **Scan Email**
6. View the phishing analysis and take action

---

## 📁 Project Structure

```
Phishing_Email_detector_Extension/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── ...
│
├── chrome_extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── background.js
│   └── styles.css
```

---

## 🔮 Future Improvements

* ✅ Support for Outlook (via IMAP)
* ✅ UI/UX enhancements
* ✅ Deploy Flask backend to cloud (Heroku, Render, etc.)
* ✅ Improve LLM model prompt tuning
* ✅ Background scanning and automatic flagging

---

## 📄 License

This project is licensed under the MIT License.
Feel free to use, modify, and distribute as needed.

---

## 🙏 Acknowledgements

* Google Gmail API
* OpenAI ChatGPT
* Chrome Extension Documentation
* Flask - Python web framework

---

```

Let me know if you'd like help creating a logo badge, setup screenshots, or a GIF demo section for the README!
```
