import { createStyles, Header, Group, ActionIcon, Container, Image, Text, List, ThemeIcon, Button, Anchor } from '@mantine/core';
import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { BrandTwitter, BrandDiscord, Check } from 'tabler-icons-react';
import { TextLoop } from "react-text-loop-next";
import Logo from '../media/logo.png';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  outer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20vh',

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  landingText: {
    fontSize: '4.5rem',
    lineHeight: '2rem',
    fontWeight: 700,
    paddingBottom: 32,

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
      backgroundColor: '#F09821',
      opacity: 0.8
    },

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  linkText: {
    color: '#F09821'
  }
}));

const SWITCHABLE_TEXT = [
  'license your software',
  'authenticate customers',
  'load remote DLLs',
  'improve security',
  'make life easier'
]

const Index = () => {
  const { classes } = useStyles();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <Header height={56} mb={120} sx={{ borderBottom: 0 }} >
      <Container className={classes.inner}>
        <Group>
          <Image src={Logo} height={48} />
          <Text weight={700} size="xl">Orbium</Text>
        </Group>

        <Group spacing={8} className={classes.social} position="right" noWrap>
          { /* @ts-expect-error */}
          <ActionIcon size="lg" component={Anchor} href='https://twitter.com/theravengrey' target="_blank">
            <BrandTwitter size={24} />
          </ActionIcon>
          { /* @ts-expect-error */}
          <ActionIcon size="lg" component={Anchor} href='https://twitter.com/thegreyraven' target="_blank">
            <BrandDiscord size={24} />
          </ActionIcon>
        </Group>
      </Container>

      <Container className={classes.outer}>
        <Group direction='column' sx={{ minWidth: '100%' }}>
          <Text className={classes.landingText}>A better way to</Text>
          <TextLoop>
            {SWITCHABLE_TEXT.map((text, index) => (
              <Text key={index} sx={{ color: "white" }} className={classes.landingText}>{text}</Text>
            ))}
          </TextLoop>
          <Text sx={{ color: "white" }} className={classes.landingText}>using <span style={{ color: "#F09821" }}>Orbium</span></Text>
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

          <Button mt={12} size='xl' radius={0} className={classes.startButton} component={Link} to='/authenticate/'>GET STARTED</Button>
          <Text weight={500}>By joining, you agree with our <span className={classes.linkText}>Terms of Service</span></Text>
        </Group>
      </Container>
    </Header>
  );
}

export default Index;