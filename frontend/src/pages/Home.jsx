import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className="card-title mb-10">Tech Ticket Support Desk</h1>
      <div className="mb-10">
        <div className="stat-title">logged in as</div>
        <span className="text-primary font-bold">
          {userInfo.name}{" "}
          {userInfo.isAdmin ? (
            <div className="badge badge-lg">Admin</div>
          ) : (
            <div className="badge badge-lg">Tech</div>
          )}
        </span>
      </div>

      <div className="grid grid-cols-1 w-fit gap-5">
        {userInfo.isAdmin && (
          <div className="card-body bg-base-200 card">
            <h3>Admin Panel</h3>
            <div className="flex gap-5">
              <Link className="btn btn-primary mb-2" to="/admin/financials">
                Financials
              </Link>
              <Link className="btn btn-primary mb-2" to="/admin/users-list">
                Users List
              </Link>
              <Link className="btn btn-primary mb-2" to="/admin/ticket-list">
                Tickets List
              </Link>
              <Link className="btn btn-primary mb-2" to="/admin/client-list">
                Clients List
              </Link>
            </div>
          </div>
        )}
        <div className="card-body bg-base-200 card">
          <h3>Tech Panel</h3>
          <div className="flex gap-5">
            <Link className="btn btn-secondary mb-2" to="/clients">
              View Clients
            </Link>
            <Link className="btn btn-secondary mb-2" to="/tickets">
              View Tickets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
