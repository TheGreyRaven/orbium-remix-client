import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { checkSession } from "~/session";

export const loader: LoaderFunction = async ({ request }) => {
  await checkSession(request);

  return json({ auth: true });
};

const Dashboard = () => {
  // const data = useLoaderData();

  return <p>ad</p>
}

export default Dashboard;