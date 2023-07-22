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
    deleteClient: builder.mutation({
      query: (clientId) => ({
        url: `${CLIENTS_URL}/${clientId}`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Client"],
    }),
    getClientDetails: builder.query({
      query: (clientId) => ({
        url: `${CLIENTS_URL}/${clientId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    updateClient: builder.mutation({
      query: (data) => ({
        url: `${CLIENTS_URL}/${data.clientId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetClientsQuery,
  useGetClientQuery,
  useDeleteClientMutation,
  useGetClientDetailsQuery,
  useUpdateClientMutation
} = clientApiSlice;
