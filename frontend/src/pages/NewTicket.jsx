import React, { useState } from "react";
import { useCreateTicketMutation } from "../slices/ticketSlice";
import { useGetClientQuery } from "../slices/clientApiSlice";
import FormContainer from "../components/FormContainer";
import Spinner from "../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewTicket = () => {
  const { id: clientId } = useParams();

  const {
    data: client,
    isLoading,
    error,
    refetch,
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

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <Message error={error?.message || error?.data.message} />
  ) : (
    <FormContainer>
      <h1 className="card-title mb-10">Create a new Ticket</h1>

      <form onSubmit={submitHandler} className="form-control">
        <div className="flex gap-10">
          <div>
            <div>
              <input
                disabled
                className="input input-secondary mb-3"
                id="clientName"
                value={client.clientName}
                onChange={() => {}}
                placeholder="Client Name"
                type="text"
              />
            </div>
            <div>
              <input
                className="input input-secondary mb-3"
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
                className="input input-secondary mb-3"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Item Name"
                type="text"
              />
            </div>
            <div>
              <input
                className="input input-secondary mb-3"
                type="text"
                id="model"
                onChange={(e) => setModel(e.target.value)}
                placeholder="Item Model"
                value={model}
              />
            </div>
            <div>
              <input
                className="input input-secondary mb-3"
                type="text"
                id="serial"
                onChange={(e) => setSerial(e.target.value)}
                placeholder="Item Serial Number"
                value={serial}
              />
            </div>
            <div>
              <textarea
                className="input input-secondary mb-3 p-5"
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
                className="select select-secondary mb-3"
                id="itemName"
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
                  className="input input-secondary mb-3"
                  type="number"
                  id="model"
                  onChange={(e) => setTotalPrice(e.target.value)}
                  placeholder="Total Cost"
                  value={Number(totalPrice).toFixed(0)}
                />
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="btn w-fit">
          Sumbit New Ticket
        </button>
      </form>
    </FormContainer>
  );
};

export default NewTicket;
