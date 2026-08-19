# Imagify – AI Text-to-Image Generator

Imagify is a full-stack AI image generation platform that converts text prompts into images using the ClipDrop Text-to-Image API. It includes JWT authentication, a credit-based usage system, and Razorpay-powered payments for purchasing additional credits.

# Features

- **AI Image Generation** — Generate images from text prompts using ClipDrop
- **Authentication** — JWT-based authentication with bcrypt password hashing
- **Credit System** — Each image generation consumes 1 credit
- **Razorpay Payments** — Purchase credit plans with server-side payment verification
- **MongoDB** — Store users, credits, and transaction records
- **Responsive UI** — React, Vite & Tailwind CSS
- **GSAP Animations** — Smooth UI interactions and transitions
- **Context API** — Centralized authentication, credits, and API state

# Tech Stack

**Frontend:** React.js, Vite, React Router, Tailwind CSS, GSAP, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt  
**Payments:** Razorpay  
**AI:** ClipDrop Text-to-Image API

# How It Works

1. User registers or logs in using JWT authentication.
2. User enters a text prompt to generate an image.
3. Backend validates the user and checks their credit balance.
4. ClipDrop generates the image and the backend returns it to the frontend.
5. One credit is deducted after successful generation.
6. Users can download the generated image or create another one.
7. Additional credits can be purchased through Razorpay.

# Architecture

```text
React Frontend
      ↓
React Context + Axios
      ↓
Express REST API
      ↓
JWT Authentication
      ↓
MongoDB ─────── ClipDrop API
      │
      └──── Razorpay Payments
```