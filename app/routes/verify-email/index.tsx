import { Button, Container, createStyles, Stack, Paper, Text, TextInput, ThemeIcon } from "@mantine/core";
import type { LoaderFunction, MetaFunction} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {  MoodHappy, MoodSad } from "tabler-icons-react";
import { SDK } from "~/appwrite";
import Logo from '../../media/logo.png';

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Orbium - Verify email",
	description: 'Verify your Orbium account email.',
	keywords: 'Orbium, licensing, hwid, cheap, cloud-hosted, features',
	robots: 'index, follow',
	language: 'English',
	viewport: "width=device-width,initial-scale=1",
  'og:image': Logo,
  'og:title': "Orbium - Verify email",
  'og:description': 'Verify your Orbium account email.'
});


const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  outer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15vh',

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  card: {
    position: 'relative',
    overflow: 'visible',
    width: '80%',
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
    backgroundColor: '#151515',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  icon: {
    position: 'absolute',
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
    backgroundColor: '#F09821'
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
  startButton: {
    width: '100%',
    backgroundColor: '#F09821',
    '&:hover': {
      backgroundColor: '#c27c1c',
    },
  }
}))

export const loader: LoaderFunction = async ({
  request,
}) => {
  const url = new URL(request.url);
  let userId = url.searchParams.get("userId") ?? null;
  let secret = url.searchParams.get("secret") ?? null;
  let expire = url.searchParams.get("expire") ?? null;

  if (Date.now() > Number(expire) * 1000 || !userId || !secret) {
    return {
      success: false,
      error: 'Missing parameters'
    }
  }

  try {
    await SDK.account.updateVerification(userId, secret)
    return {
      success: true
    }
  } catch (err: any) {
    return {
      success: false,
      error: err.message
    }
  }
};

const VerifyEmail = () => {
  const { classes } = useStyles();
  const { success, error } = useLoaderData();

  return (
    <Container className={classes.outer}>
      <Paper radius="md" className={classes.card} mt={ICON_SIZE / 3}>
        <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
        { success ? <MoodHappy size={34} /> : <MoodSad size={34} /> }
        </ThemeIcon>

        <Text align="center" size="xl" weight={700} className={classes.title}>
          { success ? 'Wohoo, welcome to Orbium' : 'Oh no, something went wrong!' }
        </Text>
        <Text color="dimmed" align="center" size="md" mt={8}>
        { success ? 'We\'re excited to have you here with us, your email has now been confirmed so to get started just press the button below!' :
        `Sadly we were not able to confirm your email with the reason: ${error}, please try again later or request a new email verification!` }
        </Text>

        <Stack mt="xl">
          { success ? (
            <Button className={classes.startButton} fullWidth component={Link} to="/dashboard/">
              Go to dashboard
            </Button>
          ) : [
            <TextInput key={0} label="Your email" placeholder="user@orbium.xyz" required />,
            <Button key={1} className={classes.startButton}>Request new confirmation</Button>
          ]}
        </Stack>
        <Text color="dimmed" align="center" size="xs" mt="xl">
          Psst. If you run into any problems just send us a message on Discord, link is in the top right corner!
        </Text>
      </Paper>
    </Container>
  )
}

export default VerifyEmail;