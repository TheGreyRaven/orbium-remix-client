import { Button, Container, createStyles, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import type { Models } from "appwrite";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { SDK } from "~/appwrite";

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
    textDecoration: 'none',
    '&:hover': {
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

const ResendEmail = ({ user }: { user?: Models.User<Models.Preferences>}) => {
  const { classes } = useStyles();

  const [disabled, setDisabled] = useState(false);

  const sendVerification = async () => {
    setDisabled(true);
    try {
      await SDK.account.createVerification('https://orbium.xyz/verify-email')
      showNotification({
				title: "Success",
				message: "A new email has been sent, please check your inbox!",
				color: "green"
			})
    } catch (err) {
      console.log(err);
      showNotification({
				title: "Something went wrong",
				message: "Please try again later or contact our support!",
				color: "red"
			})
    }
  }

  return (
    <Container my={40} className={classes.container}>
      <Title
        align="center"
        className={classes.titleText}
      >
        Request new email verification?
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        It seems like your email has not been verified, would you like us to send a new one?
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.paperBackground}>
        <TextInput label="Your email" type="email" placeholder="email@orbium.xyz" readOnly defaultValue={user?.email} />
        <Text mt="xs" size="sm" color="dimmed">If this is not your email, please contact us on Discord!</Text>
        <Group position="center" mt="md" className={classes.controls}>
          <Button className={classes.button} onClick={() => sendVerification()} disabled={disabled}>Request new email verification</Button>
        </Group>
      </Paper>
    </Container>
  )
}

export default ResendEmail; 