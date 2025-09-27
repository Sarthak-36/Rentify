# RENTIFY - Where Renting Meets Simplicity

Welcome to RENTIFY, a user-friendly platform designed to streamline the rental process for both renters and property owners. Renters can browse through a collection of listings, filter by category or search with keywords, and express interest in properties that pique their attention. Property owners can create listings, manage them, and connect with interested renters.
## Deployed Link
https://rentify-taupe.vercel.app/
## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
RENTIFY simplifies the rental process by offering an intuitive platform for both renters and property owners. Our mission is to make finding and managing rental properties as easy as possible.

## Tech Stack

### Frontend
- **React-Vite**: A lightning-fast development environment for building modern React applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid and responsive UI development.
- **Redux**: A state management library that provides a predictable way to handle application data.

### Backend
- **Node.js**: A JavaScript runtime environment for server-side development.
- **Express.js**: A flexible Node.js web framework for building APIs and web applications.
- **JWT (JSON Web Token)**: A secure way of authenticating users and authorizing access to protected resources.
- **MongoDB**: A NoSQL document database that offers flexible data storage and retrieval.

## Features
- **For Renters**:
  - Browse through property listings
  - Filter by category or search with keywords
  - Express interest in properties
- **For Property Owners**:
  - Create and manage property listings
  - Connect with interested renters

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/shubhamkandekar/Rentify.git
   cd client 
   npm i / npm install
   npm run dev ( development server will start of react application)
   cd server
   npm i / npm install 
    Create a .env file in the root directory and add the following:
    env.example
    MONGODB_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
   npm run start (development server will be start )
   


### Usage
  ### For Renters
1. Browse Listings: Upon accessing the application, renters can view a list of available properties. Use the search bar or filter options to narrow down the listings based on location, price, and other preferences.

2. View Property Details: Click on any property listing to view detailed information, including photos, descriptions, and contact details of the property owner.

3. Express Interest: If a property interests you, click the "Express Interest" button. This will notify the property owner of your interest.

### For Property Owners
1. Create an Account: Sign up for an account to start listing your properties.

2. Create a Listing: Once logged in, navigate to the "Create Listing" section. Fill in the property details, upload photos, and set your rental terms.

3. Manage Listings: View and manage your property listings from the "My Listings" section. Here, you can edit or remove listings as needed.

4. Connect with Renters: When a renter expresses interest in your property, you will receive a notification. You can then connect with the renter to discuss further details.

### License
This project is licensed under the MIT License. See the LICENSE file for details.
