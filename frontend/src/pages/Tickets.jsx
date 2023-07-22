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
    <Message error={error?.data?.message || error?.message} />
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
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <TicketCard i={i} key={item._id} ticket={item} />
          ))}
        </tbody>
      </table>
      <div className="grid grid-cols-3 gap-3"></div>
    </>
  );
};

export default Tickets;
