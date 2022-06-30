import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { SDK } from "~/appwrite";
import { checkSession, destroySession, getSession } from "~/session";

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData();
  const invalidate = body.get('invalidate');
  const session = await getSession(request.headers.get('Cookie'));
  
  if (invalidate === 'true') {
    throw redirect("/auth", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  return null
};

export const loader: LoaderFunction = async ({ request }) => {
  await checkSession(request);

  return json({ auth: true });
};

const Dashboard = () => {
  // const data = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    (async() => {
      try {
        await SDK.account.get();
      } catch (err) {
        fetcher.submit(
          { invalidate: 'true' },
          { method: 'post' }
        )
      }
    })();
  }, [fetcher])

  return <p>ad</p>
}

export default Dashboard;