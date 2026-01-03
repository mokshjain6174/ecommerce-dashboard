# 📊 Admin Inventory & Sales Dashboard

A full-stack **Inventory Management System** built with **Next.js 16**, **MongoDB**, and **Cloudinary**. This application provides a secure, responsive dashboard for administrators to track stock levels, visualize sales performance, and manage product inventory in real-time.

![Project Preview](https://via.placeholder.com/800x400?text=Dashboard+Preview+Image)

## 🚀 Live Demo
- **Live Site:** [Your Vercel Link Here]
- **GitHub Repository:** [Your GitHub Link Here]

---

## ✨ Key Features

### 🛡️ Secure Authentication
- **Admin-Only Access:** Protected routes using server-side session verification.
- **HTTP-Only Cookies:** Secure login sessions preventing client-side XSS attacks.
- **Environment-Based Credentials:** No hardcoded passwords in the codebase.

### 📦 Inventory Management (CRUD)
- **Create:** Add new products with details like price, stock, category, and images.
- **Read:** Searchable, filterable list of all inventory items with status badges.
- **Update:** Edit product details with pre-filled forms and automatic data re-fetching.
- **Delete:** Remove obsolete items with confirmation safeguards.

### 🖼️ Media Optimization
- **Cloudinary Integration:** Seamless image uploads replacing local storage.
- **Base64 Handling:** Client-side previewing before server upload.
- **Performance:** Images are served via CDN for fast loading speeds.

### 📈 Analytics & Visualization
- **Real-Time Charts:** Interactive Bar and Pie charts built with `Recharts`.
- **Sales Insights:** Leaderboards for top-selling products and revenue breakdown by category.
- **Stock Alerts:** Visual indicators for low-stock items (< 5 units).

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS (Responsive Design)
- **Visualization:** Recharts
- **Icons:** Heroicons / SVG

### Backend
- **Database:** MongoDB Atlas (NoSQL)
- **ODM:** Mongoose
- **Validation:** Zod (Schema Validation)
- **Server Actions:** Next.js Server Actions (No API routes needed)

### DevOps & Tools
- **Image Hosting:** Cloudinary
- **Deployment:** Vercel
- **Version Control:** Git & GitHub

---

## ⚙️ Environment Variables

To run this project locally, you need to create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority

# Cloudinary (Image Uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Credentials (For Login)
ADMIN_EMAIL=admin@store.com
ADMIN_PASSWORD=1234

🚀 Getting Started
Follow these steps to set up the project locally:

1. Clone the Repository
Bash

git clone [https://github.com/your-username/inventory-dashboard.git](https://github.com/your-username/inventory-dashboard.git)
cd inventory-dashboard
2. Install Dependencies
Bash

npm install
# or
yarn install
3. Setup Environment
Create your .env file (see above) and add your MongoDB and Cloudinary credentials.

4. Run the Development Server
Bash

npm run dev
Open http://localhost:3000 in your browser.

📂 Project Structure
Bash

├── app/
│   ├── login/           # Admin Login Page
│   ├── products/[id]/   # Dynamic Product Edit Page
│   ├── globals.css      # Global Styles & Tailwind Imports
│   ├── layout.tsx       # Root Layout & Font Config
│   └── page.tsx         # Main Dashboard (Server Component)
├── components/
│   ├── Dashboard.tsx    # Main UI Logic & Tabs
│   ├── ProductForm.tsx  # Create/Edit Form with Image Upload
│   ├── StockChart.tsx   # Recharts Visualization
│   └── ...              # Other UI Components
├── lib/
│   ├── actions/         # Server Actions (Auth, Product CRUD)
│   ├── models/          # Mongoose Database Schemas
│   └── mongoose.ts      # DB Connection Handler
└── public/              # Static Assets
🧠 What I Learned
Building this project helped me master Next.js 16 Server Actions, allowing me to build a secure full-stack application without needing a separate backend server. I solved complex challenges related to caching and revalidation (revalidatePath), ensuring that the dashboard always reflects the latest database state without manual refreshes. I also learned how to handle secure file uploads by converting images to Base64 on the client and hosting them on Cloudinary.