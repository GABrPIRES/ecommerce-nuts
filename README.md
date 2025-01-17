## Nuts Ecommerce

**Description**

This is an e-commerce project for selling nuts, developed with Next.js on the front-end and PostgreSQL on the back-end. The system allows users to view and purchase different types of nuts, with features like authentication, stock management, and payment processing.

**How to run the project locally**

1. Clone the repository:

```bash
git clone https://github.com/GABrPIRES/ecommerce-nuts.git
```

2. Navigate to the project folder:

```bash
cd nutecommerce
```

3. Install the dependencies:

```bash
npm install
```

4. Set up the environment variables by creating a .env file at the root of the project with the following values:

```bash
DATABASE_URL=yourPostgresCredential
EXAMPLE => DATABASE_URL=postgresql://user:password@localhost:port/projectname
```

5. Start the development server:

```bash
npm run dev
```

- The project will be running at http://localhost:3000.


**Technologies used**

- Next.js: React framework for full-stack development.
- PostgreSQL: Relational database for data management.
- JWT: JSON Web Token-based authentication.
- Node.js: Back-end runtime environment.


**How to contribute**

1. Fork this repository.

2. Create a branch for your feature or fix:

```bash
git checkout -b feature/novo-recurso
```

3. Make your changes and add them to the repository:

```bash
git add .
git commit -m "Descrição do que foi feito"
```

4. Push your changes to your fork:

```bash
git push origin feature/novo-recurso
```

5. Open a pull request to the original repository.


## Next.JS Informations

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
