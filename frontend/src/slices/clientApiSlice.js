import { CLIENTS_URL } from "../baseUrls";
import { apiSlice } from "./apiSlice";

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createClient: builder.mutation({
      query: (data) => ({
        url: `${CLIENTS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getClients: builder.query({
      query: () => ({
        url: `${CLIENTS_URL}`,
        method: "GET",
      }),
    }),
    getClient: builder.query({
      query: (clientId) => ({
        url: `${CLIENTS_URL}/${clientId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetClientsQuery,
  useGetClientQuery,
} = clientApiSlice;
