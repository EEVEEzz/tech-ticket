import React from "react";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Theme from "./Theme";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <div
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {userInfo?.isAdmin && (
              <h3 className="mt-3">
                Admin Panel
              </h3>
            )}

            {userInfo?.isAdmin && (
              <>
                <Link
                  className="btn btn-primary btn-outline btn-sm mb-2"
                  to="/admin/users-list"
                >
                  Users List
                </Link>
                <Link
                  className="btn btn-primary btn-outline btn-sm mb-2"
                  to="/admin/client-list"
                >
                  Client List
                </Link>
                <Link
                  className="btn btn-primary btn-outline btn-sm mb-2"
                  to="/admin/ticket-list"
                >
                  Ticket List
                </Link>
                <Link
                  className="btn btn-primary btn-outline btn-sm mb-2"
                  to="/admin/financials"
                >
                  Financials
                </Link>
              </>
            )}
            <Link className="btn btn-secondary mb-2" to={`/clients`}>
              Clients
            </Link>
            <Link className="btn btn-secondary mb-2" to={`/tickets`}>
              Tickets
            </Link>

            <Link to={`/profile`} className="btn btn-secondary mb-2">
              Profile
            </Link>
            <button className="btn btn-secondary" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          Tickit
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <Theme />
        </button>
      </div>
    </div>
  );
};

export default Header;
