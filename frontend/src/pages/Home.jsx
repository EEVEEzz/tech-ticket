import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      Hi {userInfo.name} {userInfo.isAdmin ? "admin" : "user"}
      <div>
        <div>
          <Link className="btn mb-2" to="/clients">Clients</Link>
        </div>
        <div>
          <Link className="btn mb-2" to="/tickets">Tickets</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
