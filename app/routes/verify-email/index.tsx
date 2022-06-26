import { Button, Container, createStyles, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Mail } from "tabler-icons-react";
import { Header } from "~/components";

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
  let userId = url.searchParams.get("userId");
  let secret = url.searchParams.get("secret");
  let expire = url.searchParams.get("expire");

  if (Date.now() > Number(expire) || !userId || !secret) {
    return redirect("/")
  }
  
  return {
    userId: userId,
    secret: secret
  }
};

const VerifyEmail = () => {
  const { classes } = useStyles();
  //const { userId, secret } = useLoaderData();

  return (
    <>
      <Header />
      <Container className={classes.outer}>
        <Paper radius="md" className={classes.card} mt={ICON_SIZE / 3}>
          <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
            <Mail size={34} />
          </ThemeIcon>

          <Text align="center" size="xl" weight={700} className={classes.title}>
            Welcome to Orbium
          </Text>
          <Text color="dimmed" align="center" size="md" mt={8}>
            We're excited to have you here with us, to get started you just need to confirm your email by pressing the button below!
          </Text>

          <Group position="apart" mt="xl">
            <Button className={classes.startButton} fullWidth>
              CONFIRM EMAIL
            </Button>
          </Group>
          <Text color="dimmed" align="center" size="xs" mt="xl">
            Psst. If you run into any problems just send us a message on Discord, link is in the top right corner!
          </Text>
        </Paper>
      </Container>
    </>
  )
}

export default VerifyEmail;