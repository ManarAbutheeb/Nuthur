# **Nuthur – Early Wildfire Prediction System Using Artificial Intelligence**

## **Problem Statement**

Wildfire risk is increasing worldwide due to climate change, rising temperatures, and recurring drought. The Asir and Al-Soudah region in southern Saudi Arabia is one of the areas highly exposed to these risks.

The main challenges include:

Difficulty in detecting fires early before they spread
Significant environmental and economic impact due to delayed response
Lack of systems relying on local climate and geographic data for predicting fire ignition

---

## **Our Solution: The Nuthur Prediction System**

Nuthur provides an AI-powered solution that analyzes high-resolution climate and geographic data to predict wildfire likelihood before ignition.

### **Key Features**

Predicts wildfire probability using weather and terrain data
Sends immediate alerts via email
Zone-based system for accurate risk localization
Notifies authorities and volunteers when risk is detected
Automatically runs the prediction model every 8 hours
Allows volunteers to submit reports with descriptions and images
Admins can trigger manual model execution when needed

---

## **Dataset Overview**

### **1. Algeria Wildfire Dataset (Open Source)**

Daily binary classification data
Includes weather variables and Fire Weather Index (FWI)
Contains 244 records

### **2. Local Dataset – Southern Saudi Arabia (2019–2025)**

NASA FIRMS: fire location, time, intensity, and confidence
After cleaning: 613 records (73 fire, 540 no-fire)
Weather variables and FWI components added using the Open-Meteo API

**Total merged dataset:** 857 samples – 14 features

the Datasets Will be available soon

---

## **Models Used**

### **Machine Learning Models**

XGBoost
CatBoost
Random Forest
Logistic Regression
SVM
Ensemble Classifier
Stacking

### **Deep Learning Models**

LSTM
CNN 1D
CNN 2D
MLP
TabNet

### **Data Sampling Techniques**

Oversampling
Undersampling
CTGAN synthetic data generation

### **Feature Selection**

L1 Regularization
RFECV

---

## **Results**

The highest performance was achieved by **XGBoost with Oversampling**, reaching an **accuracy of 0.97**.
This model outperformed all other ML and DL models across all sampling strategies.

<img width="374" height="250" alt="image" src="https://github.com/user-attachments/assets/49e763d8-35e5-4c9e-91ed-1788bb9aec97" />

---


