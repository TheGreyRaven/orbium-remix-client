import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useEffect } from "react";
import { SDK } from "~/appwrite";
import { checkSession } from "~/session";

export const loader: LoaderFunction = async ({ request }) => {
  await checkSession(request);

  return json({ auth: true });
};

const Dashboard = () => {
  // const data = useLoaderData();

  useEffect(() => {
    setTimeout(async () => {
      console.log("asd")
      await SDK.account.deleteSession('current')
    }, 3000)
  }, [])

  return <p>ad</p>
}

export default Dashboard;