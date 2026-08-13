# Imagify – AI Text-to-Image Generator

Imagify is a full-stack AI-powered web application that transforms text prompts 
into high-quality images in seconds, using the ClipDrop Text-to-Image API. Built 
with a modern MERN-based stack, it features secure authentication, a credit-based 
usage system, and integrated payments — delivering a complete SaaS-style product 
experience from prompt to purchase.

# Features

- **AI Image Generation** — Convert text prompts into images via the ClipDrop API
- **Secure Authentication** — JWT-based login/signup with bcrypt password hashing
- **Credit System** — Every generation consumes credits, tracked per user in MongoDB
- **Razorpay Integration** — Purchase credit plans with real-time payment verification
- **Fast, Responsive UI** — Built with React, Vite, and Tailwind CSS
- **Smooth Animations** — GSAP-powered scroll reveals, hover interactions, and progress indicators
- **Global State Management** — React Context API for auth, credits, and modal state
- **Protected Routes** — Authenticated API requests across all sensitive endpoints

# Tech Stack

**Frontend:** React.js, Vite, React Router DOM, Tailwind CSS, GSAP, Axios, React Toastify  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt  
**Payments:** Razorpay  
**AI Service:** ClipDrop Text-to-Image API

# How It Works

1. User signs up / logs in (JWT-secured)
2. User enters a text prompt to generate an image
3. Backend calls the ClipDrop API, deducts a credit, and returns the result
4. User can download the image or generate another
5. When credits run low, users purchase more via Razorpay — credits are added automatically on successful payment