import { IUser } from "@/features/user/user.interface";
import { baseApi } from "@/redux/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "/user",
    }),
    getUserById: builder.query<IUser, string>({
      query: (id) => `/user/${id}`,
    }),
    createUser: builder.mutation<IUser, Partial<IUser>>({
      query: (body) => ({ url: "/user", method: "POST", body }),
    }),
    updateUser: builder.mutation<IUser, Partial<IUser> & { id: string }>({
      query: ({ id, ...body }) => ({ url: `/user/${id}`, method: "PUT", body }),
    }),
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
