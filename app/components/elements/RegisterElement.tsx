import { Anchor, Button, Container, createStyles, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import type { CSSProperties } from "react";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Orbium - Create new account",
	description: 'Register to get access to the Orbium dashboard and all the features.',
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
      textDecoration: 'none',
      color: '#c27c1c'
    },
	},
  paperBackground: {
    backgroundColor: '#101010'
  }
}))

const RegisterUser = ({ transitionStyle, setType }: { transitionStyle: CSSProperties, setType: Function }) => {
  const { classes } = useStyles();
  return (
    <div style={transitionStyle}>
      <Container my={40} className={classes.container}>
        <Title
          align="center"
          className={classes.titleText}
        >
          Welcome to Orbium!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" className={classes.linkText} onClick={() => setType('login')}>
            Login
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.paperBackground}>
          <TextInput label="Username" placeholder="Orbium" required />
          <TextInput label="Email" type="email" placeholder="user@orbium.xyz" required mt="md" />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <PasswordInput label="Confirm password" placeholder="Your password" required mt="md" />
          <Button fullWidth mt="xl" className={classes.button}>
            Create account
          </Button>
        </Paper>
      </Container>
    </div>
  )
}

export default RegisterUser;