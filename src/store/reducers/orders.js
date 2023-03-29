import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath: 'order',
    tagTypes: ['order'],
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8080/"}),
    endpoints:(build) => ({
        addOrder: build.mutation({
            query: (body) => ({
                url: 'orders',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['order']
        }),
        getOrder: build.query({
            query:(arg) => 'orders',
            providesTags: ['order']
        })
    })
})
export const
    {
        useAddOrderMutation,
        useGetOrderQuery
    } = orderApi