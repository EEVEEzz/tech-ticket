import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div >
      <Meta title={`Home`} />
      <h1 className="card-title justify-center mb-10">Tech Ticket Support Desk</h1>
      <div className="mb-10 ml-5">
        <div className="stat-title justify-center text-xs">logged in as</div>
        <span className="text-primary font-bold">{userInfo.name} </span>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {userInfo.isAdmin && (
          <div className="card-body mx-auto bg-base-200 card">
            <h3>Admin Panel</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
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
        <div className="card-body  mx-auto bg-base-200 card">
          <h3>Tech Panel</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
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
