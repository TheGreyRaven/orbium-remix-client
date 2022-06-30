import {
	Button,
	Container,
	createStyles,
	Paper,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import type { ActionFunction} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { sendgridClient } from "~/sendmail.server";

const useStyles = createStyles((theme) => ({
	container: {
		maxWidth: "30%",
		[theme.fn.smallerThan("sm")]: {
			maxWidth: "100%",
		},
	},
	titleText: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 900,
	},
	startButton: {
		width: "100%",
		backgroundColor: "#F09821",
		"&:hover": {
			backgroundColor: "#c27c1c",
		},
	},
}));

const ThankYou = () => {
	const { classes } = useStyles();
	return (
		<>
			<Title align="center" className={classes.titleText}>
				Thank you!
			</Title>
			<Paper
				withBorder
				shadow="md"
				p={30}
				mt={30}
				radius="md"
				sx={{ backgroundColor: "#101010" }}
			>
				<Text color="dimmed" size="sm" align="center" mt={5}>
					We will hopefully soon start letting people in to our service, keep an eye out on your inbox and perhaps you will soon get a early access invite!
				</Text>
			</Paper>
		</>
	)
}

const Index = () => {
	const { classes } = useStyles();
	const [isDisabled, setDisabled] = useState(false);
	const actionData = useActionData();

	return (
		<Container my={40} className={classes.container}>
			{actionData?.success === true ? (
				<ThankYou />
			) : (
				<>
					<Title align="center" className={classes.titleText}>
						Join our newsletter
					</Title>
					<Text color="dimmed" size="sm" align="center" mt={5}>
						By joining our newsletter you can stay up to date with the
						development of Orbium, have a chance at getting early access
						to our service, early access to our SDK & API documentation
						and a lot more.
					</Text>
					<Paper
						withBorder
						shadow="md"
						p={30}
						mt={30}
						radius="md"
						sx={{ backgroundColor: "#101010" }}
					>
						<Form method="post" onSubmit={() => setDisabled(true)}>
							<TextInput
								type="email"
								name="email"
								label="Your email"
								placeholder="user@orbium.xyz"
								disabled={isDisabled}
								required
							/>
							<Button
								mt={16}
								className={classes.startButton}
								type="submit"
								disabled={isDisabled}
								loading={isDisabled}
							>
								Join the newsletter
							</Button>
						</Form>
					</Paper>
				</>
			)}
		</Container>
	);
};

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData();
	const email = body.get("email");

	if (!email) {
		return json({
			success: false,
			error: "no email",
		});
	}

	try {
		await sendgridClient.request({
			url: `/v3/marketing/contacts`,
			method: "PUT",
			body: {
				contacts: [
					{
						email: email,
					},
				],
			},
		});

		return json({
			success: true,
			error: null,
		});
	} catch (err: any) {
		return json({
			success: false,
			error: err.response.body.errors[0]?.message,
		});
	}
}

export default Index;
