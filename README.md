# 🔥 RowdyAI - Your No-Nonsense AI Companion

> *The world is tough, so should your AI companion.*

RowdyAI is a full-stack SAAS chatbot that delivers AI responses with attitude. Forget polite, sugar-coated AI interactions - RowdyAI tells it like it is, with a rowdy and straightforward approach that matches the harsh realities of life.

## ✨ Features

- 💬 **Rowdy AI Conversations** - Get direct, no-nonsense responses to your queries
- 🖼️ **Image Upload & Analysis** - Upload images and get rowdy AI interpretations
- 🔐 **Secure Authentication** - Powered by Clerk for seamless user management
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- ⚡ **Real-time Processing** - Fast image processing with ImageKit
- 🤖 **Google Gemini Integration** - Leveraging cutting-edge AI technology

## 🎥 Demo
https://github.com/user-attachments/assets/230577f9-d6cb-4953-8ee7-7ce1da7d3cab

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Vite (Build tool)

**Backend:**
- Node.js
- Express.js
- MongoDB

**AI & Services:**
- Google Gemini API
- ImageKit (Image processing)
- Clerk (Authentication)

## 📁 Project Structure

```
rowdy-ai/
├── client/          # React frontend
│   ├── package.json
│   └── .env
└── server/          # Express backend
    ├── package.json
    └── .env
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database
- Required API keys (see Environment Variables section)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rowdy-ai.git
   cd rowdy-ai
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

### Environment Variables

#### Frontend (.env in /client folder)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
VITE_IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_API_URL=http://localhost:5000
VITE_MODE=dev
```

#### Backend (.env in /server folder)
```env
CLIENT_URL=http://localhost:5173
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
MONGODB_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
NODE_ENV=dev
```

### 🔑 Getting API Keys

To get the required environment variables, visit these websites:

- **Google Gemini API**: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
- **ImageKit**: [https://imagekit.io/registration](https://imagekit.io/registration)
- **Clerk**: [https://clerk.com/](https://clerk.com/)
- **MongoDB**: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 🎯 Usage

1. Sign up or log in using Clerk authentication
2. Start a conversation with RowdyAI
3. Ask questions or upload images
4. Experience AI responses with attitude!

## 🤝 Contributing

We welcome contributions to RowdyAI! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows our coding standards and includes appropriate tests.

## 📄 License & Credits

If you use this project or any part of it, please provide proper credit by linking back to this repository and mentioning the original creator.

**Please credit as:** *"Built upon RowdyAI by [Your Name]"*

## 🐛 Issues & Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/rowdy-ai/issues) on GitHub.

## 🌟 Show Your Support

If you found this project helpful, please give it a ⭐️ on GitHub!

---

*Remember: RowdyAI is designed to be direct and straightforward. Use responsibly and enjoy your no-nonsense AI companion!*
