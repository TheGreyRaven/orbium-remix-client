
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { SDK } from '~/appwrite';

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      // domain: "dev.orbium.xyz",
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
      maxAge: 86400000,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.COOKIE_SECRET],
      secure: true
    }
  });

export async function checkSession(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));

  if (!session.has('userId')) {
    throw redirect('/auth?type=login')
  }

  SDK.setJWT(session.get('jwt').toString());

  return session;
}

export { getSession, commitSession, destroySession };