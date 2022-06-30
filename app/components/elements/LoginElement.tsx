import { Anchor, Container, createStyles, Group, Paper, PasswordInput, Text, TextInput, Title, Button } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import type { MetaFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import type { CSSProperties } from "react";
import { z } from "zod";
import { SDK } from "~/appwrite";
import { commitSession, getSession } from "~/session";

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

const loginSchema = z
	.object({
		email: z.string().email({ message: "Invalid email" }),
		password: z
			.string()
			.min(8, { message: "Password needs to be at least 8 characters" })
	})

const LoginUser = ({ transitionStyle, setType }: { transitionStyle: CSSProperties, setType: Function }) => {
  const { classes } = useStyles();
  const fetcher = useFetcher();

  const form = useForm({
		schema: zodResolver(loginSchema),
		initialValues: {
			email: "",
			password: "",
		},
	});

  const handleLogin = async (values: any) => {
    try {
      const session = await SDK.account.createSession(values.email, values.password);
      const jwt = (await SDK.account.createJWT()).jwt;
      
      fetcher.submit(
        { userId: session.userId, jwt, type: 'login' },
        { method: 'post' }
      )
    } catch (e) {
      console.error(e);
    }
  };

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
          <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
            <TextInput label="Email" type="email" placeholder="email@orbium.xyz" required {...form.getInputProps("email")} />
            <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps("password")}/>
            <Group position="apart" mt="md">
              <Anchor size="sm" className={classes.linkText} onClick={() => setType('forgot')}>
                Forgot password?
              </Anchor>

              <Anchor size="sm" className={classes.linkText} onClick={() => setType('request')}>
                Request email verification
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" className={classes.button} type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export const doLogin = async (request: any, body: any) => {
  const session = await getSession(request.headers.get('Cookie'));
  const jwt = body.get('jwt');
  const userId = body.get('userId');

  session.set('userId', userId);
  session.set('jwt', jwt);

  return redirect('/dashboard/', {
    headers: {
      'Set-Cookie': await commitSession(session)
    }
  })
}

export default LoginUser;