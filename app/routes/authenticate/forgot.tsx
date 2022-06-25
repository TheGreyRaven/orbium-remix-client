import React from 'react';
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from '@mantine/core';
import { ArrowLeft } from 'tabler-icons-react';
import { Header } from '~/components';
import { Link } from '@remix-run/react';

const useStyles = createStyles((theme) => ({
  container: {
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
}));

const ForgotPassword = () => {
  const { classes } = useStyles();

  return (
    <>
      <Header />
      <Container my={40} className={classes.container}>
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="Your email" placeholder="email@orbium.xyz" required />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control} component={Link} to="/authenticate/">
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
            <Button className={classes.button}>Reset password</Button>
          </Group>
        </Paper>
      </Container>
    </>
  );
}

export default ForgotPassword;