# Backend Position Home Assignment

This document describes a home assignment for the **Backend Developer** position, involving the creation of a backend service using **Strapi.js (version 4 and above)** with the following specifications. The project is written in **TypeScript** and integrates **Auth0** for authentication using the **users-permissions plugin**.

---

## Requirements [:paperclip:](https://github.com/farzinf/zagros-dev/blob/master/documents/Backend-position-home-assignment.pdf)

### Core Tasks

1. **Messages Collection :white_check_mark:**:

   - Create a collection type called `Messages`.
   - Each message should have a relationship with the `Users` table.

2. **Custom API Endpoints :white_check_mark:**:

   - Manually implement API endpoints for **getting** and **creating** messages. Do not use Strapi's default CRUD APIs for these operations.
   - Implement an endpoint to **delete messages** (can use Strapi’s default DELETE API).

3. **Access Control :white_check_mark:**:

   - Users should only have access to their own messages.
   - Ensure no user can access messages belonging to others.

4. **Documentation :white_check_mark:**:
   - Provide a detailed guide for getting, creating, and deleting messages.

### Bonus Features

- **Third-Party Authentication :white_check_mark:**:

  - Implement authentication using a third-party provider (e.g., Firebase, Auth0).
  - This project uses **Auth0** for user authentication.

- **Live Version :x:**:
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
git clone https://github.com/farzinf/zagros-dev.git
cd zagros-dev
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Replace the placeholders with your actual Auth0 credentials.

### 4. Enable and Configure Auth0 Provider

1. create Auth0 account and create application [docs](https://docs.strapi.io/dev-docs/plugins/users-permissions#setting-up-the-provider---examples)
2. Log in to the **Strapi Admin Panel**.
3. Navigate to **Settings** → **Users & Permissions Plugin** → **Providers**.
4. Enable the **Auth0** provider and configure it with the following details:

   - **Client ID**: `my-client-id`
   - **Client Secret**: `my-secret`
   - **Host URI (Subdomain)**: `my-subdomain`
   - **Redirect URL to your front-end app**: `api/auth/auth0/callback`

5. Save the configuration.

### 5. Start the Development Server

```bash
npm run develop
```

The server will start at `http://localhost:1337`.

---

## Project Details

### Authentication

This project uses the **users-permissions plugin** with **Auth0** as the provider for user authentication. Ensure your Auth0 application is set up with the following:

- **Allowed Callback URLs**: `http://localhost:1337/connect/auth0/callback`
- **Allowed Logout URLs**: `http://localhost:1337`

Users must authenticate via Auth0 before accessing the API.

#### Process

1. Open the URL `/api/connect/auth0` in your browser. This will redirect you to the Auth0 authentication page.

2. Log in or sign up using your Auth0 credentials.

3. After successful authentication, you will be redirected to:

```
http://localhost:1337/api/auth/auth0/callback
```

#### Using

Use the JWT token in subsequent API requests by adding it to the Authorization header as a Bearer token:
If the authentication is successful, a JWT token will be issued.

```curl
Authorization: Bearer ${jwt}

```

Example jwt Token:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTczMTk0NjAxNX0.XjPQ240y1aLyN-3Fda1H3SojeGzyRrK0S1N5jMHIO0o

```

#### Verify

Verify your authentication status using the following endpoint:

Check Authentication Status:

- URL: http://localhost:1337/api/auth/status
- Curl Example:

```bash
curl -X GET http://localhost:1337/api/auth/status \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTczMTk0NjAxNX0.XjPQ240y1aLyN-3Fda1H3SojeGzyRrK0S1N5jMHIO0o"
```

If successful, the response will confirm your authenticated status.

---

### Messages

#### Collection

The `Messages` collection contains the following fields:

- **id**: Auto-generated unique identifier.
- **content**: Text field to store the message content.
- **sender**: Relation to the `Users` table (one-to-many).
- **recipient**: Relation to the `Users` table (one-to-many).

#### Endpoints

##### Get Messages

- **Endpoint**: `GET /api/messages`
- **Description**: Fetch all messages belonging to the authenticated user.
- **Access Control**: Only the authenticated user’s messages will be returned.

##### Create Message

- **Endpoint**: `POST /api/messages`
- **Description**: Create a new message for the authenticated user.
- **Payload Example**:
  ```json
  {
    "content": "Your message content here",
    "recipientId": 12
  }
  ```

##### Delete Message

- **Endpoint**: `DELETE /api/messages/:id`
- **Description**: Deletes a message if it belongs to the authenticated user.

## Deployment

1. Build the project for production:

   ```bash
   npm run build
   ```

2. Deploy the application using your preferred platform (e.g., Heroku, AWS, Vercel).

3. Set the necessary environment variables in your hosting environment.

---

## License

This project is licensed under the MIT License.
