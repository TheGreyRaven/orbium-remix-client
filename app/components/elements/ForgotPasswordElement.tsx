import { Anchor, Box, Button, Center, Container, createStyles, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import type { CSSProperties } from "react";
import { ArrowLeft } from "tabler-icons-react";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Orbium - Forgot Password",
	description: 'Did you forget your password? Request a new one here!',
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

  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },

  button: {
    backgroundColor: '#F09821',
    '&:hover': {
      backgroundColor: '#c27c1c',
    },
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
  paperBackground: {
    backgroundColor: '#101010'
  }
}));

const ForgotPassword = ({ transitionStyle, setType }: { transitionStyle: CSSProperties, setType: Function }) => {
  const { classes } = useStyles();
  return (
    <div style={transitionStyle}>
      <Container my={40} className={classes.container}>
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl" className={classes.paperBackground}>
          <TextInput label="Your email" placeholder="email@orbium.xyz" required />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control} onClick={() => setType('login')}>
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
            <Button className={classes.button}>Reset password</Button>
          </Group>
        </Paper>
      </Container>
    </div>
  )
}

export default ForgotPassword;