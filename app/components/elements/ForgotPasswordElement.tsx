import { Anchor, Box, Button, Center, Container, createStyles, Group, Paper, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import type { MetaFunction } from "@remix-run/node";
import type { CSSProperties} from "react";
import { useState } from "react";
import { ArrowLeft } from "tabler-icons-react";
import { z } from "zod";
import { SDK } from "~/appwrite";

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

const forgotSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

const ForgotPassword = ({ transitionStyle, setType }: { transitionStyle: CSSProperties, setType: Function }) => {
  const { classes } = useStyles();

  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm({
		schema: zodResolver(forgotSchema),
		initialValues: {
			email: ""
		},
	});

  const forgotPassword = async (values: any) => {
    setIsDisabled(true)
    await SDK.account.createRecovery(values.email, 'https://orbium.xyz/forgot-password');
    showNotification({
      title: "Email was sent successfully",
      message: "A link to reset your password has been sent to your email!",
      color: "green",
    })
  }

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
          <form onSubmit={form.onSubmit((values) => forgotPassword(values))}>
            <TextInput label="Your email" placeholder="email@orbium.xyz" {...form.getInputProps("email")} required disabled={isDisabled}/>
            <Group position="apart" mt="lg" className={classes.controls}>
              <Anchor color="dimmed" size="sm" className={classes.control} onClick={() => setType('login')}>
                <Center inline>
                  <ArrowLeft size={12} />
                  <Box ml={5}>Back to login page</Box>
                </Center>
              </Anchor>
              <Button className={classes.button} type="submit" disabled={isDisabled}>Reset password</Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default ForgotPassword;