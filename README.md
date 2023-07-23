# Tech Ticket Support - Fullstack MERN App

Demo -> https://tickit-support.onrender.com/login

you can login with:
| Email | Password | Role |
| --------- | ------------- | ------- |
| admin@admin | 12345 | Admin |
| tech2@tech | 123 | User |
| ben@email.com | 12345 | User |

Fullstack MongoDB, Express, React & Node Technical Ticket Support Desk App
with Full CRUD (Create, Read, Update, Delete) Functionality

> **_psst, i'm not a developer but I'm learning fullstack. This is my first Fullstack WebApp after numerous small projects. I'm completely self taught and only know I can continue improving_**

> This Project and the layout of the tickets are designed around someone that works with PC's as this is something I have personal experience with. However, the current fields may also apply to various other types of technical work but if not, can always be updated to do so.

> With Multiple logins, for users and admins, there can be a clear communication between the tech at the back, the sales at the front and bossman out at head office. Or a handy tool to a freelance technician.

# Technologies used in this project

### Frontend

- Vite + React
- Redux Toolkit
- TailwindCSS + DaisyUI

### Backend

- NodeJS & ExpressJS
- MongoDB + mongoose
- bcryptJS
- JWT Token stored in http-only cookies

## App Features

### Global

- Dark/Light Mode
- Passwords are encrypted and hashed using bcryptJS
- http-only stored Tokens using jsonwebtoken

### Admins (owner)

- Unrestricted access across app
- Create, Read, Update & Delete Data
- Financial stats
- Only admins can mark tickets as Paid

### Users (techs)

- Route locked to only view certain routes
- Can add clients, tickets and add notes
- Cannot mark as Paid, but can mark as collected once paid

### Tickets

- Clients are first created, and tickets are created under said clients.
- Tickets are created as "new/open" until a mote is made which sets it to "in progress"
- Only Admins can mark tickets as paid, Collection is disabled until paid.
- There is a "No Payment" option.
- Notes can be added to tickets, along with the note maker and time created.
- Replacement Items can be added to tickets, and their prices will be updated in the total of the ticket.

# Setup

### Prerequisits

- MUST have Node v18 or higher installed.

  _Windows Download_ -> https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi

  _Mac Download_ -> https://nodejs.org/dist/v18.17.0/node-v18.17.0.pkg

- MUST have a MONGO_URI.

  _Login/Create MongoDB Account_ -> https://account.mongodb.com/account/login

  - create your organisation, project and database to aquire it's URI.
  - add the URI to your `.env` file

- Git Bash for Windows (highly recommend)

  _Download_ -> https://github.com/git-for-windows/git/releases/download/v2.41.0.windows.3/Git-2.41.0.3-64-bit.exe

  > using Git Bash, you can right-click in the root directory and open
  > a git terminal, that is much more well-suited and optimized for `npm`

# First MongoDB Document

- Assuming you have a MongoDB account and database setup
- Create a "Users" collection.
- Create YOUR user document.
  > this will be used to login to the Application
  > from the app you can create more users

| Key       | Value         | Type    | Required |
| --------- | ------------- | ------- | -------- |
| `name`    | _Your Name_   | String  | true     |
| `email`   | _Your Email_  | String  | false    |
| `number`  | _Your Number_ | String  | true     |
| `isAdmin` | _true_        | Boolean | true     |

> `isAdmin` must be set to `true` if you are the Admin
> once logged in, everything can be created, deleted and changed
> directly from the Admin Panel.

# Environment File

- Create a new file named `.env` in the root of the project.

  > **the data in the .env file is SENSITIVE and should
  > generally stay hidden from unwanted eyes.**

add the following lines:

```env
// .env

MONGO_URI='your mongo database uri'
NODE_ENV='production'    // or 'development' if not using the production build
PORT=5000
JWT_SECRET='anything'
```

> note: the MONGO_URI string will start as such
> `mongodb+srv://...`
> **_and don't forget to add your password in the URI where it asks for it_**

# Install Project Dependencies

1. Install backend dependencies

    _From the root directory_

    - open a terminal and type:
  `npm i`

2. Install frontend dependencies

    _Navigate to the `frontend` folder_

    - open a terminal and type:
  `npm i`

# Scripts

From the root, in a terminal, initiate one of the following.

1. Run Development (Both Backend & Frontend)

   - `npm run dev` - runs the script `"concurrently \" npm run server \" \" npm run client \" "`

   > `concurrently` is a useful node module to simplify running multiple servers.
   > in this case, it starts both the client (frontend) & server (backend).
   > be sure that your `.env` is using `NODE_ENV='development'`

2. Run Production Build

- `npm run build` will start the Vite Production build.
- runs the script `npm install && npm install --prefix frontend  && npm run build --prefix frontend`

- This installs both frontend and backend dependencies and starts the `npx vite build` script to start the Vite Production build.
- afterwards, run `npm start`

> **be sure that your `.env` is using `NODE_ENV='production'`**

3. manually import/destroy seed to database
   **_this is generally only for development_**

   - `npm run data:import` - will import the hardcoded data from `./backend/data.js` to MongoDB.
   - `npm run data:destroy` - ⚠️ Dangerous. Will completely erase all data in MongoDB.

# Startup

- Assuming you have installed and setup:

  - Node v18 or higher installed.
  - Git Bash installed.
  - MongoDB collection and user document created.
  - `.env` file created in the root of the project.
  - Correct configuration settings for `.env` file

- open a git bash terminal in the root of the project.

  - run `npm i` to install the project dependencies.

- open a git bash terminal in the `/frontend` folder.

  - run `npm i` to install the project dependencies.

- once both backend and frontend dependencies are installed.

  - from the root of the project, run `npm run build`
  - afterwards, run `npm start` to start the production backend.

- your project should be live at http://localhost:5000 or http://127.0.0.1:5000
  > if you see "API IS RUNNING" instead, make sure your .env file is correct
  > make sure that `NODE_ENV=production` and your `MONGO_URI` is correct.

# Model Schemas

## User Model

### Schema Properties:

- `name` : A required field that stores the user's name as a string.
- `email` : A required field that stores the user's email as a string and must be unique.
- `password` : A required field that stores the user's hashed password as a string.
- `number` : An optional field that stores the user's phone number as a number.
- `isAdmin` : A required field that stores a boolean value indicating whether the user is an administrator. It has a default value of `false`.

### Additional Schema Options:

- `timestamps` : This option is set to `true`, which automatically adds two fields to each document: `createdAt` and `updatedAt`. These fields record the date and time when a document is created and updated, respectively.

### Schema Methods:

- `matchPassword` : This method is a custom instance method defined on the userSchema. It is used to compare the entered plain-text password with the hashed password stored in the database. It returns a promise that resolves to `true` if the passwords match or `false` if they don't.

### Schema Hooks:

- `pre-save` hook : This hook is executed before saving a user document to the database. It is used to perform actions before saving, in this case, hashing the password before it is stored in the database. The hook checks if the password has been modified `isModified("password")`, and if not, it skips hashing to avoid rehashing the password unnecessarily. Otherwise, it generates a salt using `bcrypt.genSalt` and then hashes the password using `bcrypt.hash`.

## Ticket Model

### Schema Properties:

- `clientId`: A required field that stores the `ObjectId` of the associated client for the ticket. It references the "Client" model.

- `clientName`: An optional field that stores the name of the client for the ticket. It is a denormalized field to avoid frequent client lookups.

- `clientNumber`: An optional field that stores the phone number of the client for the ticket. It is also a denormalized field.

- `completedBy`: An optional field that stores the name of the user who completed the ticket. It references the "User" model.

- `replacements`: An array of objects that represent replacement items associated with the ticket. Each object has specific fields like `replacementName`, `replacementModel`, `replacementSerial`, `replacementPrice`, `isPaid`, and `paidAt`.

- `notes`: An array of objects that represent notes associated with the ticket. Each object has `user`, `name`, `comment`, and an optional `image` field.

- `itemName`: An optional field that stores the name of the item related to the ticket.

- `model`: An optional field that stores the model of the item related to the ticket.

- `serial`: An optional field that stores the serial number of the item related to the ticket.

- `fault`: An optional field that stores a description of the fault associated with the ticket.

- `isOpen`: A boolean field that indicates if the ticket is open. It defaults to `true`.

- `isClosed`: A boolean field that indicates if the ticket is closed. It defaults to `false`.

- `inProgress`: A boolean field that indicates if the ticket is in progress. It defaults to `false`.

- `completedAt`: An optional field that stores the date when the ticket is marked as completed.

- `collectedAt`: An optional field that stores the date when the client collects the completed item.

- `isCollected`: A boolean field that indicates if the item has been collected by the client. It defaults to `false`.

- `isCompleted`: A boolean field that indicates if the ticket is fully completed. It defaults to `false`.

- `isPaid`: A boolean field that indicates if the ticket is paid. It defaults to `false`.

- `paidAt`: An optional field that stores the date when the ticket is marked as paid.

- `paymentMethod`: An optional field that stores the payment method used for the ticket.

- `paymentResult`: An object that stores payment-related information, including `id`, `status`, `update_time`, `email_address`, and `name`.

- `totalPrice`: A field that stores the total price of the ticket. It defaults to `0.0`.

### Additional Schema Options

- `timestamps`

## Client Model:

### Schema Properties:

- `clientName` : A required field that stores the name of the client.

- `clientNumber` : A required field that stores the contact number of the client. It must be unique.

- `clientEmail` : An optional field that stores the email address of the client.

- `ticketsIsOpen` : An optional field that stores the number of open tickets associated with the client. It defaults to `0`.

- `ticketsIsClosed` : An optional field that stores the number of closed tickets associated with the client. It defaults to `0`.

- `tickets` : An array of objects that represent tickets associated with the client. Each object follows the structure defined in the `ticketSchema`.
