import React, { useEffect } from "react";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import { FaTimes, FaTrash, FaCheck } from "react-icons/fa";
import { useGetTicketsQuery } from "../../slices/ticketSlice";
import { Link } from "react-router-dom";

const TicketList = () => {
  const { data: tickets, isLoading, error,refetch } = useGetTicketsQuery();

  console.log(tickets);

  
  function shortenString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.substr(0, maxLength) + "...";
    }
  }

  useEffect(() => {
    refetch();
  }, [tickets]);

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <Message error={error?.tickets.message || error?.message} />
  ) : (
    <>
      <h1 className="card-title mb-10">Tickets</h1>
      <table className="table bg-base-200 table-xs lg:table-xs  md:table-xs">
        <thead>
          <tr>
            <th></th>
            <th>ItemName</th>
            <th>Fault</th>
            <th>Created</th>
            <th>Client</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Paid</th>
            <th>Price</th>
            <th>Completed</th>
            <th>Collected</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((item, i) => (
            <tr key={item._id} className="">
              <th>{i + 1}</th>
              <td>{item.itemName}</td>
              <td>{shortenString(item.fault, 24)}</td>
              <td>{new Date(item.createdAt).toDateString()}</td>
              <td>{item.clientName}</td>
              <td>{item.clientNumber}</td>
              <td>
                {item.isOpen && item.inProgress ? (
                  <>
                    <div className="text-accent">in progress</div>
                  </>
                ) : !item.inProgress && item.isOpen ? (
                  <>
                    <div className="text-success">new/open</div>
                  </>
                ) : item.isClosed ? (
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
                {item.paymentMethod !== "No Payment" ? (
                  <>
                    {item.isPaid ? (
                      <div className="text-success">
                        {" "}
                        Paid on {new Date(item.paidAt).toLocaleDateString()}
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
                {item.paymentMethod !== "No Payment" ? (
                  <div className="font-bold">R{item.totalPrice}</div>
                ) : (
                  <div className="text-error">N/A</div>
                )}
              </td>
              <td>
                {item.isCompleted ? (
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
                {item.isCollected ? (
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
                  to={`/tickets/${item._id}`}
                  className="btn btn-xs btn-secondary"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="grid grid-cols-3 gap-3"></div>
    </>
  );
};

export default TicketList;
