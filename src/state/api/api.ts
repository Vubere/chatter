import { feedT } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatterApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "api" }),
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
    }),
    getUsers: builder.query({
      query: () => "/users",
    }),
    loginUser: builder.mutation({
      query: (user: any) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    postUser: builder.mutation({
      query: (user: any) => ({
        url: "/users/register",
        method: "POST",
        body: user,
      }),
    }),
    updateUser: builder.mutation({
      query: (user: any) => ({
        url: "/users",
        method: "POST",
        body: { ...user, method: "PUT" },
      }),
    }),

  }),
});


export const {
  useGetBlogListQuery,
  useGetBlogQuery,
  usePostBlogMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useLoginUserMutation,
  usePostUserMutation,
  useUpdateUserMutation,
} = chatterApi;

export {chatterApi};

