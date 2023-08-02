import userServices from "@/app/services/userServices";
import { feedT } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatterApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "api" }),
  tagTypes: ["POST", "USERS"],
  endpoints: (builder) => ({
    /* blog apis */
    getBlogList: builder.query({
      query: () => "/blogs",
    }),
    getBlog: builder.query({
      query: (id: string) => `/blogs?id=${id}`,
      transformResponse: (response: { blog: feedT }) => response.blog,
    }),
    postBlog: builder.mutation({
      query: (blog: any) => ({
        url: "/blogs",
        method: "POST",
        body: blog,
      }),
    }),
    updateBlog: builder.mutation({
      query: (blog: any) => ({
        url: "/blogs",
        method: "POST",
        body: { ...blog, method: "PUT" },
      }),
    }),

    /* user api */
    getUser: builder.query({
      query: (id: string) => `/users?id=${id}`,
      transformResponse: (response: { user: any }) => response.user,
      providesTags: (res) => [{ type: "USERS", id: res._id }],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }: { _id: string }) => ({
                type: "POSTS",
                id: _id,
              })),
              { type: "POSTS", id: "LIST" },
            ]
          : [{ type: "USERS", id: "LIST" }],
    }),
    getUserBlogByInterest: builder.query({
      query: (user_id: string) => ({
        url: "/blogs/for/" + user_id,
        method: "GET",
      }),
    }),
    getUserBlogByFollowing: builder.query({
      query: (user_id: string) => ({
        url: "/blogs/following/" + user_id,
        method: "GET",
      }),
    }),
    getRecentBlogs: builder.query({
      query: () => ({
        url: "/blogs/recent",
      }),
    }), 
    loginUser: builder.mutation({
      query: (user: any) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    updateUserInterest: builder.mutation({
      query: ({ _id, interest }: { _id: string; interest: string[] }) => ({
        url: "users/interest",
        method: "POST",
        body: {
          _id,
          interest,
        },
      }),
      invalidatesTags: (_: any, _2: any, { _id }: { _id: string }) => [
        { type: "USERS", id: _id },
      ],
    }),
    registerUser: builder.mutation({
      query: (user: any) => ({
        url: "/users/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["USERS"],
    }),
    updateUser: builder.mutation({
      query: (user: any) => ({
        url: "/users",
        method: "POST",
        body: { ...user, method: "PUT" },
      }),
      invalidatesTags: (_: any, _2: any, { _id }: any) => [
        { type: "USERS", id: _id },
      ],
    }),
  }),
});


export const {
  useGetBlogListQuery,
  useGetBlogQuery,
  usePostBlogMutation,
  useGetUserQuery,
  useGetRecentBlogsQuery,
  useGetUsersQuery,
  useGetUserBlogByFollowingQuery,
  useLoginUserMutation,
  useGetUserBlogByInterestQuery,
  useRegisterUserMutation,
  useUpdateUserInterestMutation,
  useUpdateUserMutation,
} = chatterApi;

export {chatterApi};

