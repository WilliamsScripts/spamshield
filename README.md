# 🛡️ SpamShield AI

SpamShield AI is a mobile application that detects spam, scam, and suspicious messages using machine learning and rule-based fraud detection.

## Download Link  
[Download APK](https://expo.dev/artifacts/eas/7kqn9nTCPBWvdqiRYn6J8X.apk)


## Features

- Spam and non-spam message detection
- Confidence scoring
- Scam pattern detection
- Suspicious keyword detection
- Company impersonation detection (e.g. Moniepoint, OPay, PayPal)
- React Native mobile application
- FastAPI backend API

---

## Tech Stack

### Mobile
- React Native
- Expo
- Axios

### Backend
- FastAPI
- Scikit-learn
- Joblib

### Machine Learning
- TF-IDF Vectorization
- Logistic Regression / SGD Classifier
- Custom scam intelligence rules

---

## Project Structure

```text
spamshield/
├── backend/
│   ├── app/
│   ├── models/
│   ├── training/
│   └── requirements.txt
│
└── mobile/
```

---

## Running the Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

---

## Training the Model

```bash
python training/train.py
```

This generates:

```text
models/spam_model.pkl
models/vectorizer.pkl
```

---

## Running the Mobile App

```bash
cd mobile

npm install

npx expo start
```

---

## API Example

### Request

```json
{
  "message": "Congratulations! You have won a free gift. Claim now."
}
```

### Response

```json
{
  "prediction": "spam",
  "confidence": 0.94,
  "reasons": ["pattern_match"],
  "suspicious_words": ["free", "claim"],
  "companies_detected": []
}
```

---

## Deployment

### Backend
Deployed the FastAPI service on Render.

### Mobile
Built the React Native app using Expo EAS Build.


---

## License

MIT License
