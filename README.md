# Server-Rendered E-commerce Product Management Dashboard

## 📌 Project Overview
This project is a server-side rendered (SSR) administrative dashboard designed for managing products in an e-commerce system. It focuses on providing fast page load times, improved SEO performance, and an efficient interface for administrators to perform CRUD (Create, Read, Update, Delete) operations.

## 🚀 Key Features
* **Server-Side Rendering (SSR):** Utilizes Next.js to render pages on the server for optimal performance.
* **Product Management (CRUD):**
    * **Create:** Add new products with details like price, stock, and descriptions.
    * **Read:** View a live inventory list fetched directly from the database.
    * **Delete:** Remove products instantly from the inventory.
    * **Update:** (In Progress) Edit existing product details.
* **Image Handling:** Support for uploading and displaying product images.
* **Robust Validation:** Uses **Zod** to ensure data integrity before it reaches the database.
* **Responsive UI:** Built with **Tailwind CSS** for a modern, mobile-friendly interface.

## 🛠️ Tech Stack
* **Frontend & Backend:** Next.js 15 (App Router)
* **Database:** MongoDB (via Mongoose)
* **Styling:** Tailwind CSS
* **Form Validation:** Zod
* **Language:** TypeScript

## ⚙️ Setup Instructions
Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/ecommerce-dashboard.git](https://github.com/YOUR_USERNAME/ecommerce-dashboard.git)
    cd ecommerce-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    * Create a file named `.env.local` in the root directory.
    * Add your MongoDB connection string:
    ```env
    MONGODB_URI=your_mongodb_connection_string_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the dashboard:**
    Visit `http://localhost:3000` in your browser.