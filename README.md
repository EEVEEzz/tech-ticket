# Tech Ticket Support - Fullstack MERN App
### Full Stack MongoDB, Express, React & Node Technical Ticket Support Desk App
### Full CRUD (Create, Read, Update, Delete) Functionality directly from the App

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
- multerJS (image upload module)

# Setup
### Prerequisits
- MUST have Node v18 or higher installed.

  *Windows Download* -> https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi
  
  *Mac Download* -> https://nodejs.org/dist/v18.17.0/node-v18.17.0.pkg

- MUST have a MONGO_URI.
  
  *Login/Create MongoDB Account* -> https://account.mongodb.com/account/login
  - create your organisation, project and database to aquire it's URI.
  - add the URI to your `.env` file

 - Git Bash for Windows (highly recommend)
   
   *Download* -> https://github.com/git-for-windows/git/releases/download/v2.41.0.windows.3/Git-2.41.0.3-64-bit.exe

   > using Git Bash, you can right-click in the root directory and open 
   > a git terminal, that is much more well-suited and optimized for `npm`

# Environment File
- Create a new file named `.env` in the root of the project.
  
  > the data in the .env file is SENSITIVE and should 
  > generally stay hidden from unwanted eyes.

add the following lines:
```env
// .env

MONGO_URI='your mongo database uri'
NODE_ENV='production'    // or 'development' if not using the production build
PORT=5000
JWT_SECRET='anything'
```

# Install Project Dependencies
1. Install backend dependencies
   
*From the root directory*
   - open a terminal and type:
     `npm i`
     
3. Install frontend dependencies
   
*Navigate to the `frontend` folder*
   - open a terminal and type:
     `npm i`
  
# Scripts
From the root, in a terminal, initiate one of the following.
1. Run Development (Both Backend & Frontend)
   
   - `npm run dev` - runs the script `"concurrently \" npm run server \" \" npm run client \" "`


    > `concurrently` is a useful node module to simplify running multiple servers.
    > in this case, it starts both the client (frontend) & server (backend).
    > be sure that your `.env` is using `NODE_ENV='development'`

1. Run Production Build
   
   - `npm run build` will start the Vite Production build.
   - afterwards run `npm start`

     
   > be sure that your `.env` is using `NODE_ENV='production'`

3. manually import/destroy seed to database
   
   - `npm run data:import` - will import the hardcoded data from `./backend/data.js` to MongoDB.
   - `npm run data:destroy` - ⚠️ Dangerous. Will completely erase all data in MongoDB.


## App Features
### Global
- Dark/Light Mode
- Passwords are encrypted using bcryptJS
- http-only stored Tokens using jsonwebtoken

### Admins (owner)
- Unrestricted access across app
- Ability to view/edit/delete data
- Ability to view financial stats, revenue income, expenses etc.
- Ability to mark tickets as Paid
- Workflow and Ticket statistics

### Users (techs)
- Route locked to only view certain routes
- Can create clients
- Can create tickets and add notes
- Cannot mark as Paid, but can mark as collected
- Cannot view data intended for Admins-only


