import { Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import { Header } from "~/components";
import { ForgotPassword, LoginUser, RegisterUser } from "~/components/elements";

const Index = () => {
  const [type, setType] = useState<string | undefined>(undefined);
  useEffect(() => {
    setTimeout(() => {
      setType('login')
    }, 100)
  }, [])

  return (
    <>
      <Header />
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

export default Index;