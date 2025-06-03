
# 🛒 Next.js E-commerce Frontend

This is a modern, scalable, and feature-rich e-commerce frontend built with **Next.js 14**, **TypeScript**, **TanStack Query**, **Redux**, **Formik**, and **Yup**. It interacts with a microservices-based backend (API Gateway, Customer, Product, Order services).

---

## 📁 Folder Structure

src/ ├── app/                 # Pages (Next.js 14 App Router) │   ├── login/ │   ├── register/ │   ├── products/ │   ├── cart/ │   ├── checkout/ │   ├── orders/ │   └── admin/add-product/ ├── component/           # Reusable UI components ├── lib/ │   ├── constants/       # Static constants │   ├── hooks/           # Custom React hooks │   ├── interface/       # TypeScript interfaces │   ├── model/           # Data models │   ├── plugin/          # Axios config (API base URL, interceptors) │   └── store/           # Redux store configuration ├── style/               # Global styles └── type/                # Shared TypeScript types

---

## 🚀 Features

- 🔐 User Authentication (Login/Register)
- 🛍️ Product Listing with Pagination
- 📄 Product Details Page
- 🛒 Add/Remove to Cart
- 💳 Checkout Flow
- 📦 Order History
- ➕ Add Product (Admin Only)

> ✅ Admin actions require authentication.

---

## 👨‍💻 Admin Credentials

Email: admin@example.com
Password: password123

> These credentials are seeded in the backend `customer-service` → `prisma/seed.ts`.

---

## 🧰 Tech Stack

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TanStack Query](https://tanstack.com/query)
- [Axios](https://axios-http.com/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Install Dependencies

npm install

3. Configure Environment Variables

 

4. Run the Development Server

npm run de

📄 License

MIT

---

 
