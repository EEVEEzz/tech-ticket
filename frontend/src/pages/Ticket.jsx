import React from "react";
import { useGetTicketByIdQuery } from "../slices/ticketSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { Link, useNavigate, useParams } from "react-router-dom";

const Ticket = () => {
  const { id: ticketId } = useParams();

    console.log(ticketId)

  const { data, isLoading, error } = useGetTicketByIdQuery(ticketId);

    console.log(data)

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Message error={error?.message || error?.data.message} />
      ) : (
        <></>
      )}
      <div className="card outline outline-1 p-3">
        {/* <div>
          <div>User ID: {ticket.user}</div>
          <div>Created: {new Date(ticket.createdAt).toDateString()}</div>
          <div>
            Status:{" "}
            {ticket.inProgress ? (
              <div className="badge badge-success">In Progress</div>
            ) : ticket.isCosed ? (
              <div className="badge badge-error">Closed</div>
            ) : (
              <div className="badge badge-success">Open</div>
            )}
          </div>
          {ticket.paymentMethod && (
            <div>
              <div>Payment Method: {ticket.paymentMethod}</div>{" "}
              <div>
                Paid:{" "}
                {!ticket.isPaid ? (
                  <span className="badge badge-error">Unpaid</span>
                ) : (
                  <span className="badge badge-success">Paid</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="card-body">
          <table className="table indicator table-lg">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Brand</th>
                <th scope="col">Model</th>
                <th scope="col">Serial</th>
                <th scope="col">Fault</th>
              </tr>
            </thead>
            <tbody>
              {ticket.techItems.map((item, i) => (
                <tr key={item._id}>
                  <th scope="row">{i + 1}</th>
                  <th scope="col">{item.name}</th>
                  <th scope="col">{item.brand}</th>
                  <th scope="col">{item.model}</th>
                  <th scope="col">{item.serial}</th>
                  <th scope="col">{item.fault}</th>
                </tr>
              ))}
            </tbody>
            <div className="indicator-item badge badge-primary badge-lg">
              {ticket.notes.length > 1 ? (
                <>{ticket.notes.length} notes</>
              ) : (
                <>{ticket.notes.length} note</>
              )}{" "}
            </div>
          </table>
        </div>

        <div>
          {ticket.paymentMethod && (
            <div>
              <div>Payment</div>
              <div>Email: {ticket.paymentResult.email_address}</div>
              <div>Number: {ticket.paymentResult.number}</div>
              <div>Paid on: {ticket.paidAt}</div>
              <div>Total Cost: {ticket.totalPrice}</div>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Ticket;
