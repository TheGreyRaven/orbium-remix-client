import { Anchor, Box, Button, Center, Container, createStyles, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import type { CSSProperties } from "react";
import { ArrowLeft } from "tabler-icons-react";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Orbium - Request new email verification",
	description: 'Did you not get your email verification? Request a new one here!',
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
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  button: {
    backgroundColor: '#F09821',
    '&:hover': {
      backgroundColor: '#c27c1c',
    },
  },
  linkText: {
		color: "#F09821",
    '&:link': {
      textDecoration: 'none'
    },
    '&:visited': {
      textDecoration: 'none'
    },
    '&:active': {
      textDecoration: 'none'
    },
    '&:hover': {
      textDecoration: 'none',
      color: '#c27c1c'
    },
	},
  paperBackground: {
    backgroundColor: '#101010'
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
}))

const NewEmailVerification = ({ transitionStyle, setType }: { transitionStyle: CSSProperties, setType: Function }) => {
  const { classes } = useStyles();

  return (
    <div style={transitionStyle}>
      <Container my={40} className={classes.container}>
        <Title
          align="center"
          className={classes.titleText}
        >
          Request new email?
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          If you have not received your email verification you can request a new one!
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.paperBackground}>
          <TextInput label="Email" type="email" placeholder="email@orbium.xyz" required />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control} onClick={() => setType('login')}>
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
            <Button className={classes.button}>Request new email verification</Button>
          </Group>
        </Paper>
      </Container>
    </div>
  )
}

export default NewEmailVerification;