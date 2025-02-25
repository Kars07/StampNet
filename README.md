# Core-engine of StampNet

## Overview

This is the repo that holds the main backend, Frontend and smartContract for Stampnet. It is a decentralized time-stamping system for documents built with Arbitrum using Stylus. It allows users to upload a file, video or any other media or enter text, generating a timestamped hash stored on the blockchain to prove the document's existence at a certain time without storing sensitive data.

## Prerequisites

Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version >= 14.x.x)
- [React.js](https://react.dev/) (version >=^19.0.0)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- The other dependencies can be gotten in the package.json file within the frontend folder.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd <project-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   
4. **Running the Application**:
   - To start the development server, run:
     ```bash
     npm start
     ```
   - The app will run at `http://localhost:3000`.

## Folder Structure

This project is organized into the following structure:

```
node_modules/
public/
│
├── images
src/
│
├── components/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── styles/
├── config/
└── App.js
```

### 1. **`public/`**
   This folder contains the images folder where the pictures used on the app are kept. It also contains favicon.ico, index.html, manifest.json, robots.txt

### 2. **`src/`**
   This folder contains the core routes for the dashboardpage, Aboutuspage, landingpage, loginpage, registerPage and ForgotPasswordpage. For example:
   - `App.js`: Manages all the whole integration of routes on the app.


## Running Tests

If you're using testing libraries such as Jest or Mocha, you can run tests with:
   ```bash
   npm run test
   ```

## Code Style

This project uses **Bootstrap** and **Boxicons** for code linting and Icons. You can check using:
   ```bash
   npm install bootsrap boxicons
   ```

To auto-format the code:
   ```bash
   npm run format
   ```

## Questions?

For any questions or help , feel free to reach out to the Team leader or the contributors of this Repository.


for you to download metamask click this link : [MetaMask Download](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)


For the link of the app click on this link: [StampNet demoWebsite](https://StampNet.vercel.app)
