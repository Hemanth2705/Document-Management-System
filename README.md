# Document Management System

## Overview
This is a **Document Management System** that allows users to:
- Upload files 📂
- Create folders 📁
- Search for documents and folders 🔍

Built using **Next.js, Express.js, MySQL, and Styled Components**.

## Features
- **Upload and Manage Files**: Add new files and folders
- **Search Functionality**: Search for files and folders dynamically
- **Styled Components**: Responsive and modern UI

## Tech Stack
- **Frontend**: Next.js, TypeScript, Styled Components
- **Backend**: Express.js, Node.js
- **Database**: MySQL
- **State Management**: React useState & useEffect

---

## Getting Started

### **1️⃣ Prerequisites**
Ensure you have the following installed:
- **Node.js** (>= 16.x.x)
- **npm** or **yarn**
- **MySQL** (Database Setup)

### **2️⃣ Clone the Repository**
```sh
# Using HTTPS
git clone https://github.com/your-repo/document-management-system.git

# OR using SSH
git clone git@github.com:your-repo/document-management-system.git
```

### **3️⃣ Install Dependencies**
Navigate to the frontend and backend folders and install dependencies:

```sh
# Install frontend dependencies
cd frontend
npm install  

# Install backend dependencies
cd ../backend
npm install 
```

---

## Database Setup

### **1️⃣ Create a MySQL Database**
```sql
CREATE DATABASE document_management;
```

### **2️⃣ Configure Environment Variables**
Create a `.env` file in the `backend` folder and add:
```env
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=document_management
```

---

## Running the Project

### **1️⃣ Start the Backend**
```sh
cd backend
npm npx ts-node server.ts
```

### **2️⃣ Start the Frontend**
```sh
cd frontend
npm run dev
```

The project will be running at: [http://localhost:3000](http://localhost:3000) 

---

