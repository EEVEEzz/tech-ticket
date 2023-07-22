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

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home.jsx";
import Tickets from "./pages/Tickets.jsx";
import Clients from "./pages/Clients";
import Client from "./pages/Client";
import Login from "./pages/Login.jsx";
import "./index.css";
import Ticket from "./pages/Ticket";
import Profile from "./pages/Profile";
import TicketList from "./pages/admin/TicketList";
import TicketEdit from "./pages/admin/TicketEdit";
import ClientList from "./pages/admin/ClientList";
import ClientEdit from "./pages/admin/ClientEdit";
import UserEdit from "./pages/admin/UserEdit";
import UserList from "./pages/admin/UserList";
import Financials from "./pages/admin/Financials";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />

      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:id" element={<Client />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/:id" element={<Ticket />} />
      </Route>

      {/* Admin Routes */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/ticket-list" element={<TicketList />} />
        <Route path="/admin/ticket/:id/edit" element={<TicketEdit />} />
        <Route path="/admin/ticket-list/:pageNumber" element={<TicketList />} />
        <Route path="/admin/client-list" element={<ClientList />} />
        <Route path="/admin/client/:id/edit" element={<ClientEdit />} />
        <Route path="/admin/users-list" element={<UserList />} />
        <Route path="/admin/user/:id/edit" element={<UserEdit />} />
        <Route path="/admin/financials" element={<Financials />} />
      </Route>
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
