import { Transition } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { ForgotPassword, LoginUser, NewEmailVerification, RegisterUser } from "~/components/elements";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Orbium - Authenticate",
	description: 'Create, login or request a new password for your account!',
	keywords: 'Orbium, licensing, hwid, cheap, cloud-hosted',
	robots: 'index, follow',
	language: 'English',
	viewport: "width=device-width,initial-scale=1",
});

const Index = () => {
  const [type, setType] = useState<string>('login');

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

      <Transition mounted={type === 'request'} transition="fade" duration={400} timingFunction="ease">
        { (styles) => <NewEmailVerification transitionStyle={styles} setType={setType} /> }
      </Transition>
    </>
  )
}

export default Index;