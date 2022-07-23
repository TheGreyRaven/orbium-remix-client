import { Button, Container, createStyles, Paper, Text, Title } from "@mantine/core";
import { useSubmit } from "@remix-run/react";
import { Query, SDK } from "~/appwrite";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

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

const PurchaseLicense = () => {
  const { classes } = useStyles();

  const submit = useSubmit();

  const [success, setSuccess] = useState(false);
  const [licensed, setLicensed] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [ErrorMessage, setErrorMessage] = useState("");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [orderID, setOrderID] = useState(false);

  const logoutUser = async () => {
    await SDK.account.deleteSession('current');
    submit(null, { method: "post" });
  }

  const createOrder = (_data: any, actions: any) => {
		return actions.order
			.create({
				purchase_units: [
					{
						description: "Premium Orbium License",
						amount: {
							currency_code: "EUR",
							value: 4.99,
						},
					},
				],
				application_context: {
					shipping_preference: "NO_SHIPPING",
				},
			})
			.then((orderID: any) => {
				setOrderID(orderID);
				return orderID;
			});
	};

	const onApprove = (_data: any, actions: any) => {
		return actions.order.capture().then((details: any) => {
			// const { payer } = details;
			setSuccess(true);
		});
	};

	const onError = () => {
		setErrorMessage("An Error occurred with your payment ");
	};

	useEffect(() => {
		if (success) {
			(async() => {
        const user = await SDK.account.get();
				await SDK.database.createDocument("62aa04a42eb3985280f9", "unique()", {
					user_id: user?.$id,
					licensed: success
				})
			})();
		}
	}, [success]);

  useEffect(() => {
		(async () => {
			try {
				const user = await SDK.account.get();

				const license = await SDK.database.listDocuments(
					"62aa04a42eb3985280f9",
					[Query.equal("user_id", user.$id)]
				);

				const result = license.documents.pop() ?? false;
        // @ts-expect-error
				if (result?.licensed) {
					setLicensed(true);
				}
			} catch (err: any) {
        console.log(err.toString());
      }
		})();
	}, []);

  return (
    <Container my={40} className={classes.container}>
      <Title
        align="center"
        className={classes.titleText}
      >
        Thank you!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Thank you for signing up to Orbium, currently we can't show you the dashboard yet but we are very close! 😉
      </Text>
      <Paper withBorder shadow="md" p="xl" mt={30} radius="md" sx={{ backgroundColor: '#101010' }}>
        {!licensed ? (
        <>
          <Text mb="md" align="center">Upgrade to a premium license and gain access to all features we offer and premium support for a reduced one time payment of only 4.99€!</Text>
          <PayPalScriptProvider
            options={{
              "client-id": "AddMahnwxdrZCvig0_AZtdCr1y9njw4dw7ZrDcmoOL87B8Nl08245HLiQ3jkNSK3YxcmPrIe5DtAurna",
              currency: "EUR",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical", color: "blue" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
          </PayPalScriptProvider>
        </>) : (
          <Text mb="md" align="center">You already have a premium license and since the dashboard is not yet ready there is not much you can do here, but don't worry Orbium will very soon be available for use!</Text>
        )}

        <Button fullWidth className={classes.button} onClick={logoutUser} mt="md">
          Sign out
        </Button>
      </Paper>
    </Container>
  )
}

export default PurchaseLicense;