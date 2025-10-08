import { useGetUsersQuery } from "@/features/user/user.api";

export const useUser = () => {
  const { data, isLoading, error } = useGetUsersQuery();
  return { data, isLoading, error };
};
