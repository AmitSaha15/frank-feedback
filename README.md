# [Frank Feedback](https://frank-feedback.vercel.app/)

Frank Feedback is a full-stack web application built with Next.js, TypeScript, and MongoDB. It provides a seamless platform for users to submit feedback anonymously, with authentication and email verification features.

## Features

- **Next.js & React**: Built with Next.js and React for a modern, server-rendered web experience.
- **Authentication**: Secure authentication and authorization using Auth.js.
- **Email Verification**: Integrated with Resend to send verification emails for enhanced security.
- **MongoDB Database**: Efficient data storage and retrieval for user feedback.
- **Modern UI**: Styled with Shadcn for a sleek and intuitive user experience.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Shadcn
- **Backend**: Next.js API routes, Auth.js
- **Database**: MongoDB
- **Email Service**: Resend

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/)
- A Resend account for email verification

### Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/yourusername/frank-feedback.git
   cd frank-feedback
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file and add the following:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   MONGODB_URI=your-mongodb-connection-string
   RESEND_API_KEY=your-resend-api-key
   NEXTAUTH_SECRET=your-auth-secret
   ```

4. **Run the Development Server**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Deployment

You can deploy the app using Vercel:

1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy the application:
   ```sh
   vercel
   ```
   Follow the setup prompts and add the required environment variables in Vercel settings.


## Contact

For any inquiries, reach out via GitHub Issues or email at `amitsahawork42@gmail.com`.


