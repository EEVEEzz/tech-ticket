import React from "react";
import { useGetClientQuery } from "../slices/clientApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import TicketCard from "../components/tickets/TicketCard";
import { useGetTicketsQuery } from "../slices/ticketSlice";

const Client = () => {
  const { id: clientId } = useParams();
  const { data, isLoading, error } = useGetClientQuery(clientId);
  const {
    data: tickets,
    isLoading: ticketsLoading,
    error: ticketsError,
  } = useGetTicketsQuery();

  console.log(tickets);

  return isLoading || ticketsLoading ? (
    <Spinner />
  ) : error || ticketsError ? (
    <Message error={error?.message || error?.data.message} />
  ) : (
    <div className="">
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div>
          <div className="stat-title">Client Name:</div>
          <h2 className="text-4xl font-bold"> {data.clientName}</h2>
        </div>

        <div>
          <div className="stat-title">Client Number:</div>
          <h2 className="text-4xl font-bold">{data.clientNumber}</h2>
        </div>

        <div>
          <div className="stat-title">Client Email:</div>
          <h2 className="text-4xl font-bold"> {data.clientEmail}</h2>
        </div>
      </div>

      <Link to={`/clients/${data._id}/new-ticket`} className="btn mb-5">
        Create a New Ticket
      </Link>

      <div>
        {data?.tickets?.length > 0 && (
          <>
            <h3>Tickets</h3>
            <div className="grid grid-cols-2 gap-3">
              {tickets
                .filter((ticket) => ticket.clientId === data._id)
                .map((item) => (
                  <TicketCard ticket={item} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Client;
