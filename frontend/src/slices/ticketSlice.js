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
      query: ( ticketId ) => ({
        url: `${TICKETS_URL}/${ticketId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetTicketsQuery,
  useGetTicketByIdQuery,
} = usersApiSlice;
