import React from "react";
import store from "./store";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Tickets from "./pages/Tickets.jsx";
import Register from "./pages/Register.jsx";
import Clients from "./pages/Clients";
import Client from "./pages/Client";
import NewClient from "./pages/NewClient";
import Login from "./pages/Login.jsx";
import "./index.css";
import NewTicket from "./pages/NewTicket";
import Ticket from "./pages/Ticket";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/clients" element={<Clients />} />
      <Route path="/clients/:id" element={<Client />} />
      <Route path="/new-client" element={<NewClient />} />
      
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/tickets/:id" element={<Ticket />} />
      <Route path="/clients/:id/new-ticket" element={<NewTicket />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={false}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
