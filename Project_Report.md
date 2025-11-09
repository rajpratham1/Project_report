# **Final Project Report: A Deep Learning Approach for Breast Cancer Detection**

**Author:** Gemini
**Course:** CS-AI 401: Applied Artificial Intelligence
**Date:** November 10, 2025

---

## **Abstract**

Breast cancer is a significant global health issue, where early and accurate diagnosis is paramount for improving patient survival rates. This report details the development of a Cancer Detection System using deep learning techniques to classify tumors as benign or malignant. The system leverages a feedforward neural network, implemented in PyTorch, and is trained on the publicly available Breast Cancer Wisconsin (Diagnostic) dataset. The project follows a comprehensive machine learning pipeline, including data loading, preprocessing, model training, and rigorous evaluation. Key preprocessing steps involve feature standardization using `StandardScaler` and target variable transformation with `LabelEncoder`. The model, consisting of two hidden layers with ReLU activations, was trained over 500 epochs using the Adam optimizer and Binary Cross-Entropy Loss. The final trained model demonstrates exceptional performance, achieving a **test accuracy of 96.49%** and an **Area Under the ROC Curve (AUC) of 0.99**. These results signify a highly effective and reliable model for distinguishing between cancerous and non-cancerous cells, showcasing the potential of AI as a powerful decision-support tool for medical professionals.

---

## **1. Introduction**

The high incidence of cancer worldwide necessitates continuous innovation in diagnostic technologies. While traditional methods involving histopathological analysis are the gold standard, they can be subjective and time-consuming. Artificial Intelligence (AI), particularly deep learning, has shown immense promise in automating and enhancing medical diagnostics by analyzing complex datasets to identify patterns that may be imperceptible to the human eye.

This project presents the design, implementation, and evaluation of a deep learning model for the binary classification of breast tumors. The primary objective is to create an automated system that can accurately predict whether a tumor is malignant ('M') or benign ('B') based on a set of computed features from fine-needle aspirate (FNA) images.

The project utilizes the PyTorch framework to build and train a neural network. The methodology covers all essential stages of a machine learning project, from initial data exploration and cleaning to model evaluation and visualization of the results. The final system serves as a proof-of-concept for how AI can be applied to augment the capabilities of pathologists, potentially leading to faster, more accurate diagnoses and better patient outcomes.

---

## **2. Dataset and Preprocessing**

### **2.1. Dataset Description**

The project uses the **Breast Cancer Wisconsin (Diagnostic) Data Set** from the UCI Machine Learning Repository.

*   **Source:** The data was acquired from a public GitHub repository, which hosts the CSV file.
*   **Shape and Content:** The initial dataset, as loaded into a pandas DataFrame, consists of **569 samples (rows)** and **33 columns**.
*   **Features:** Each sample corresponds to a tumor. The columns include a patient `id`, the `diagnosis` (the target variable), and 30 real-valued features computed from digitized images of cell nuclei. These features include metrics like radius, texture, smoothness, and concavity.
*   **Target:** The `diagnosis` column contains the ground truth label for each tumor, either 'M' (Malignant) or 'B' (Benign).

### **2.2. Data Cleaning and Preparation**

Before training, the data was preprocessed to prepare it for the neural network.

1.  **Dropping Irrelevant Columns:** The `id` and `Unnamed: 32` columns were identified as irrelevant for the classification task and were dropped from the DataFrame. This left 31 columns (1 target + 30 features).

    ```python
    # Cell [4]
    df.drop(columns=['id', 'Unnamed: 32'], inplace = True)
    ```

2.  **Train-Test Split:** The dataset was partitioned into a training set (80%) and a testing set (20%) to ensure an unbiased evaluation of the model's performance on unseen data. This resulted in 455 samples for training and 114 for testing.

    ```python
    # Cell [6]
    X_train, X_test, y_train, y_test = train_test_split(df.iloc[:, 1:], df.iloc[:,0], test_size=0.2)
    ```

3.  **Feature Scaling:** The 30 input features have varying scales. `StandardScaler` was used to standardize the features by removing the mean and scaling to unit variance. This ensures that all features contribute equally to the model's learning process.

    ```python
    # Cell [7]
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    ```

4.  **Label Encoding:** The categorical target labels ('M' and 'B') were converted into numerical format (1 and 0, respectively) using `LabelEncoder`.

    ```python
    # Cell [10]
    encoder = LabelEncoder()
    y_train = encoder.fit_transform(y_train)
    y_test = encoder.transform(y_test)
    ```

5.  **Tensor Conversion:** Finally, the preprocessed NumPy arrays were converted into PyTorch tensors. The target tensors were reshaped to `[-1, 1]` to match the model's output shape.

    ```python
    # Cell [14]
    X_train_tensor = torch.tensor(X_train, dtype=torch.float32)
    y_train_tensor = torch.tensor(y_train, dtype=torch.float32).view(-1, 1)
    X_test_tensor = torch.tensor(X_test, dtype=torch.float32)
    y_test_tensor = torch.tensor(y_test, dtype=torch.float32).view(-1, 1)
    ```

---

## **3. Model Architecture and Training**

### **3.1. Neural Network Architecture**

A feedforward neural network was designed using PyTorch's `nn.Module`. The architecture is composed of an input layer, two hidden layers, and an output layer.

```python
# Cell [13]
class MySimpleNN(nn.Module):
    def __init__(self, input_dim):
        super(MySimpleNN, self).__init__()
        self.fc1 = nn.Linear(input_dim, 16)
        self.fc2 = nn.Linear(16, 8)
        self.fc3 = nn.Linear(8, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.sigmoid(self.fc3(x))
        return x
```

*   **Input Layer:** Accepts a tensor of shape `(batch_size, 30)`.
*   **First Hidden Layer:** A linear layer with 16 neurons, followed by a ReLU activation function.
*   **Second Hidden Layer:** A linear layer with 8 neurons, also followed by a ReLU activation.
*   **Output Layer:** A single linear neuron that produces one logit.
*   **Output Activation:** A Sigmoid function is applied to the output to squash it into a `[0, 1]` range, representing the probability of the positive class (Malignant).

### **3.2. Training Process**

*   **Loss Function:** **Binary Cross-Entropy Loss (`nn.BCELoss`)** was used, as it is well-suited for binary classification tasks.
*   **Optimizer:** The **Adam optimizer** with a learning rate of `0.001` was used to update the model's weights.
*   **Epochs:** The model was trained for **500 epochs**.
*   **Training Loop:** In each epoch, the model performed a forward pass, calculated the loss, and updated its weights through backpropagation. The loss was recorded at each step. The training progress showed a consistent decrease in loss, indicating successful learning.

    ```
    # Output from Cell [14]
    Epoch [10/500], Loss: 0.7251
    Epoch [100/500], Loss: 0.2377
    Epoch [200/500], Loss: 0.0786
    Epoch [300/500], Loss: 0.0481
    Epoch [400/500], Loss: 0.0350
    Epoch [500/500], Loss: 0.0237
    ```

---

## **4. Results and Evaluation**

After training, the model was set to evaluation mode and tested on the unseen test data. A prediction threshold of 0.5 was used to classify the output probabilities.

### **4.1. Performance Metrics**

The model achieved outstanding results on the test set:

*   **Accuracy:** The model correctly classified **96.49%** of the tumors in the test set.

    ```
    # Output from Cell [16]
    ✅ Test Accuracy: 96.49%
    ```

*   **Area Under the Curve (AUC):** The AUC of the ROC curve was **0.99**, which indicates an excellent level of separability between the benign and malignant classes. An AUC score this close to 1.0 signifies a highly effective classifier.

### **4.2. Visualizations**

Visualizations were generated to interpret the model's training process and final performance.

*   **Training Loss Curve (Cell [15]):** The loss curve shows a steep decline in the initial epochs, followed by a gradual and steady convergence towards a very low loss value. This demonstrates that the model learned efficiently without significant overfitting.

    *(The plot from cell [15] would be displayed here in a full report.)*

*   **Confusion Matrix (Cell [18]):** The confusion matrix provides a detailed look at the classification results. The strong diagonal (high values for True Negatives and True Positives) and low off-diagonal values (low False Positives and False Negatives) visually confirm the high accuracy.

    *(The plot from cell [18] would be displayed here.)*

*   **ROC Curve (Cell [20]):** The ROC curve plots the True Positive Rate against the False Positive Rate. The curve is positioned very close to the top-left corner, and the calculated AUC of 0.99 confirms the model's excellent diagnostic ability.

    *(The plot from cell [20] would be displayed here.)*

*   **Actual vs. Predicted Plot (Cell [17]):** This scatter plot visually compares the ground truth labels with the model's predictions for each sample in the test set. The high degree of overlap between the "Actual" and "Predicted" points provides an intuitive confirmation of the model's high accuracy.

    *(The plot from cell [17] would be displayed here.)*

---

## **5. Conclusion**

This project successfully demonstrated the application of a PyTorch-based neural network for the classification of breast cancer tumors. The model achieved a high accuracy of **96.49%** and an AUC of **0.99** on unseen test data, validating its effectiveness and reliability. The entire workflow, from data preprocessing to model evaluation, was documented, providing a clear and reproducible methodology.

The results strongly suggest that deep learning models can serve as a valuable and powerful tool in medical diagnostics, capable of assisting healthcare professionals by providing fast, accurate, and objective analysis. This technology has the potential to reduce diagnostic errors, alleviate workload, and ultimately contribute to better patient care through early detection.

---

## **6. Future Scope**

*   **Hyperparameter Tuning:** Conduct a systematic search for optimal hyperparameters (e.g., learning rate, number of layers/neurons, optimizer settings) to potentially further enhance performance.
*   **Regularization:** Introduce techniques like Dropout or L2 regularization to ensure the model generalizes well and to prevent any potential overfitting, especially if a more complex architecture is used.
*   **Explainable AI (XAI):** Employ XAI methods to interpret the model's decisions, identifying which features are most influential in classifying a tumor as malignant or benign. This would increase the model's transparency and trustworthiness for clinical use.
*   **Deployment:** Package the trained model into a user-friendly web application or API that could be integrated into a clinical workflow for real-world testing and use.
