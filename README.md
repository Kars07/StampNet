# Core-engine of StampNet

## Overview

This is the repo that holds the main backend, Frontend and smartContract for Stampnet. StampNet is a decentralized time-stamping system for documents built with Arbitrum using Stylus. It allows users to upload a file, video or any other media or enter text, generating a timestamped hash stored on the blockchain to prove the document's existence at a certain time without storing sensitive data.

## Features
User Authentication: Secure login system allowing users to access the Stampnet dashboard for uploading of media.

Landing Page: the home page of stampnet which contains the contents, slider, Frequently asked questions tab and a "Get Started button" which takes you Login using either google or metamask.

Documentation Page: Browse and read through all the neccessarities needed to upload a document and also how to reach us.

Dashboard Page: User interactive page that allows user to upload their media(videos,image,or douments), generates a hash key and then stores the hash on the blockchain and
then verifies the document.

Animations and slider: Css animations that make the app beautiful and creative.

Social Links: Social links are very active. So feel free to contact us regarding any issues or questions....

## Prerequisites

Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version >= 14.x.x)
- [React.js](https://react.dev/) (version >=^19.0.0)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- The other dependencies can be gotten in the package.json file within the frontend folder.

## Tech Stack
Frontend: React.js

Backend: Node.js, Express.js

DataBase: MongoDB

Blockchain: Solidity, Arbitrum Sepolia Testnet

Deployment: Vercel

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
StampNet_contract/
nitro-devnode
.gitmodules
README.md
package-lock.json
package.json
node_modules/
StamNet_frontend/
│
public/
│
├── images/
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

##Contents of StampNet_Frontend

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

This project uses **bootstrap** , **Boxicons** and **Swiper and Animations** for web3 interation ,Icons and Animations. You can check using:
   ```bash
   npm install bootstrap boxicons swiper 
   ```

To auto-format the code:
   ```bash
   npm run format
   ```

## Questions?

For any questions or help , feel free to reach out to the Team leader or the contributors of this Repository.


for you to download metamask click this link : [MetaMask Download](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)


For the link of the app click on this link: [StampNet demoWebsite](https://StampNet.vercel.app)
