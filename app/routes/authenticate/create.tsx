import { Anchor, Button, Checkbox, createStyles, Group, Paper, PasswordInput, Text, TextInput, Title, Container } from "@mantine/core";
import { Link } from "@remix-run/react";
import { Header } from "~/components";

const useStyles = createStyles((theme) => ({
  container: {
    maxWidth: '30%',
    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },
  titleText: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900
  }
}))

const CreateAccount = () => {
  const { classes } = useStyles();
  return (
    <>
      <Header />
      <Container my={40} className={classes.container}>
        <Title
          align="center"
          className={classes.titleText}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor component={Link} to="./create-account" size="sm">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor component={Link} to="./forgot-password" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  )
}

export default CreateAccount;