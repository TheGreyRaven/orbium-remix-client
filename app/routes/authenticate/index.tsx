import { Transition } from "@mantine/core";
import { useState } from "react";
import { ForgotPassword, LoginUser, NewEmailVerification, RegisterUser } from "~/components/elements";

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