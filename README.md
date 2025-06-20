# 📦 Subscription Pro

**Subscription Pro** is a RESTful API built with **Node.js**, **Express**, and **MongoDB** to help users manage their subscriptions efficiently. Features include authentication, subscription tracking, automated renewal date handling, and more.

---

## 🚀 Features

- 🔐 **Authentication** (Sign Up, Sign In)
- 👤 **User Management**
- 📅 **Subscription Management** (Create, Fetch, Categorize, Auto-renewal)
- 📧 Email Support (via Upstash/Arcjet integration - optional)
- 🛡️ Rate Limiting & Bot Protection (Arcjet)
- ✅ Data validation with Joi
- 🧪 Modular, Testable Codebase
- 🧱 MongoDB with Mongoose

---

## 📁 Project Structure

```
abrahamelebute-subscription-pro/
├── server.js               # Entry point
├── src/
│   ├── app.js              # Express app setup
│   ├── config/             # Env, Arcjet, Upstash
│   ├── controllers/        # Route controllers
│   ├── database/           # MongoDB connection
│   ├── middlewares/        # Auth, error, rate limit
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routers
│   ├── utils/              # Helpers, constants, emails
│   └── validations/        # Joi schemas
├── tests/                  # Tests (Coming soon)
├── uploads/                # File uploads (if needed)
├── public/                 # Public static files
├── docs/                   # Documentation files
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/abrahamelebute-subscription-pro.git
cd abrahamelebute-subscription-pro
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Files

Create your environment config file:  
`touch .env.development.local`

```env
PORT=4000
DB_URI=mongodb://localhost:27017/subscription_pro
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
ARCJET_KEY=your_arcjet_key
QSTASH_TOKEN=your_upstash_token
QSTASH_URL=https://api.upstash.io/workflows/...
EMAIL_PASSWORD=your_email_password
```

---

## 🔄 Running the App

### Start in Development

```bash
npm run dev
```

### Start in Production

```bash
npm start
```

Server will run on `http://localhost:PORT`.

---

## 🧪 Testing

> Coming soon: `Jest` + `Supertest` integration for API testing.

---

## 📬 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/sign-up` | Register a new user |
| `POST` | `/api/v1/auth/sign-in` | Login and get JWT token |
| `GET`  | `/api/v1/users/` | Get all users (auth) |
| `GET`  | `/api/v1/users/:id` | Get specific user (auth) |
| `POST` | `/api/v1/subscriptions` | Create a new subscription (auth) |
| `GET`  | `/api/v1/subscriptions/user/:id` | Get user's subscriptions (auth) |

> Full documentation coming soon via Swagger / Postman.

---

## 🛠️ Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Auth**
- **Joi Validation**
- **Arcjet** (Security + Rate Limiting)
- **Upstash QStash** (Workflow/Queue)
- **ESLint + Prettier**

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## 📄 License

[MIT](LICENSE)

---

## 👨‍💻 Author

**Abraham Elebute**  
[GitHub](https://github.com/your-username) · [LinkedIn](https://linkedin.com/in/your-profile)

---

> Feel free to reach out if you'd like help setting up Swagger, Postman, or test coverage for this API.
