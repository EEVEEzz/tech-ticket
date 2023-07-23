import React, { useEffect } from "react";
import { useGetClientsQuery } from "../../slices/clientApiSlice";
import { useGetTicketsQuery } from "../../slices/ticketSlice";
import Spinner from "../../components/Spinner";
import Message from "../../components/Message";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Financials = () => {
  const {
    data: clients,
    isLoading: clientsLoading,
    error: clientsError,
  } = useGetClientsQuery();
  const {
    data: tickets,
    isLoading: ticketsLoading,
    error: ticketsError,
    refetch,
  } = useGetTicketsQuery();

  const currentDay = new Date(); // Get the current date
  const currentDayTickets = tickets?.filter((ticket) => {
    const createdAtDate = new Date(ticket.createdAt); // Convert createdAt to a Date object
    return createdAtDate.toDateString() === currentDay.toDateString();
  });

  // Filter past days tickets
  const pastDaysTickets = tickets?.filter((ticket) => {
    const createdAtDate = new Date(ticket.createdAt); // Convert createdAt to a Date object
    return createdAtDate < currentDay;
  });

  const calculateTotalReplacementPrice = (ticket) => {
    return ticket.replacements.reduce(
      (acc, replacement) => acc + replacement.replacementPrice,
      0
    );
  };

  // Calculate the total price of replacements for each ticket
  const currentDayTicketsWithTotalReplacementPrice = currentDayTickets?.map(
    (ticket) => ({
      ...ticket,
      totalReplacementPrice: calculateTotalReplacementPrice(ticket),
    })
  );

  const pastDaysTicketsWithTotalReplacementPrice = pastDaysTickets?.map(
    (ticket) => ({
      ...ticket,
      totalReplacementPrice: calculateTotalReplacementPrice(ticket),
    })
  );

  useEffect(() => {
    refetch();
  }, [tickets]);

  return clientsLoading || ticketsLoading ? (
    <>
      <Spinner />
    </>
  ) : clientsError || ticketsError ? (
    <>Error</>
  ) : (
    <>
      {/* Current Day Tickets Table */}
      <h3 className="stat-title">
        Today's Tickets ({new Date().toLocaleDateString()})
      </h3>
      <table className="table bg-base-200 table-xs lg:table-xs  md:table-xs">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Created</th>
            <th>Pay Method</th>
            <th>Labour</th>
            <th>Replacements</th>
            <th>Paid</th>
            <th>Paid on</th>
            <th>Status</th>
            <th>Completed</th>
            <th>Collected</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentDayTicketsWithTotalReplacementPrice.map((item) => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{item.paymentMethod}</td>
              <td>
                {Number(item.totalPrice) - Number(item.totalReplacementPrice)}
              </td>
              <td>{item.totalReplacementPrice}</td>
              <td>
                {item.isPaid ? (
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
                {item.paidAt ? (
                  <div className="text-success">
                    {new Date(item.paidAt).toLocaleDateString()}
                  </div>
                ) : (
                  <div className="text-error">
                    <FaTimes />
                  </div>
                )}
              </td>
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
                {item.completedAt ? (
                  <div className="text-success">
                    {new Date(item.completedAt).toLocaleDateString()}
                  </div>
                ) : (
                  <div className="text-error">
                    <FaTimes />
                  </div>
                )}
              </td>
              <td>
                {item.collectedAt ? (
                  <div className="text-success">
                    {new Date(item.collectedAt).toLocaleDateString()}
                  </div>
                ) : (
                  <div className="text-error">
                    <FaTimes />
                  </div>
                )}
              </td>
              <td>
                <Link
                  className="btn btn-xs btn-primary"
                  to={`/tickets/${item._id}`}
                >
                  View ticket
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="float-right mt-5 mb-10">
        <h3 className="stat-title">Total of the day</h3>
        <div>
          R
          {currentDayTicketsWithTotalReplacementPrice?.reduce(
            (acc, ticket) => acc + Number(ticket.totalPrice),
            0
          )}
        </div>
      </div>
      {/* Past Days Tickets Table */}
      <div className="float-left w-full">
        <h3 className="stat-title">Past Tickets</h3>
        <table className="table bg-base-200 table-xs lg:table-xs  md:table-xs ">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Created</th>
              <th>Pay Method</th>
              <th>Labour</th>
              <th>Replacements</th>
              <th>Paid</th>
              <th>Paid on</th>
              <th>Status</th>
              <th>Completed</th>
              <th>Collected</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pastDaysTicketsWithTotalReplacementPrice.map((item) => (
              <tr  key={item._id}>
                <td>{item.itemName}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>{item.paymentMethod}</td>
                <td>
                  {Number(item.totalPrice) - Number(item.totalReplacementPrice)}
                </td>
                <td>{item.totalReplacementPrice}</td>
                <td>
                  {item.isPaid ? (
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
                  {item.paidAt ? (
                    <div className="text-success">
                      {new Date(item.paidAt).toLocaleDateString()}
                    </div>
                  ) : (
                    <div className="text-error">
                      <FaTimes />
                    </div>
                  )}
                </td>
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
                  {item.completedAt ? (
                    <div className="text-success">
                      {new Date(item.completedAt).toLocaleDateString()}
                    </div>
                  ) : (
                    <div className="text-error">
                      <FaTimes />
                    </div>
                  )}
                </td>
                <td>
                  {item.collectedAt ? (
                    <div className="text-success">
                      {new Date(item.collectedAt).toLocaleDateString()}
                    </div>
                  ) : (
                    <div className="text-error">
                      <FaTimes />
                    </div>
                  )}
                </td>
                <td>
                  <Link
                    className="btn btn-xs btn-primary"
                    to={`/tickets/${item._id}`}
                  >
                    View ticket
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="float-right mt-5 mb-10">
        <h3 className="stat-title">Total of all tickets</h3>
        <div>
          R
          {pastDaysTicketsWithTotalReplacementPrice?.reduce(
            (acc, ticket) => acc + Number(ticket.totalPrice),
            0
          )}
        </div>
      </div>
    </>
  );
};

export default Financials;
