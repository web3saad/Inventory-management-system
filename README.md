# Inventory Management System - Full Stack Application



---

## Technologies Used

- **Backend:** TypeScript, Node.js, Express.js, MongoDB, Mongoose, Zod
- **Frontend:** TypeScript, React, Redux Toolkit, Ant Design, Zod, Recharts, React Hook Form, SweetAlert2, React Router DOM

---

## Key Features

1. **User Authentication**

2. **Profile Management**

3. **Product Management**

4. **Sales Management**

5. **Seller Management**

6. **Purchase Management**

7. **Sales History**

---

## Running the Application Locally

### 1. Setup Environment Variables

- In the `client` folder, create a `.env` file and add:

```bash
VITE_BASE_URL=http://localhost:8000/api/v1
```

- In the `server` folder, create a `.env` file and add:

```bash
NODE_ENV=dev
PORT=8000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 2. Install Dependencies and Run Backend

```bash
cd server
npm install
npm run dev
```

### 3. Install Dependencies and Run Frontend

```bash
cd client
npm install
npm run dev
```

---

Thank you