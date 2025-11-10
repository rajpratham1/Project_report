#  Breast Cancer Detection: A PyTorch Project Report

This project is an interactive, web-based report that documents the creation and performance of a neural network model for breast cancer detection. The model is built from scratch using PyTorch and trained on the Breast Cancer Wisconsin (Diagnostic) dataset.

The final model achieves **99.12% accuracy** and an **AUC score of 0.99** on the test data.



---

## 🌐 1. The Website (Frontend)

The frontend is a clean, responsive, single-page application built to present the project's findings in an accessible and professional format.

### Key Features:
* **Single-Page Design:** All report sections are on one page, accessible via a smooth-scrolling sidebar.
* **Theme Switcher:** Includes three themes (Light, Blue, Dark) with the user's preference saved in `localStorage`.
* **Responsive:** The layout adapts for all screen sizes, from mobile phones to desktops.
* **Animations:** Subtle fade-in-on-scroll animations for a modern feel.
* **Team Section:** A dedicated section to credit all project members, leaders, and the mentor.

---

## 🤖 2. The Model (Backend)

The core of the project is a feedforward neural network built with PyTorch to classify tumors as benign (0) or malignant (1).

### Model Details:
* **Dataset:** Breast Cancer Wisconsin (Diagnostic) Data Set
    * **Samples:** 569
    * **Features:** 30 numerical features (e.g., radius, texture, smoothness).
* **Preprocessing:**
    * `LabelEncoder`: Converts 'M' (Malignant) and 'B' (Benign) to 1 and 0.
    * `StandardScaler`: Scales all 30 features to have a mean of 0 and a standard deviation of 1, which is crucial for neural network performance.
* **Data Split:** 80% Training Set (455 samples) / 20% Testing Set (114 samples).
* **Model Architecture:**
    1.  Input Layer (30 features)
    2.  Hidden Layer 1: `nn.Linear(30, 16)` + `ReLU`
    3.  Hidden Layer 2: `nn.Linear(16, 8)` + `ReLU`
    4.  Output Layer: `nn.Linear(8, 1)` + `Sigmoid`
* **Training:**
    * **Loss Function:** `nn.BCELoss()` (Binary Cross-Entropy Loss)
    * **Optimizer:** `optim.Adam()` (Learning Rate = 0.001)
    * **Epochs:** 500

---

## 📈 3. Results

The model performs exceptionally well on the unseen test data.

* **Accuracy:** **99.12%** (Correctly classified 113 out of 114 test samples)
* **AUC Score:** **0.99** (Indicates an almost-perfect classifier)
* **Visualizations:**
    * **Training Loss Curve:** Shows a smooth decrease in loss, indicating successful training.
    * **ROC Curve:** Hugs the top-left corner, visually confirming the excellent AUC score.
    * **Confusion Matrix:** Clearly shows 0 False Negatives (the most critical metric) and only 1 False Positive.

---

## 🛠️ 4. Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Backend & Model:** Python
* **Libraries:**
    * **PyTorch:** For building and training the neural network.
    * **Scikit-learn:** For data preprocessing (`StandardScaler`, `LabelEncoder`), splitting (`train_test_split`), and metrics (`accuracy_score`, `confusion_matrix`, `roc_curve`).
    * **Pandas:** For loading and manipulating the dataset.
    * **NumPy:** For numerical operations.
    * **Matplotlib:** For plotting the visualizations.

---

## 🚀 5. How to Run

This project has two parts: the website (report) and the model (code).

### 1. To View the Website:
1.  Clone this repository: `git clone https://github.com/your-username/your-repo-name.git`
2.  Navigate to the project directory: `cd your-repo-name`
3.  Simply open the `index.html` file in your web browser.

### 2. To Run the Model (Jupyter Notebook):
1.  Ensure you have Python 3 and Jupyter Notebook installed.
2.  Install the required libraries:
    ```bash
    pip install torch pandas numpy scikit-learn matplotlib
    ```
3.  In your terminal, run: `jupyter notebook`
4.  Open the `cancer.ipynb` file and run the cells.

---

## 🧑‍🤝‍🧑 6. Our Team

### Mentor
* M.R SAURABH

### Team Leaders
* **MILLI SRIVASTAVA** (BCS2023004)
* **ADITYA RAJ** (BCS2023014)

### Team Members
* **SNEHIL SINGH** (BCS2023006)
* **AISHWARY MAHESHWARI** (BCS2023011)
* **PRATHAM KUMAR** (BCS2023015)
* **SANJEEV MAURYA** (BCS2023024)
* **JATIN SHARMA** (BCS2023025)
* **AYUSH GANGWAR** (BCS2023030)
* **ABHISHEK YADAV** (BCS2023032)
* **AYUSH PARASHARI** (BCS2023047)

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
