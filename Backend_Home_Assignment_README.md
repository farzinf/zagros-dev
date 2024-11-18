# Backend Position Home Assignment

This document describes a home assignment for the **Backend Developer** position, involving the creation of a backend service using **Strapi.js (version 4 and above)** with the following specifications. The project is written in **TypeScript** and integrates **Auth0** for authentication using the **users-permissions plugin**.

---

## Requirements [:paperclip:](https://github.com/farzinf/zagros-dev/blob/master/documents/Backend-position-home-assignment.pdf)

### Core Tasks

1. **Messages Collection**:

   - Create a collection type called `Messages`.
   - Each message should have a relationship with the `Users` table.

2. **Custom API Endpoints**:

   - Manually implement API endpoints for **getting** and **creating** messages. Do not use Strapi's default CRUD APIs for these operations.
   - Implement an endpoint to **delete messages** (can use Strapi’s default DELETE API).

3. **Access Control**:

   - Users should only have access to their own messages.
   - Ensure no user can access messages belonging to others.

4. **Documentation**:
   - Provide a detailed guide for getting, creating, and deleting messages.

### Bonus Features

- **Third-Party Authentication**:

  - Implement authentication using a third-party provider (e.g., Firebase, Auth0).
  - This project uses **Auth0** for user authentication.

- **Live Version**:
  - Host and provide a link to a live version of the service.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **Auth0 Account** (or equivalent authentication provider account)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/backend-home-assignment.git
cd backend-home-assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Application Configuration
APP_URL=http://localhost:1337

# Auth0 Configuration
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
AUTH0_DOMAIN=your-auth0-domain
```

Replace the placeholders with your actual Auth0 credentials.

### 4. Start the Development Server

```bash
npm run develop
```

The server will start at `http://localhost:1337`.

---

## Project Details

### Messages Collection

The `Messages` collection contains the following fields:

- **id**: Auto-generated unique identifier.
- **content**: Text field to store the message content.
- **user**: Relation to the `Users` table (one-to-many).

### Custom Endpoints

#### Get Messages

- **Endpoint**: `GET /custom/messages`
- **Description**: Fetch all messages belonging to the authenticated user.
- **Access Control**: Only the authenticated user’s messages will be returned.

#### Create Message

- **Endpoint**: `POST /custom/messages`
- **Description**: Create a new message for the authenticated user.
- **Payload Example**:
  ```json
  {
    "content": "Your message content here"
  }
  ```

#### Delete Message

- **Endpoint**: `DELETE /messages/:id`
- **Description**: Deletes a message if it belongs to the authenticated user.

### Authentication

This project uses the **users-permissions plugin** with **Auth0** as the provider for user authentication. Ensure your Auth0 application is set up with the following:

- **Allowed Callback URLs**: `http://localhost:1337/connect/auth0/callback`
- **Allowed Logout URLs**: `http://localhost:1337`

Users must authenticate via Auth0 before accessing the API.

---

## Deployment

1. Build the project for production:

   ```bash
   npm run build
   ```

2. Deploy the application using your preferred platform (e.g., Heroku, AWS, Vercel).

3. Set the necessary environment variables in your hosting environment.

---

## Deliverables

1. A functional backend service with the above requirements implemented.
2. Documentation for getting, creating, and deleting messages (this README).
3. Link to a live version of the service (bonus).

---

## Bonus Points

- **Code Quality**: Ensure the code is well-structured, clean, and uses TypeScript effectively.
- **Authentication**: Use third-party authentication like Auth0 (implemented here).

---

## License

This project is licensed under the MIT License.
