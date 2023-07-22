import { TICKETS_URL } from "../baseUrls";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (data) => ({
        url: `${TICKETS_URL}`,
        method: "POST",
        body: { ...data },
      }),
    }),
    getTickets: builder.query({
      query: () => ({
        url: `${TICKETS_URL}`,
        method: "GET",
      }),
    }),
    getTicketById: builder.query({
      query: (ticketId) => ({
        url: `${TICKETS_URL}/${ticketId}`,
        method: "GET",
      }),
    }),
    createNote: builder.mutation({
      query: (data) => ({
        url: `${TICKETS_URL}/${data.ticketId}/notes`,
        method: "POST",
        body: { ...data },
      }),
    }),
    updateToPaid: builder.mutation({
      query: (ticketId) => ({
        url: `${TICKETS_URL}/${ticketId}/pay`,
        method: "PUT",
      }),
    }),
    updateToCompleted: builder.mutation({
      query: (ticketId) => ({
        url: `${TICKETS_URL}/${ticketId}/complete`,
        method: "PUT",
      }),
    }),
    updateToCollected: builder.mutation({
      query: (ticketId) => ({
        url: `${TICKETS_URL}/${ticketId}/collect`,
        method: "PUT",
      }),
    }),
    addReplacementToTicket: builder.mutation({
      query: (data) => ({
        url: `${TICKETS_URL}/${data.ticketId}/replacement`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useCreateNoteMutation,
  useUpdateToPaidMutation,
  useUpdateToCollectedMutation,
  useUpdateToCompletedMutation,
  useAddReplacementToTicketMutation,
} = usersApiSlice;
