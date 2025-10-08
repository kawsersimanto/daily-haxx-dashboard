import { baseApi } from "@/redux/api/baseApi";
import { User } from "./user.interface";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/user",
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/user/${id}`,
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({ url: "/user", method: "POST", body }),
    }),
    updateUser: builder.mutation<User, Partial<User> & { id: string }>(
      { query: ({ id, ...body }) => ({ url: `/user/${id}`, method: "PUT", body }) }
    ),
    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/user/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
