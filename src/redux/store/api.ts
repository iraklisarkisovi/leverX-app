import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDataUsers, IUser } from "../../types/types";

export interface User {
  _id: string;
  email: string;
}
const role = "employee";

export interface SignUpResponse {
  userWithoutPass: {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  };
}

const apiurl = process.env.API_URL;

export const RTKapi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiurl}/api`,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IDataUsers, void>({
      query: () => "/users",
    }),

    signIn: builder.mutation<
      { id: string; role: string },
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: "/sign-in",
        method: "POST",
        body: { email, password },
      }),
    }),

    signup: builder.mutation<
      SignUpResponse,
      { first_name: string; last_name: string; email: string; password: string }
    >({
      query: ({ email, first_name, last_name, password }) => ({
        url: "/sign-up",
        method: "POST",
        body: { email, first_name, last_name, password, role },
      }),
    }),

    updateUserdata: builder.mutation<
      {},
      { updatedUser: Partial<IUser>; userId: string }
    >({
      query: ({ updatedUser, userId }) => ({
        url: `/editusers/${userId}`,
        method: "PUT",
        body: updatedUser,
      }),
    }),

    updateuserstatus: builder.mutation<{}, { newrole: string; userId: string }>(
      {
        query: ({ newrole, userId }) => ({
          url: `/users/${userId}`,
          method: "PUT",
          body: { newrole },
        }),
      }
    ),
  }),
});

export const { useGetUsersQuery, useSignInMutation, useSignupMutation, useUpdateUserdataMutation, useUpdateuserstatusMutation } = RTKapi;
