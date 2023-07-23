import React, { useEffect, useState } from "react";
import { useGetClientQuery } from "../slices/clientApiSlice";
import {
  useGetTicketsQuery,
  useCreateTicketMutation,
} from "../slices/ticketSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import TicketCard from "../components/tickets/TicketCard";
import Meta from "../components/Meta";

const Client = () => {
  const { id: clientId } = useParams();
  const { data, isLoading, error, refetch } = useGetClientQuery(clientId);
  const {
    data: tickets,
    isLoading: ticketsLoading,
    error: ticketsError,
  } = useGetTicketsQuery();

  const {
    data: client,
    isLoading: createLoading,
    error: createError,
    refetch: refetchClient,
  } = useGetClientQuery(clientId);
  const [createTicket] = useCreateTicketMutation();

  const [paymentMethod, setPaymentMethod] = useState("No Payment");
  const [totalPrice, setTotalPrice] = useState("");
  const [itemName, setItemName] = useState("");
  const [serial, setSerial] = useState("");
  const [model, setModel] = useState("");
  const [fault, setFault] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (itemName === "" || model === "" || serial === "" || fault === "") {
      toast.error("Please fill in all fields");
    } else {
      try {
        const res = await createTicket({
          clientId,
          clientName: client.clientName,
          clientNumber: client.clientNumber,
          paymentMethod,
          totalPrice,
          itemName,
          serial,
          model,
          fault,
        }).unwrap();
        console.log(res);
        navigate(`/tickets/${res._id}`);
        refetch();
        toast.success("Ticket Created");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    refetch();
    refetchClient();
  }, []);

  return isLoading || ticketsLoading || createLoading ? (
    <Spinner />
  ) : error || ticketsError || createError ? (
    <Message error={error?.message || error?.data.message} />
  ) : (
    <div className="">
      <Meta title={`Client: ${client?.clientName}`} />
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div>
          <div className="stat-title">Client Name:</div>
          <h2 className="stat-value text-2xl md:text-3xl lg:text-4xl font-bold"> {data.clientName}</h2>
        </div>

        <div>
          <div className="stat-title">Client Number:</div>
          <h2 className="stat-value text-xl md:text-2xl lg:text-3xl font-bold">+27{data.clientNumber}</h2>
        </div>

        <div>
          <div className="stat-title">Client Email:</div>
          <h2 className="stat-value text-2xl md:text-3xl lg:text-4xl font-bold"> {data.clientEmail}</h2>
        </div>
      </div>

      <FormContainer>
        {/* Open the modal using ID.showModal() method */}
        <button
          className="btn btn-secondary mb-5 mt-5 ml-5"
          onClick={() => window.my_modal_2.showModal()}
        >
          Create a new Ticket
        </button>
        <dialog id="my_modal_2" className="modal">
          <form
            method="dialog"
            className="bg-base-100 card card-body"
            onSubmit={submitHandler}
          >
            <h1 className="flex justify-center mb-5 stat-value text-primary underline">
              New Ticket
            </h1>
            <div className="flex gap-10">
              <div>
                <div>
                  <input
                    disabled
                    className="input input-primary mb-3"
                    id="clientName"
                    value={client.clientName}
                    onChange={() => {}}
                    placeholder="Client Name"
                    type="text"
                  />
                </div>
                <div>
                  <input
                    className="input input-primary mb-3"
                    type="text"
                    id="clientNumber"
                    onChange={(e) => setClientNumber(e.target.value)}
                    placeholder="Client Number"
                    value={client.clientNumber}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div>Item Information</div>
                  <input
                    className="input input-primary mb-3"
                    id="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Item Name"
                    type="text"
                  />
                </div>
                <div>
                  <input
                    className="input input-primary mb-3"
                    type="text"
                    id="model"
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Item Model"
                    value={model}
                  />
                </div>
                <div>
                  <input
                    className="input input-primary mb-3"
                    type="text"
                    id="serial"
                    onChange={(e) => setSerial(e.target.value)}
                    placeholder="Item Serial Number"
                    value={serial}
                  />
                </div>
                <div>
                  <textarea
                    className="input input-primary mb-3 p-5"
                    type="text"
                    id="fault"
                    onChange={(e) => setFault(e.target.value)}
                    placeholder="Fault Description"
                    value={fault}
                    style={{ width: "700px", height: "300px" }}
                  ></textarea>
                </div>
              </div>
              <div>
                <div>
                  <div>Financial Information</div>
                  <select
                    className="select select-primary mb-3"
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    placeholder="Item Name"
                    type="text"
                  >
                    <option value="No Payment">No Payment</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Credit/Debit</option>
                    <option value="EFT">EFT</option>
                  </select>
                </div>

                {paymentMethod !== "No Payment" && (
                  <div>
                    <input
                      className="input input-primary mb-3"
                      type="number"
                      id="totalPrice"
                      onChange={(e) => setTotalPrice(e.target.value)}
                      placeholder="Total Cost"
                      value={Number(totalPrice).toFixed(0)}
                    />
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-fit">
              Sumbit New Ticket
            </button>
          </form>
        </dialog>
      </FormContainer>

      <div>
        <div className="overflow-x-auto">
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
              {data?.tickets?.length > 0 && (
                <>
                  {tickets
                    .filter((ticket) => ticket.clientId === data._id)
                    .map((item, i) => (
                      <TicketCard i={i} key={item._id} ticket={item} />
                    ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Client;
