"use client";

import { useEffect, useState } from "react";
import { User } from "@clerk/nextjs/server";

export const TestGetUser = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getTest = async () => {
      const res = await fetch("/api/testGetUser");
      const body = (await res.json()) as User;
      setUser(body);
    };

    getTest();
  });

  return (
    <div>
      <p>Testing get user from API</p>
      <p>username: {user?.username}</p>
    </div>
  );
};
