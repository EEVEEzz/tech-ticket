import React, { useEffect } from "react";
import TicketCard from "../components/tickets/TicketCard";
import Spinner from "../components/Spinner";
import { useGetTicketsQuery } from "../slices/ticketSlice";
import Message from "../components/Message";

const Tickets = () => {
  const { data, isLoading, error, refetch } = useGetTicketsQuery();

  console.log(data);

  useEffect(() => {
    refetch();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <Message error={error?.data.message || error?.message} />
  ) : (
    <div className="grid grid-cols-3 gap-3">
      {data.map((item) => (
        <TicketCard ticket={item} />
      ))}
    </div>
  );
};

export default Tickets;
