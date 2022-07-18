import { Button, Container, createStyles, Stack, Paper, Text, TextInput, ThemeIcon } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import type { LoaderFunction, MetaFunction} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import {  MoodHappy, MoodSad } from "tabler-icons-react";
import { z } from "zod";
import { SDK } from "~/appwrite";
import { showNotification } from '@mantine/notifications';
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

const passwordSchema = z
	.object({
		password: z
			.string()
			.min(8, { message: "Password needs to be at least 8 characters" }),
		confirmPassword: z
			.string()
			.min(8, { message: "Password needs to be at least 8 characters" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords does not match",
    path: ['confirmPassword']
	});

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

  return {
    success: true,
    userId: userId,
    secret: secret
  }
};

const VerifyEmail = () => {
  const { classes } = useStyles();
  const { error, success, userId, secret} = useLoaderData();

  const [isSuccess, setIsSuccess] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm({
		schema: zodResolver(passwordSchema),
		initialValues: {
			password: "",
			confirmPassword: "",
		},
	});

  const changePassword = async (values: any) => {
    setIsDisabled(true);
    try {
      await SDK.account.updateRecovery(userId, secret, values.password, values.confirmPassword)
      setIsSuccess(true);
    } catch (err: any) {
      showNotification({
        title: "There was an error",
        message: "something went wrong while changing your password, try again later or contact our support!",
        color: "red",
      })
    }
    setIsDisabled(false);
  }

  return (
    <Container className={classes.outer}>
      <Paper radius="md" className={classes.card} mt={ICON_SIZE / 3}>
        <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
        { isSuccess ? <MoodHappy size={34} /> : <MoodSad size={34} /> }
        </ThemeIcon>

        <Text align="center" size="xl" weight={700} className={classes.title}>
          { isSuccess ? 'Wohoo, your password has been changed!' : (success ? 'Don\'t worry, we will help you!' : 'Oh no, something went wrong!')}
        </Text>
        <Text color="dimmed" align="center" size="md" mt={8}>
        { isSuccess ? 'You can now sign back into your account, simple press the button below to be redirected to the login page!' :
          (success ? 'If you have forgotten your password, simply enter your new password below and we will change it for you instantly!' :
          `Sadly we were not able to change your password with the reason: ${error}, please try again later or request a new password reset!`)
        }
        </Text>

        <Stack mt="xl">
          { (success && !isSuccess) && (
            <form onSubmit={form.onSubmit((values) => changePassword(values))}>
              <TextInput label="Password" placeholder="Password" type="password" required  disabled={isDisabled} {...form.getInputProps("password")}/>
              <TextInput mt="xs" label="Confirm password" placeholder="Confirm password" type="password" required disabled={isDisabled} {...form.getInputProps("confirmPassword")}/>
              <Button mt="xl" className={classes.startButton} type="submit" disabled={isDisabled}>Change password</Button>
            </form>
          )}
          
          {(!success || isSuccess) && (
            <Button className={classes.startButton} fullWidth component={Link} to="/dashboard/">
              Go to dashboard
            </Button>
          )}
        </Stack>
        <Text color="dimmed" align="center" size="xs" mt="xl">
          Psst. If you run into any problems just send us a message on Discord, link is in the top right corner!
        </Text>
      </Paper>
    </Container>
  )
}

export default VerifyEmail;