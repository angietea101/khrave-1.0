# Khrave

Welcome to **Khrave**! 🎉 A social web application for foodies where users can post unique custom orders from food chains and share their homemade recipes.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Sign up and log in securely.
- **Custom Orders**: Post and share custom food orders from various chains.
- **Recipe Sharing**: Share your favorite homemade recipes with the community.
- **Session Tracking**: Users have a personalized experience with session management.
- **Responsive Design**: Optimized for mobile and desktop use.

## Technologies

This project is built using the following technologies:

- **Frontend**:
  - React
  - Next.js
  - Tailwind CSS
  - shadcn/ui (toast notif)
- **Backend**:
  - Node.js
  - PostgreSQL
  - Prisma
- **Authentication**:
  - NextAuth.js
- **Styling**:
  - Tailwind CSS

## Installation

To get started with **Khrave**, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/angietea101/khrave.git
   cd khrave
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   Create a `.env` file in the root directory and add the required environment variables. Required environment variables indclude: `DATABASE_URL` and `NEXTAUTH_SECRET`.

4. Prisma Initialization:

   After installing the dependencies, add a step to initialize Prisma and generate the database schema.

   ```bash
   npx prisma init
   ```

5. Database Migration:

   Migrate your database after setting up your schema in schema.prisma

   ```bash
   npx prisma migrate dev --name init
   ```

6. Run the development server:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage

Once the application is running, you can:

- Sign up or log in to your account.
- Create new custom orders and share them with others.
- Browse through recipes shared by the community.

## Contributing

Contributions are welcome! If you would like to contribute to **Khrave**, please fork the repository and create a pull request.

1. Fork the project
2. Create your feature branch:

   ```bash
   git checkout -b feature/YourFeature
   ```

3. Commit your changes:

   ```bash
   git commit -m 'Add some feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/YourFeature
   ```

5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
