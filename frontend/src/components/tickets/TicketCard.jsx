import React from "react";
import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  console.log(ticket);

  function shortenString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substr(0, maxLength) + "...";
    }
  }

  return (
    <>
      <div className="card bg-base-200 mb-3 mt-3">
        <div className="card-body">
          <div className="flex justify-between">
            <div>
              <div className="stat-title">Client Name:</div>
              <h3>{ticket.clientName}</h3>
            </div>

            <div>
              <div className="stat-title">Client Contact:</div>
              <h3>{ticket.clientNumber}</h3>
            </div>
          </div>

          <div className="mt-2">
            <div className="stat-title">Ticket Info</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="badge">{ticket.itemName}</div>
              <div className="badge">{shortenString(ticket.fault, 24)}</div>
              <div className="badge">
                {new Date(ticket.createdAt).toDateString()}
              </div>
              {ticket.isOpen ? (
                <>
                  <div className="badge badge-success badge-outline">
                    new/open
                  </div>
                </>
              ) : ticket.inProgress ? (
                <>
                  <div className="badge badge-secondary badge-outline">
                    in progress
                  </div>
                </>
              ) : ticket.isClosed ? (
                <>
                  <div className="badge badge-accent badge-outline">closed</div>
                </>
              ) : (
                <>
                  <div className="badge badge badge-outline"></div>
                </>
              )}
              <>
                {ticket.paymentMethod !== "No Payment" ? (
                  <>
                    {ticket.isPaid ? (
                      <div className="badge badge-success badge-outline"></div>
                    ) : (
                      <div className="badge badge-error badge-outline">
                        Unpaid
                      </div>
                    )}
                  </>
                ) : (
                  <div className="badge badge-secondary badge-outline">
                    No Payment
                  </div>
                )}
              </>
              {/* <div className="badge badge-success badge-outline"></div>
              <div className="badge badge-accent badge-outline"></div> */}
            </div>
          </div>
          <div className="grid grid-cols-2 mt-5">
            <Link
              to={`/tickets/${ticket._id}`}
              className="btn btn-sm btn-secondary w-fit"
            >
              View Ticket
            </Link>
            <Link
              to={`/clients/${ticket.clientId}`}
              className="btn btn-sm btn-accent w-fit"
            >
              View Client
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketCard;
