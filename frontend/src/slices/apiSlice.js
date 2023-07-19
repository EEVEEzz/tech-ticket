import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from '../baseUrls.js'

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: [
        "Ticket",
        "User",
        "Client"
    ],
    endpoints: (builder) => ({})
})