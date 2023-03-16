import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
export const productsSlice = createApi({
    reducerPath: 'products',
    tagTypes: ['products'],
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8080/"}),
    endpoints: (build) => ({
        getProducts: build.query({
            query: (limit = '') => `products?${limit && `_limit=${limit}`}`,
            providesTags: ['products']
        }),
        getProductsByCategory: build.query({
            query: ({categoryData = '',limit}) => `products?${limit && `_limit=${limit}`}&${categoryData && `category=${categoryData}`}`,
            providesTags: ['products']
        }),
        getProductsBySearch: build.query({
            query: (search = '') => `products?titleRu_like=${search}`,
            providesTags: ['products']
        }),
        getProductsBySubdivision: build.query({
            query : ({category,limit,sort}) => `products?${limit && `_limit=${limit}`}&${category && `subdivisionEn=${category}`}&${sort === 'alpAsc' ? `_sort=titleRu&_order=asc` : sort === 'alpDesc' ? `_sort=titleRu&_order=desc` : sort === 'asc' ? `_sort=price&_order=asc` : sort === 'desc' ? `_sort=price&_order=desc` : ''}`,
            providesTags: ['products']
        }),
        getProductById: build.query({
            query: (id) => `products?${id && `id=${id}`}`

        }),
        changeFavorite: build.mutation({
            query:({favorite, id}) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body: {
                        favorite: !favorite
                }
            }),
            invalidatesTags: ['products']
        }),
        changeCart: build.mutation({
            query:({id,cart}) => ({
                method: 'PATCH',
                url: `products/${id}`,
                body: {cart: !cart,count: 1}
            }),
            invalidatesTags: ['products']
        }),
        deleteCart: build.mutation({
            query:({id,cart}) => ({
                method: 'PATCH',
                url: `products/${id}`,
                body: {cart: false}
            }),
            invalidatesTags: ['products']
        }),
        addNumber: build.mutation({
            query:({id,count}) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body: {count: count + 1}
            }),
            invalidatesTags: ['products']
        }),
        subtractNumber: build.mutation({
            query:({id,count}) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body: {count: count === 1 ? count : count - 1}
            }),
            invalidatesTags: ['products']
        }),
        addReview: build.mutation({
            query: ({reviews,id}) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body:{
                    reviews
                }
            }),
            invalidatesTags: ['products']
        }),
        changeComparison: build.mutation({
            query: ({id,body}) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body : {comparison: !body}
            }),
            invalidatesTags: ['products']
        }),
        deleteComparison: build.mutation({
            query : ({id}) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body : {comparison: false}
            }),
            invalidatesTags: ['products']
        })
    })
})


export const {
    useGetProductsQuery,
    useGetProductsByCategoryQuery,
    useGetProductsBySearchQuery,
    useGetProductsBySubdivisionQuery,
    useGetProductByIdQuery,
    useAddReviewMutation,
    useChangeFavoriteMutation,
    useChangeCartMutation,
    useDeleteCartMutation,
    useAddNumberMutation,
    useSubtractNumberMutation,
    useChangeComparisonMutation,
    useDeleteComparisonMutation,
} = productsSlice
