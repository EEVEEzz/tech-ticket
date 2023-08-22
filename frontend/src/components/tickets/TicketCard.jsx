import React from "react";
import { Link } from "react-router-dom";
import Message from "../Message";
import { FaTimes, FaCheck } from "react-icons/fa";

const TicketCard = ({ ticket, i }) => {
  function shortenString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substr(0, maxLength) + "...";
    }
  }

  return (
    <tr className="">
      <th>{i + 1}</th>
      <td>{ticket.itemName}</td>
      <td>{shortenString(ticket.fault, 24)}</td>
      <td>{new Date(ticket.createdAt).toDateString()}</td>
      <td>{ticket.clientName}</td>
      <td>{ticket.clientNumber}</td>
      <td>
        {ticket.isOpen && ticket.inProgress ? (
          <>
            <div className="text-accent">in progress</div>
          </>
        ) : !ticket.inProgress && ticket.isOpen ? (
          <>
            <div className="text-success">new/open</div>
          </>
        ) : ticket.isClosed ? (
          <>
            <div className="text-warning">closed</div>
          </>
        ) : (
          <>
            <div></div>
          </>
        )}
      </td>
      <td>
        {ticket.paymentMethod !== "No Payment" ? (
          <>
            {ticket.isPaid ? (
              <div className="text-success">
                {" "}
                Paid on {new Date(ticket.paidAt).toLocaleDateString()}
              </div>
            ) : (
              <div className="text-error">
                <FaTimes />
              </div>
            )}
          </>
        ) : (
          <div className="text-error">No Payment</div>
        )}
      </td>
      <td>
        {ticket.paymentMethod !== "No Payment" ? (
          <div className="font-bold">R{ticket.totalPrice}</div>
        ) : (
          <div className="text-error">N/A</div>
        )}
      </td>
      <td>
        {ticket.isCompleted ? (
          <div className="text-success">
            <FaCheck />
          </div>
        ) : (
          <div className="text-error">
            <FaTimes />
          </div>
        )}
      </td>
      <td>
        {ticket.isCollected ? (
          <div className="text-success">
            <FaCheck />
          </div>
        ) : (
          <div className="text-error">
            <FaTimes />
          </div>
        )}
      </td>
      <td>
        <Link
          to={`/tickets/${ticket._id}`}
          className="btn btn-xs btn-secondary"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default TicketCard;
