
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { SDK } from '~/appwrite';

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // all of these are optional
      domain: "localhost",
      expires: new Date(Date.now() + 15_000),
      httpOnly: true,
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
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