import { createStyles, Group, Container, Text, List, ThemeIcon, Button } from '@mantine/core';
import { Link } from '@remix-run/react';
import { Check } from 'tabler-icons-react';
import { TextLoop } from "react-text-loop-next";
import { TextAnchor } from '~/components/atoms';
import { Header } from '~/components';

const useStyles = createStyles((theme) => ({
  outer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15vh',

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
      marginTop: '5vh',
    },
  },

  landingText: {
    fontSize: '4.5rem',
    lineHeight: '2rem',
    fontWeight: 700,
    paddingBottom: 32,
    color: 'white',

    [theme.fn.smallerThan('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.5rem',
      paddingBottom: 0,
    },

    [theme.fn.smallerThan('md')]: {
      fontSize: '0.25rem',
      lineHeight: '1.5rem',
      paddingBottom: 0,
    },

    [theme.fn.smallerThan('lg')]: {
      fontSize: '0.25rem',
      lineHeight: '1.5rem',
      paddingBottom: 0,
    },

    [theme.fn.smallerThan('xl')]: {
      fontSize: '1.5rem',
      lineHeight: '1.5rem',
      paddingBottom: 0,
    },
  },

  startButton: {
    width: '70%',
    backgroundColor: '#F09821',
    '&:hover': {
      backgroundColor: '#c27c1c',
    },

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

}));

const SWITCHABLE_TEXT = [
  'license your software',
  'authenticate customers',
  'load remote DLLs',
  'improve security',
  'verify HWID',
  'make life easier'
]

const Index = () => {
  const { classes } = useStyles();

  return (
    <>
      <Header />
      <Container className={classes.outer}>
        <Group direction='column' sx={{ minWidth: '100%' }}>
          <Text className={classes.landingText}>A better way to</Text>
          <TextLoop>
            {SWITCHABLE_TEXT.map((text, index) => (
              <Text key={index} className={classes.landingText}>{text}</Text>
            ))}
          </TextLoop>
          <Text className={classes.landingText}>using <span style={{ color: "#F09821" }}>Orbium</span></Text>
          <List spacing="sm" pt={12} icon={
            <ThemeIcon size={24} radius="xl" sx={{ backgroundColor: "#F09821" }}>
              <Check size={16} />
            </ThemeIcon>
          }>
            <List.Item>Monitor everything from online customers, logins and more.</List.Item>
            <List.Item>End-to-end security through the SDK and APIs both in transit and at rest.</List.Item>
            <List.Item>Easily upload and store files required by your software.</List.Item>
            <List.Item>Write and publish news in realtime to your clients.</List.Item>
          </List>
          <TextAnchor text='See full list of' linkText='features' to='/features/' />

          <Button mt={12} size='xl' radius={0} className={classes.startButton} component={Link} to='/authenticate/'>GET STARTED</Button>
          <TextAnchor text='By joining, you agree with our' linkText='Terms of Service' to='/tos/' />
        </Group>
      </Container>
    </>
  );
}

export default Index;