from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import re

model = joblib.load("models/spam_model.pkl")
vectorizer = joblib.load("models/vectorizer.pkl")

app = FastAPI()


class SpamRequest(BaseModel):
    message: str


# -----------------------------
# 1. COMPANY / ENTITY DETECTION
# -----------------------------
KNOWN_COMPANIES = [
    "moniepoint",
    "opay",
    "palmpay",
    "gtbank",
    "access bank",
    "uba",
    "zenith",
    "paypal",
    "amazon",
    "google",
    "microsoft"
]


def detect_companies(text):
    text = text.lower()
    return [c for c in KNOWN_COMPANIES if c in text]


# -----------------------------
# 2. SCAM PATTERNS (IMPROVED)
# -----------------------------
SCAM_PATTERNS = [
    ["ceo", "gift"],
    ["ceo", "money"],
    ["ceo", "transfer"],
    ["claim", "now"],
    ["free", "gift"],
    ["free", "money"],
    ["urgent", "action"],
    ["verify", "account"],
    ["account", "suspended"],
    ["login", "verify"],
    ["bank", "update"],
    ["otp", "share"],
    ["send", "details"],
    ["click", "link"],
    ["win", "money"],
    ["you", "won"],
    ["selected", "winner"],
    ["congratulations", "win"],
    ["gift", "card"],
    ["crypto", "double"],
    ["investment", "guaranteed"],
    ["help", "money", "send"],
    ["need", "money", "help"],
    ["pay", "fee"],
    ["unlock", "money"],
    ["box", "money"],
    ["inheritance", "claim"],
    ["blacksmith", "pay"],
    ["release", "funds"],
    ["transfer", "percentage"],
    ["i will give", "percent"],
    ["help me", "send money"],
    ["foreign", "money"],
    ["locked", "money"],
    ["safe", "open"],
    ["bank", "release"],
]


def detect_scam_story(text):
    text = text.lower()

    signals = 0

    # broken/awkward trust-building intro
    if "friend from" in text:
        signals += 1

    # unrealistic financial promise
    if "%" in text and "money" in text:
        signals += 1

    # third-party payment request
    if "pay" in text and "help" in text:
        signals += 1

    # hidden/locked money narrative
    if "locked" in text or "safe" in text or "box" in text:
        signals += 1

    # foreign origin scam trope
    if "australie" in text or "overseas" in text:
        signals += 1

    return signals


def pattern_detect(text):
    text = text.lower()
    hits = []

    for pattern in SCAM_PATTERNS:
        if all(word in text for word in pattern):
            hits.append(" + ".join(pattern))

    return hits


# -----------------------------
# 3. SUSPICIOUS WORDS (IMPROVED)
# -----------------------------
SUSPICIOUS_WORDS = [
    "free", "winner", "won", "urgent", "prize",
    "click", "offer", "money", "claim", "win",
    "guaranteed", "investment", "double",
    "rich", "income", "profit", "bonus",
    "limited", "action", "now", "today",
    "gift", "reward", "selected",
    "transfer", "bitcoin", "crypto",
    "login", "verify", "account",
    "password", "otp", "details",
    "send", "link", "http", "www"
]


# -----------------------------
# 4. FINAL DECISION ENGINE
# -----------------------------
def final_decision(text, ml_prob, patterns, story_score):

    reasons = []

    # strong scam narrative detection
    if story_score >= 2:
        reasons.append("advance_fee_scam_story")
        return {
            "prediction": "spam",
            "confidence": 0.95,
            "reasons": reasons
        }

    # pattern-based detection
    if len(patterns) > 0:
        reasons.append("pattern_match")
        ml_prob = min(1.0, ml_prob + 0.3)

    # final threshold
    prediction = "spam" if ml_prob > 0.55 else "ham"

    return {
        "prediction": prediction,
        "confidence": round(float(ml_prob), 2),
        "reasons": reasons
    }
# -----------------------------
# 5. API ENDPOINT
# -----------------------------


@app.get("/")
def home():
    return {"status": "SpamShield API running"}


@app.post("/predict")
def predict(data: SpamRequest):

    text = data.message.lower()

    # ML prediction
    vector = vectorizer.transform([data.message])
    probs = model.predict_proba(vector)[0]
    ml_prob = probs[1]

    # Rule systems
    found_words = [w for w in SUSPICIOUS_WORDS if w in text]
    patterns = pattern_detect(text)
    companies = detect_companies(text)

    # Boost ML probability slightly
    if len(found_words) >= 2:
        ml_prob = min(1.0, ml_prob + 0.15)

    story_score = detect_scam_story(text)

    # Final decision
    result = final_decision(
        text=text,
        ml_prob=ml_prob,
        patterns=patterns,
        story_score=story_score
    )

    # Add explanation layer
    result["suspicious_words"] = found_words
    result["patterns"] = patterns
    result["companies_detected"] = companies

    return result
