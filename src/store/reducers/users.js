import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
export const apiUsers = createApi({
    reducerPath: 'users',
    tagTypes: ['users'],
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8080/"}),
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => `users`,
            providesTags: ['users']
        }),
        addUser: build.mutation({
            query: (body) => ({
                url: "users",
                method: 'POST',
                body: body
            }),
            invalidatesTags:['users']
        }),
        checkUser: build.mutation({
            query: (body) => ({
                url: "login",
                method: 'POST',
                body: body
            }),
            invalidatesTags:['users']
        })
    })

})
export const {useGetUsersQuery,useAddUserMutation,useCheckUserMutation} = apiUsers
