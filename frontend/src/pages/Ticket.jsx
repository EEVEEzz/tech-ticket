import React, { useState } from "react";
import {
  useCreateNoteMutation,
  useGetTicketByIdQuery,
  useUpdateToPaidMutation,
  useUpdateToCollectedMutation,
  useUpdateToCompletedMutation,
  useAddReplacementToTicketMutation,
} from "../slices/ticketSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Meta from "../components/Meta";

const Ticket = () => {
  const { id: ticketId } = useParams();
  const [comment, setComment] = useState("");
  const { data, isLoading, error, refetch } = useGetTicketByIdQuery(ticketId);

  const [replacementName, setReplacementName] = useState("");
  const [replacementModel, setReplacementModel] = useState("");
  const [replacementSerial, setReplacementSerial] = useState("");
  const [replacementPrice, setReplacementPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);

  const [createNote, { isLoading: noteLoading }] =
    useCreateNoteMutation(ticketId);

  const [updateToCollected, { isLoading: collectedLoading }] =
    useUpdateToCollectedMutation(ticketId);

  const [updateToCompleted, { isLoading: completedLoading }] =
    useUpdateToCompletedMutation(ticketId);

  const [updateToPaid, { isLoading: paidLoading }] =
    useUpdateToPaidMutation(ticketId);

  const [
    addReplacementToTicket,
    { isLoading: replacementLoading, error: replacementError },
  ] = useAddReplacementToTicketMutation(ticketId);

  if (replacementError) {
    return <Message error={error?.data?.message || error?.message} />;
  }

  const collectHandler = async (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to set ticket to Collected?")) {
      try {
        await updateToCollected(ticketId).unwrap();
        refetch();
        toast.success("Ticket Collected");
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    }
  };

  const completeHandler = async (e) => {
    if (confirm("Are you sure you want to set ticket to Completed?")) {
      try {
        await updateToCompleted(ticketId).unwrap();
        refetch();
        toast.success("Ticket Completed");
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    }
  };

  const paidHandler = async (e) => {
    if (confirm("Are you sure you want to set ticket to Paid?")) {
      try {
        await updateToPaid(ticketId).unwrap();
        refetch();
        toast.success("Ticket Paid");
      } catch (err) {
        toast.error(err?.data?.message || err?.message);
      }
    }
  };

  const submitNoteHandler = async (e) => {
    e.preventDefault();
    if (comment === "") {
      toast.error("Please add a comment");
    } else {
      await createNote({
        ticketId,
        comment,
      }).unwrap();
      setComment("");
      refetch();
      toast.success("Note added");
    }
  };

  const submitReplacementHandler = async (e) => {
    e.preventDefault();
    if (
      replacementName === "" ||
      replacementSerial === "" ||
      replacementModel === ""
    ) {
      toast.error("Please enter all fields");
    } else {
      await addReplacementToTicket({
        ticketId,
        replacementName,
        replacementSerial,
        replacementModel,
        replacementPrice,
        paymentMethod,
      }).unwrap();
      refetch();
      toast.success("replacment added");
    }
  };

  console.log(data);

  return (
    <div>
      {isLoading ||
      noteLoading ||
      collectedLoading ||
      completedLoading ||
      paidLoading ||
      replacementLoading ? (
        <Spinner />
      ) : error ? (
        <Message error={error?.message || error?.data.message} />
      ) : (
        <>
          <Meta title={`Ticket: ${data._id}`} />

          <div className="">
            <div className="mb-3 mt-3">
              <div className="ml-5 mr-5">
                <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-5 gap-5 mb-3">
                  {data.isOpen && data.inProgress ? (
                    <>
                      <div className="badge badge-accent badge-outline">
                        in progress
                      </div>
                    </>
                  ) : !data.inProgress && data.isOpen ? (
                    <>
                      <div className="badge badge-success badge-outline">
                        new/open
                      </div>
                    </>
                  ) : data.isClosed ? (
                    <>
                      <div className="badge badge-warning badge-outline">
                        closed
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="badge badge badge-outline"></div>
                    </>
                  )}
                  {data.paymentMethod !== "No Payment" ? (
                    <>
                      {data.isPaid ? (
                        <div className="badge badge-success badge-outline">
                          Paid on {new Date(data.paidAt).toLocaleDateString()}
                        </div>
                      ) : (
                        <>
                          <div className="badge badge-error badge-outline">
                            Unpaid - R{data.totalPrice}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="badge badge-error badge-outline">
                      No Payment
                    </div>
                  )}
                  {data.isCompleted && (
                    <div className="badge badge-success badge-outline">{`completed ${new Date(
                      data.completedAt
                    ).toLocaleDateString()} by ${data.completedBy}`}</div>
                  )}
                  {data.isCollected && (
                    <div className="badge badge-success badge-outline">{`collected ${new Date(
                      data.collectedAt
                    ).toLocaleDateString()}`}</div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-2 justify-between bg-base-200 p-3 rounded-lg">
                  <div>
                    <div className="stat-title">Ticket ID:</div>
                    <h3>{data._id}</h3>
                  </div>
                  <div>
                    <div className="stat-title">Client Name:</div>
                    <h3>{data.clientName}</h3>
                  </div>

                  <div>
                    <div className="stat-title">Client Contact:</div>
                    <h3>{data.clientNumber}</h3>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex flex-col lg:flex-row justify-between gap-3 ">
                    <div className="grid grid-cols-2 gap-10">
                      <div>
                        <div className="stat-title">Item Name</div>
                        <div className="stat-value text-2xl">
                          {data.itemName}
                        </div>
                      </div>
                      <div>
                        <div className="stat-title">Created</div>
                        <div className="stat-value text-2xl">
                          {new Date(data.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="stat-title">Model</div>
                        <div className="stat-value text-2xl">{data.model}</div>
                      </div>
                      <div>
                        <div className="stat-title">Serial</div>
                        <div className="stat-value text-2xl">{data.serial}</div>
                      </div>
                    </div>

                    {data.replacements.length > 0 && (
                      <div className="bg-base-200 p-3">
                        <h2 className="stat-title">Replacement Items:</h2>
                        <table className="table table-zebra table-xs md:table-xs lg:table-lg">
                          <thead>
                            <tr>
                              <th>Replacement</th>
                              <th>Model</th>
                              <th>Serial</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.replacements.map((item) => (
                              <tr key={item._id}>
                                <td>{item.replacementName}</td>
                                <td>{item.replacementModel}</td>
                                <td>{item.replacementSerial}</td>
                                <td>R{item.replacementPrice}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col-reverse lg:flex-row justify-between mt-5">
                    <div className="flex flex-col w-fit gap-1">
                      {userInfo.isAdmin &&
                        data.paymentMethod !== "No Payment" && (
                          <button
                            disabled={data.isPaid}
                            onClick={paidHandler}
                            className="btn btn-success btn-sm"
                          >
                            Mark as Paid
                          </button>
                        )}
                      <button
                        disabled={data.isCompleted}
                        onClick={completeHandler}
                        className="btn btn-success btn-sm"
                      >
                        Mark as Completed
                      </button>
                      {data.isCompleted && (
                        <>
                          <button
                            disabled={data.isCollected}
                            onClick={collectHandler}
                            className="btn btn-success btn-sm"
                          >
                            Mark as Collected
                          </button>
                        </>
                      )}
                    </div>
                    <FormContainer>
                      {/* Open the modal using ID.showModal() method */}
                      <button
                        className="btn btn-primary btn-sm mb-5 mt-5 w-fit"
                        onClick={() => window.my_modal_2.showModal()}
                      >
                        Add a replacement Item
                      </button>
                      <dialog id="my_modal_2" className="modal">
                        <form
                          method="dialog"
                          className="bg-base-100 card card-body"
                          onSubmit={submitReplacementHandler}
                        >
                          <div className="gap-10">
                            <div className="grid grid-cols-1 ">
                              <div>Replacement Item</div>
                              <input
                                className="input input-primary mb-3"
                                id="replacementName"
                                value={replacementName}
                                onChange={(e) =>
                                  setReplacementName(e.target.value)
                                }
                                placeholder="Item Name"
                                type="text"
                              />
                            </div>
                            <div>
                              <input
                                className="input input-primary mb-3"
                                type="text"
                                id="replacementModel"
                                onChange={(e) =>
                                  setReplacementModel(e.target.value)
                                }
                                placeholder="Item Model"
                                value={replacementModel}
                              />
                            </div>
                            <div>
                              <input
                                className="input input-primary mb-3"
                                type="text"
                                id="replacementSerial"
                                onChange={(e) =>
                                  setReplacementSerial(e.target.value)
                                }
                                placeholder="Item Serial Number"
                                value={replacementSerial}
                              />
                            </div>

                            <div>
                              <div>
                                <div>Financial Information</div>
                                <select
                                  className="select select-primary mb-3"
                                  id="itemName"
                                  value={paymentMethod}
                                  onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                  }
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
                                    className="input input-primary mb-3 p-5"
                                    type="text"
                                    id="replacementPrice"
                                    onChange={(e) =>
                                      setReplacementPrice(e.target.value)
                                    }
                                    placeholder="Replacement Item Cost"
                                    value={Number(replacementPrice).toFixed(0)}
                                  />
                                  <div className="flex flex-col">
                                    <label htmlFor="totalPrice">
                                      Total incl. ticket
                                    </label>
                                    <input
                                      disabled
                                      className="input input-primary mb-3 p-5"
                                      type="text"
                                      id="totalPrice"
                                      value={
                                        Number(data.totalPrice) +
                                        Number(replacementPrice)
                                      }
                                      placeholder="Replacement Item Cost"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-sm btn-primary w-fit"
                          >
                            Add Replacement
                          </button>
                        </form>
                      </dialog>
                    </FormContainer>
                  </div>

                  <div className="mt-5">
                    <div className="textarea bg-base-200">
                      <div>Fault Description:</div>
                      {data.fault}
                    </div>
                  </div>

                  <FormContainer>
                    {/* Open the modal using ID.showModal() method */}
                    <button
                      className="btn  btn-sm btn-primary mt-5"
                      onClick={() => window.my_modal_1.showModal()}
                    >
                      Add a Note
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <form
                        onSubmit={submitNoteHandler}
                        method="dialog"
                        className="modal-box"
                      >
                        <h3 className="font-bold text-sm">Comment</h3>
                        <textarea
                          name="comment"
                          id={comment}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="textarea bg-base-200 textarea-ghost w-full mt-2 mb-2 py-4"
                          placeholder="add your comment"
                        ></textarea>
                        <button
                          className="btn btn-sm btn-primary float-right"
                          type="submit"
                        >
                          Add Note
                        </button>
                      </form>
                      <form method="dialog" className="modal-backdrop"></form>
                    </dialog>
                  </FormContainer>

                  <div className="mt-5">
                    {data.notes.length > 0 &&
                      data.notes.map((item) => (
                        <div key={item._id}>
                          {userInfo.isAdmin && item.user === userInfo._id ? (
                            <>
                              <div className="textarea bg-base-200 mb-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex gap-2 items-center">
                                    <div className="badge badge-lg badge-secondary badge-outline font-bold">
                                      {item.name}
                                    </div>
                                  </div>
                                  <div>
                                    {new Date(
                                      item.createdAt
                                    ).toLocaleDateString()}{" "}
                                    {new Date(
                                      item.createdAt
                                    ).toLocaleTimeString()}
                                  </div>
                                </div>

                                <div className="mt-2">{item.comment}</div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="textarea bg-base-200 mb-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex gap-2 items-center">
                                    <div className="badge badge-lg badge-primary font-bold">
                                      {item.name}
                                    </div>
                                  </div>
                                  <div>
                                    {new Date(
                                      item.createdAt
                                    ).toLocaleDateString()}{" "}
                                    {new Date(
                                      item.createdAt
                                    ).toLocaleTimeString()}
                                  </div>
                                </div>

                                <div className="mt-2">{item.comment}</div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Ticket;
