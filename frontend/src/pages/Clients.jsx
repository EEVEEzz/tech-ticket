import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetClientsQuery } from "../slices/clientApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const Clients = () => {
  const { data, isLoading, error, refetch } = useGetClientsQuery();
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <Link className="btn" to={"/new-client"}>
        New CLient
      </Link>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message error={error?.data.error || error?.message} />
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {data.map((item) => (
            <>
              <div className="card bg-base-200 mb-3 mt-3">
                <div className="card-body">
                  <div className="">
                    <h3>Name: {item.clientName}</h3>
                    <h3>Number: {item.clientNumber}</h3>
                    <h3>Email: {item.clientEmail}</h3>
                  </div>
                  <Link
                    to={`/clients/${item._id}`}
                    className="btn btn-sm btn-secondary w-fit"
                  >
                    View
                  </Link>
                  <div c>
                    <div className="stat-title">Tickets</div>
                    <div className="flex gap-3">
                      <div className="badge">
                        {item.tickets.length === 1 ? (
                          <> {item.tickets.length} Ticket</>
                        ) : (
                          <>{item.tickets.length} Tickets</>
                        )}{" "}
                      </div>
                      <div className="badge badge-success badge-outline">
                        {item.ticketsIsOpen} Open
                      </div>
                      <div className="badge badge-accent badge-outline">
                        {item.ticketsIsClosed} Closed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;
