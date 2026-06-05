import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import SGDClassifier
from sklearn.metrics import classification_report


# Load dataset
df = pd.read_csv("training/data/spam.csv")

df["label"] = df["label"].map({
    "ham": 0,
    "spam": 1
})

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    df["text"],
    df["label"],
    test_size=0.2,
    random_state=42
)

# Vectorizer upgrade
vectorizer = TfidfVectorizer(
    lowercase=True,
    stop_words="english",
    ngram_range=(1, 3),
    min_df=1,
    max_df=0.9,
    sublinear_tf=True
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Model upgrade
model = SGDClassifier(
    loss="log_loss",
    max_iter=2000,
    class_weight="balanced"
)

model.fit(X_train_vec, y_train)

# Evaluate
predictions = model.predict(X_test_vec)

print(classification_report(y_test, predictions))

print("Training samples:", len(X_train))

# Save model
joblib.dump(model, "models/spam_model.pkl")
joblib.dump(vectorizer, "models/vectorizer.pkl")
