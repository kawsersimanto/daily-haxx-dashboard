"use client";

import { useGetUserByIdQuery } from "../user.api";
import { IUser } from "../user.interface";
import { UserProfileCard } from "./UserProfileCard";
import { UserProfileCardSkeleton } from "./UserProfileCardSkeleton";

export const UserDetails = ({ id }: { id: string }) => {
  const { data, isLoading: loadingUser } = useGetUserByIdQuery(id);
  const user = data?.data as IUser;

  return (
    <>
      {loadingUser ? (
        <UserProfileCardSkeleton />
      ) : (
        <UserProfileCard user={user} />
      )}
    </>
  );
};
