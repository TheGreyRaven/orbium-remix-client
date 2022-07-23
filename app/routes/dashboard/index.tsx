import type { ActionFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import { redirect} from "@remix-run/node";
import { json } from "@remix-run/node";
import { checkSession, destroySession, getSession } from "~/utils/session";
import { PurchaseLicense } from "~/components/subpages";
import { useEffect, useState } from "react";
import { SDK } from "~/appwrite";
import type { Models } from "appwrite";
import { ResendEmail } from "~/components/elements";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Orbium - Dashboard",
	description: "Control and manage your softwares from our dashboard.",
	keywords: "Orbium, licensing, hwid, cheap, cloud-hosted, features",
	robots: "index, follow",
	language: "English",
	viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
  await checkSession(request);

  return json({ auth: true });
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  return redirect('/auth', {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  })
}

const Dashboard = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    SDK.account.get().then((res) => {
      setUser(res)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      {!user.emailVerification ? (
        <ResendEmail user={user} />
      ) : (
        <PurchaseLicense/>
      )}
    </>
  )
}

export default Dashboard;