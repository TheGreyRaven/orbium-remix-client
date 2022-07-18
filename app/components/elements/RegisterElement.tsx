import {
	Anchor,
	Button,
	Checkbox,
	Container,
	createStyles,
	LoadingOverlay,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import type { MetaFunction } from "@remix-run/node";
import type { CSSProperties} from "react";
import { useState } from "react";
import { z } from "zod";
import { SDK } from "~/appwrite";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Orbium - Create new account",
	description:
		"Register to get access to the Orbium dashboard and all the features.",
	keywords: "Orbium, licensing, hwid, cheap, cloud-hosted, features",
	robots: "index, follow",
	language: "English",
	viewport: "width=device-width,initial-scale=1",
});

const useStyles = createStyles((theme) => ({
	container: {
		position: "absolute",
		marginLeft: "auto",
		marginRight: "auto",
		left: 0,
		right: 0,
		maxWidth: "30%",
		[theme.fn.smallerThan("sm")]: {
			maxWidth: "100%",
		},
	},
	titleText: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 900,
	},
	button: {
		backgroundColor: "#F09821",
		"&:hover": {
			backgroundColor: "#c27c1c",
		},
	},
	linkText: {
		color: "#F09821",
		textDecoration: "none",
		"&:hover": {
			textDecoration: "none",
			color: "#c27c1c",
		},
	},
	paperBackground: {
		backgroundColor: "#101010",
	},
}));

const checkbox = {
	input: {
		"&:checked": { backgroundColor: "#F09821", borderColor: "#F09821" },
	},
} as const;

const registerSchema = z
	.object({
		username: z
			.string()
			.min(3, { message: "Username needs to be at least 3 characters" }),
		email: z.string().email({ message: "Invalid email" }),
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

const RegisterUser = ({
	transitionStyle,
	setType,
}: {
	transitionStyle: CSSProperties;
	setType: Function;
}) => {
	const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		schema: zodResolver(registerSchema),
		initialValues: {
      type: 'register',
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			newsLetter: true,
		},
	});

	const registerUser = async (values: any) => {
		setIsLoading(true);
		try {
			await SDK.account.create(
				"unique()",
				values.email,
				values.password,
				values.username
			);

			await SDK.account.createSession(values.email, values.password);

			await SDK.account.createVerification('https://orbium.xyz/verify-email')
			showNotification({
				title: "Success",
				message: "Your account have been created, please verify your email with the link we have sent to you!",
				color: "green"
			})
		} catch (err: any) {
			console.log(err.toString());
			showNotification({
				title: "Something went wrong",
				message: "Please try again later or contact our support!",
				color: "red"
			})
		}
		setIsLoading(false)
	}

	return (
		<div style={transitionStyle}>
			<Container my={40} className={classes.container}>
				<Title align="center" className={classes.titleText}>
					Welcome to Orbium!
				</Title>
				<Text color="dimmed" size="sm" align="center" mt={5}>
					Already have an account?{" "}
					<Anchor
						size="sm"
						className={classes.linkText}
						onClick={() => setType("login")}
					>
						Login
					</Anchor>
				</Text>

				<Paper
					withBorder
					shadow="md"
					p={30}
					mt={30}
					radius="md"
					className={classes.paperBackground}
				>
					<LoadingOverlay visible={isLoading} />
          <form onSubmit={form.onSubmit((values) => registerUser(values))}>
            <TextInput name="type" defaultValue="register" hidden />
            <TextInput
              label="Username"
              name="username"
              placeholder="Orbium"
              {...form.getInputProps("username")}
              required
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="user@orbium.xyz"
              {...form.getInputProps("email")}
              required
              mt="md"
            />
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              required
              mt="md"
            />
            <PasswordInput
              label="Confirm password"
              placeholder="Your password"
              {...form.getInputProps("confirmPassword")}
              required
              mt="md"
            />
            <Checkbox
              label="Receive newsletter"
              name="newsletter"
              defaultChecked
              mt="md"
              {...form.getInputProps("newsLetter")}
              styles={checkbox}
            />
            <Button fullWidth mt="xl" className={classes.button} type="submit">
              Create account
            </Button>
          </form>
				</Paper>
			</Container>
		</div>
	);
};

export const performRegistration = async (body: FormData) => {
  const username = body.get('username');
  const email = body.get('email');
  const password = body.get('password');
  const newsletter = body.get('newsletter')

  return {
    username,
    email,
    password,
    newsletter
  }
}

export default RegisterUser;
