import { Transition } from "@mantine/core";
import type { ActionFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import { json} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ForgotPassword, LoginUser, RegisterUser } from "~/components/elements";
import { doLogin } from "~/components/elements/LoginElement";
import { sendgridClient } from "~/utils/sendmail.server";
import { getSession } from "~/utils/session";
import Logo from "../../media/logo.png";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Orbium - Authenticate",
	description: 'Create, login or request a new password for your account!',
	keywords: 'Orbium, licensing, hwid, cheap, cloud-hosted',
	robots: 'index, follow',
	language: 'English',
	viewport: "width=device-width,initial-scale=1",
  'og:image': Logo,
  'og:title': "Orbium - Authenticate",
  'og:description': 'Create, login or request a new password for your account.'
});

const availableTypes = [
  'login',
  'register',
  'forgot',
  'request'
]

export const loader: LoaderFunction = async ({
  request,
}) => {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('userId')) {
    return redirect('/dashboard');
  }

  const url = new URL(request.url);
  const type = url.searchParams.get("type") ?? undefined;

  if (!type || !availableTypes.includes(type)) {
    return redirect('/auth?type=login')
  }

  return type
};

const Index = () => {
  const authType = useLoaderData();
  const navigate = useNavigate();
  const [type, setType] = useState<string>(authType);

  useEffect(() => {
    if (authType !== type) {
      navigate(`/auth?type=${type}`)
    }
  }, [authType, navigate, type])

  return (
    <>
      <Transition mounted={type === 'login'} transition="fade" duration={400} timingFunction="ease">
        { (styles) => <LoginUser transitionStyle={styles} setType={setType} /> }
      </Transition>

      <Transition mounted={type === 'register'} transition="fade" duration={400} timingFunction="ease">
        { (styles) => <RegisterUser transitionStyle={styles} setType={setType} /> }
      </Transition>

      <Transition mounted={type === 'forgot'} transition="fade" duration={400} timingFunction="ease">
        { (styles) => <ForgotPassword transitionStyle={styles} setType={setType} /> }
      </Transition>
    </>
  )
}

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData();
  const type = body.get('type');
  const newsletter = body.get('newsletter') ?? false;
  
  if (newsletter) {
    try {
      await sendgridClient.request({
        url: `/v3/marketing/contacts`,
        method: "PUT",
        body: {
          contacts: [
            {
              email: body.get('email'),
            },
          ],
        },
      });
    } catch (err: any) {
      console.log(err)
    }
  }

  switch (type) {
    case 'register':
      return null;

    case 'login':
      return await doLogin(request, body);

    case 'forgot':
      return null

    default:
      return json({
        success: false,
        error: 'Missing post data'
      })
  }
};


export default Index;