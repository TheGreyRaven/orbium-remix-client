import { Button, Container, createStyles, Paper, Text, Title } from "@mantine/core";
import type { LoaderFunction} from "@remix-run/node";
import { json } from "@remix-run/node";
import { SDK } from "~/appwrite";
import { checkSession } from "~/session";

export const loader: LoaderFunction = async ({ request }) => {
  await checkSession(request);

  return json({ auth: true });
};

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
  },
  button: {
    backgroundColor: '#F09821',
    '&:hover': {
      backgroundColor: '#c27c1c',
    },
  },
}))

const Dashboard = () => {
  const { classes } = useStyles();

  const logoutUser = async () => {
    await SDK.account.deleteSession('current');
  }

  return (
    <Container my={40} className={classes.container}>
    <Title
      align="center"
      className={classes.titleText}
    >
      Thank you!
    </Title>
    <Text color="dimmed" size="sm" align="center" mt={5}>
      Thank you for signing up to Orbium, currently we can't show you the dashboard yet but check back in within a week! 😉
    </Text>
    <Paper withBorder shadow="md" p="xl" mt={30} radius="md" sx={{ backgroundColor: '#101010' }}>
      <Button fullWidth className={classes.button} onClick={logoutUser}>
        Sign out
      </Button>
    </Paper>
  </Container>
  )
}

export default Dashboard;