# Breast Cancer Detection System 🩺

![Live Site](https://img.shields.io/badge/Live_Site-View%20Demo-brightgreen?style=for-the-badge&logo=vercel)
![GitHub Repo stars](https://img.shields.io/github/stars/rajpratham1/Breast-Cancer-Dectaction?style=for-the-badge&logo=github&label=Stars)

A web application that uses a machine learning model to predict whether a breast tumor is benign or malignant based on the Wisconsin Breast Cancer Dataset. This tool is built with Flask and scikit-learn, featuring a Random Forest classifier.

### ➡️ **[View the Live Project Report](https://cancerdetction.vercel.app/)**

---

## 🚀 Features

* **📈 High-Accuracy Model:** Achieves **97.4% accuracy** in classifying tumors.
* **📊 Single Prediction:** Enter 30 feature values into a web form to get an instant prediction.
* **🗂️ Batch Prediction:** Upload a CSV or Excel file with multiple tumor samples to get predictions for all of them at once.
* **🤖 Robust Preprocessing:** Uses `StandardScaler` for feature normalization and **SMOTE** (Synthetic Minority Over-sampling Technique) to handle class imbalance in the training data.
* **🌐 Interactive Report:** A separate, detailed [project report website](https://cancerdetction.vercel.app/) with theme-switching, an auto-hiding navigation bar, and scroll-to-top functionality.



---

## 🛠️ Technology Stack

This project integrates a machine learning backend with a web-based frontend.

### **Backend (Machine Learning & API)**
* **Python 3**
* **Flask:** For creating the web server and REST API endpoints (`/predict`, `/predict_batch`).
* **Scikit-learn:** For the `RandomForestClassifier` model, `StandardScaler`, and `GridSearchCV`.
* **Pandas:** For data manipulation and processing file uploads.
* **NumPy:** For numerical operations.
* **imbalanced-learn:** For the `SMOTE` implementation.
* **Joblib:** For saving and loading the trained model.

### **Frontend (Project Report Page)**
* **HTML5**
* **CSS3:** (Flexbox, Grid, Custom Variables for theming)
* **JavaScript (ES6+):** (DOM manipulation for theme-switching, autohide header, and scroll animations)

---

## 📈 Model Performance

The final `RandomForestClassifier` model was trained on a balanced dataset (using SMOTE) and evaluated on an unseen test set, yielding excellent results.

| Metric | Score |
| :--- | :--- |
| **Accuracy** | **97.4%** |
| Precision (Malignant) | 98.6% |
| Recall (Malignant) | 96.5% |
| F1-Score (Malignant) | 97.5% |
| **ROC AUC Score** | **99.64%** |

---

## 📦 How to Run Locally

To get a local copy up and running, follow these simple steps.

### **Prerequisites**
* Python 3.8 or higher
* pip (Python package installer)

### **Installation & Setup**

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/rajpratham1/Breast-Cancer-Dectaction.git](https://github.com/rajpratham1/Breast-Cancer-Dectaction.git)
    cd Breast-Cancer-Dectaction
    ```

2.  **Create a virtual environment:**
    ```sh
    # For Windows
    python -m venv venv
    .\venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install the required packages:**
    ```sh
    pip install -r requirements.txt
    ```
    *(Note: You will need to create a `requirements.txt` file by running `pip freeze > requirements.txt` in your original project environment.)*

4.  **Run the Flask application:**
    ```sh
    flask run
    # or
    python app.py
    ```

5.  **Open in your browser:**
    Navigate to `http://127.0.0.1:5000`

---

## 👥 Our Team

This project was developed by a dedicated team of students.

### **Mentor**
* **M.R SAURABH** (Project Mentor)

### **Team Leaders**
* **MILLI SRIVASTAVA** (BCS2023004)
* **ADITYA RAJ** (BCS2023014)

### **Team Members**
* **SNEHIL SINGH** (BCS2023006)
* **AISHWARY MAHESHWARI** (BCS2023011)
* **PRATHAM KUMAR** (BCS2023015)
* **SANJEEV MAURYA** (BCS2023024)
* **JATIN SHARMA** (BCS2023025)
* **AYUSH GANGWAR** (BCS2023030)
* **ABHISHEK YADAV** (BCS2023032)
* **AYUSH PARASHARI** (BCS2023047)
