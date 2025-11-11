# Account Manager App

A single-page React application designed for account management, featuring a complete user authentication flow using React Hooks and Context API for simple, in-memory state management. The application's UI is built with the latest Bootstrap 5, following a modern, clean, and unique design .

## 🚀 Getting Started

### Prerequisites

*   Node.js (v16+) and npm installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPO_LINK]
    cd account-manager-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # Installs: react, react-dom, bootstrap, react-router-dom
    ```
3.  **Run the application:**
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:5173`.

## ✨ Features & Functionality

   Registration Page (`/register`):Allows new users to create an account.
  Login Page (`/login`): Allows users to sign in with their existing credentials.
 Account Management Page (`/account`):
  Protected Route:Accessible only after a successful login.
   Allows users to view and edit their `Name`, `Email`, and optionally update their `Password`.
Authentication Flow:** Implemented using React's **Context API** for global state management of user sessions and account data.
Route Protection:** Uses a custom `<PrivateRoute>` component with `react-router-dom` v6 to prevent unauthenticated access to the `/account` page.
In-Memory Database:** User data is stored in a simple array within the `AuthContext.js` file for demonstration purposes.
Error Handling: Basic client-side form validation (e.g., password mismatch, required fields) and server-side emulation (e.g., duplicate username, invalid credentials) are handled and displayed gracefully.

## 🎨 Design Framework

Framework:Bootstrap 
UI/UX:The application features a dark-themed background with light, rounded, and shadow-enhanced form cards (`.custom-card-shadow`) for a clean, professional, and visually appealing user interface. The design is fully responsive thanks to Bootstrap's grid system.

## 📁 Code Structure

The code is organized to be simple, highly readable, and maintainable, utilizing functional components and hooks.

| File/Folder | Purpose |
| :--- | :--- |
| `src/context/AuthContext.js` | Core Logic. Contains the global state (`useContext`/`useState`) for all user data, `login`, `logout`, `register`, and `updateAccount` functions. (The in-memory "database"). |
| `src/components/PrivateRoute.js`| A Route Guard component that redirects unauthenticated users to `/login`. |
| `src/App.js` | Sets up **React Router v6** routes and wraps the application with the `AuthProvider`. |
| `src/components/Login.js` | Login form implementation with Bootstrap styling and state handling. |
| `src/components/Register.js` | Registration form with validation and account creation logic. |
| `src/components/Account.js` | Protected component for viewing and editing user information. |
| `src/index.css` | Custom CSS to apply the unique dark background gradient and card styles. |


