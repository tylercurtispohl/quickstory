// "use client";
import Link from "next/link";
import { getAuthenticatedUser } from "../../lib/actions";
import { getCurrentUser } from "aws-amplify/auth";
import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { useEffect, useState } from "react";

// Amplify.configure(config);

export default function Page() {
  // const { username, userId, signInDetails } = await getAuthenticatedUser();

  // const { username, userId, signInDetails } = getCurrentUser();
  // const [username, setUsername] = useState("");

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     const userInfo = await getCurrentUser();

  //     setUsername(userInfo.username);
  //   };

  //   getUserInfo();
  // });
  // useEffect(() => {
  //   const getTest = async () => {
  //     const data = await fetch("/api/test");
  //     console.log(await data.json());
  //   };

  //   getTest();
  // });
  return (
    <>
      <div>
        <h1>User details:</h1>
        {/* <p>username: {username}</p> */}
        {/* <p>userId: {userId}</p>
        <p>signInDetails: {JSON.stringify(signInDetails)}</p> */}
      </div>
      <div>
        <Link href="/comics">Go to Comic Studio</Link>
      </div>
    </>
  );
}
