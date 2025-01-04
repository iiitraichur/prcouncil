
# Contributing to PR Council

Thank you for considering contributing to PR Council! We welcome your ideas, bug reports, and pull requests to improve the project. Please take a moment to review this guide before getting started.

---

## How to Contribute

### Reporting Issues
- Check if the issue has already been reported in the **[Issues](../../issues)** section.
- If not, open a new issue and include:
  - A clear title and description.
  - Steps to reproduce the issue (if applicable).
  - Relevant screenshots or logs.

### Feature Requests
- Open an issue with the **Feature Request** template and describe:
  - What the feature would do.
  - Why it would be useful.
  - Any specific implementation ideas.

### Submitting Code Changes
1. **Fork the Repository**: Click the "Fork" button on the top-right of this page.
2. **Clone the Repository**:  
   ```bash
   git clone https://github.com/your-username/pr-council.git
   ```
3. **Create a Branch**:  
   Use a descriptive branch name:  
   ```bash
   git checkout -b feature/new-feature-name
   ```
4. **Make Changes**: Write clear and concise code. Follow the project's coding standards.
5. **Commit Your Changes**:  
   Include a clear and descriptive commit message:  
   ```bash
   git commit -m "Add feature: new-feature-name"
   ```
6. **Push Your Changes**:  
   ```bash
   git push origin feature/new-feature-name
   ```
7. **Submit a Pull Request**:  
   Open a pull request to the `main` branch of this repository. Provide a clear description of the changes and their purpose.

---

## Firebase Integration

If you are contributing Firebase-related changes, ensure that credentials are handled securely. Follow these steps:

1. **Environment Variables**:
   - Store Firebase credentials in environment variables or a `.env` file (e.g., for Node.js or Next.js projects).  
     Example `.env` file:  
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

2. **Using Credentials in Code**:
   - Access credentials using environment variables instead of hardcoding them.  
     Example:  
     ```javascript
     const firebaseConfig = {
       apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
       authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
       projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
       storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
       messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
       appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
     };
     ```

3. **Restrict API Key Access**:
   - In the Firebase Console, restrict the API key to authorized domains or IP addresses.

4. **Avoid Committing Sensitive Files**:
   - Add `.env` to your `.gitignore` file to ensure it isn’t pushed to GitHub:  
     ```plaintext
     # Environment variables
     .env
     ```

---

## Code Style Guidelines
- Follow clean and consistent coding practices.
- Ensure your code is thoroughly tested before submitting.
- Use descriptive variable and function names.
- Avoid introducing unnecessary dependencies.

---

## Communication
For questions or discussions, please use:
- The **[Discussions](../../discussions)** section.
- Reach out to [pr.council@iiitr.ac.in](mailto:pr.council@iiitr.ac.in).

---

## Contributor Code of Conduct
By participating in this project, you agree to uphold a welcoming and respectful environment. Please review the [Code of Conduct](CODE_OF_CONDUCT.md) for more details.

Thank you for contributing to PR Council!
