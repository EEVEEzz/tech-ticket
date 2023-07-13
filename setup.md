how i setup this project.

1. create project folder (support desk)
2. create sub-folders `backend` & `frontend`

3. in the root, install dependencies `npm i express dotenv bcryptjs colors cookie-parser jsonwebtoken mongoose multer`

4. Starting in `backend`. Create an express server called `server.js`
- import dependencies and initialize express.
```javascript
// server.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import cookieParser from "cookie-parser";

const PORT = 5000;

const app = express();

// body parser for json and urlencode
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

app.get("/", function (req, res) {
  res.status(200).json({message: "API RUNNING"})
});

app.listen(PORT, function () {
  console.log(`Listing on port ${PORT}`);
});
```

5. Create the first endpoint
- GET `/api/tickets`
```javascript
// server.js

app.use('/api/tickets', {{route}} )
```

6. in backend, create a folder `routes` with a file called `ticketRoutes.js`
> routes will contain the endpoints for requests and the controllers that handle them. When a POST, GET, PUT or DELETE request is made to `/api/tickets` the `ticketRoutes.js` file will handle the endpoint, the controller `ticketController.js` will handle the logic. 

- we start of two simple endpoints to POST and GET.

```javascript
// ticketRoutes.js
import express from 'express'
const router = express.Router()
import {
    createTicket,
    getTicket
} from '../controllers/ticketController.js'

router.get()

router.post()

export default router
```