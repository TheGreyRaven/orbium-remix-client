import { Anchor, Container, createStyles, Group, Paper, PasswordInput, Text, TextInput, Title, Button } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import type { CSSProperties } from "react";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Orbium - Login",
	description: 'Sign in to the Orbium dashboard.',
	keywords: 'Orbium, licensing, hwid, cheap, cloud-hosted, features',
	robots: 'index, follow',
	language: 'English',
	viewport: "width=device-width,initial-scale=1",
});

const useStyles = createStyles((theme) => ({
  container: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    maxWidth: '30%',
    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },
  titleText: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900
  },
  button: {
    backgroundColor: '#F09821',
    '&:hover': {
      backgroundColor: '#c27c1c',
    },
  },
  linkText: {
		color: "#F09821",
    textDecoration: 'none',
    '&:hover': {
      color: '#c27c1c'
    },
	},
  paperBackground: {
    backgroundColor: '#101010'
  }
}))

const LoginUser = ({ transitionStyle, setType }: { transitionStyle: CSSProperties, setType: Function }) => {
  const { classes } = useStyles();
  return (
    <div style={transitionStyle}>
      <Container my={40} className={classes.container}>
        <Title
          align="center"
          className={classes.titleText}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" className={classes.linkText} onClick={() => setType('register')}>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.paperBackground}>
          <TextInput label="Email" type="email" placeholder="email@orbium.xyz" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group position="apart" mt="md">
            <Anchor size="sm" className={classes.linkText} onClick={() => setType('forgot')}>
              Forgot password?
            </Anchor>

            <Anchor size="sm" className={classes.linkText} onClick={() => setType('request')}>
              Request email verification
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" className={classes.button}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </div>
  )
}

export default LoginUser;