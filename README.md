# Admin FAQ Management - React Project

This project is a React-based web application for managing Frequently Asked Questions (FAQs) in an admin interface. The admin can **add** and **display** FAQs through a user-friendly interface. The FAQs are displayed dynamically.

## **Overview**
This project is designed to manage FAQs in an admin panel, where the admin can:
- **Add new FAQ entries** with question and answer content.
- **Display FAQs** in an organized manner for quick access by users.

The application is built using **React** and integrates with a **backend API** (using **REST** API) to fetch and add FAQs from the database.

---

## **Features**
- **CRUD Operations**: Admin can create and read FAQ entries.
- **Multilingual Support**: Admin can add translations for each FAQ (e.g., Hindi, Bengali, etc.).
---

## **Technologies**
- **Frontend**:
  - React.js + Typescript
  - axios (for API requests)
  - tailwindcss (for styling)
  
- **Backend**: [Backend Repo](https://github.com/Maniii97/BharatFD-Task)
  - Node.js + Express.js (for API)
  - MongoDB (for storing FAQs)
  - Redis for caching

---

## **Installation**

### Prerequisites
Before you start, ensure you have the following installed:
- **Node.js** (LTS version)
- **npm** or **yarn**

### Steps to Install

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Maniii97/admin-bharatfd.git
    ```

2. **Install dependencies**:
    Run the following command to install the required packages:
    ```bash
    npm install
    ```

3. **Start the development server**:
    Run the following command to start the React app:
    ```bash
    npm start
    ```

    The application will be accessible at `http://localhost:5173` by default.

---

## **Usage**

- **Adding FAQs**:
    - Use the 'Add FAQ' button in the admin panel to create a new FAQ.
    - Add the question and answer, along with optional translations for multilingual support.

---

## **Admin Panel Functions**
  
- **Dashboard**:
  - Displays the list of all FAQs.
  
- **Add FAQ**:
  - The admin can create a new FAQ entry.
---

## **API Integration**

The React application communicates with the backend API to perform CRUD operations on the FAQ data. The API endpoints are as follows:

- **GET** `/api/faq` - Retrieve all FAQs.
- **POST** `/api/faq` - Add a new FAQ.

Make sure the backend API is running before starting the React frontend.

---
