import { createStyles, Group, Container, Text, List, ThemeIcon, Button, Anchor } from '@mantine/core';
import { Link } from '@remix-run/react';
import { Check } from 'tabler-icons-react';
import { TextLoop } from "react-text-loop-next";
import { TextAnchor } from '~/components/atoms';
import type { MetaFunction } from '@remix-run/node';
import Logo from '../media/logo.png';

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Orbium - Advanced software licensing",
	description: 'Orbium is the next generation of cloud-hosted software licensing, not only is it simple to use its also incredibly flexible and powerful.',
	keywords: 'Orbium, licensing, hwid, cheap, cloud-hosted',
	robots: 'index, follow',
	language: 'English',
	viewport: "width=device-width,initial-scale=1",
  'og:image': Logo,
  'og:title': "Orbium - Advanced software licensing",
  'og:description': 'Orbium is the next generation of cloud-hosted software licensing, not only is it simple to use its also incredibly flexible and powerful.'
});

const useStyles = createStyles((theme) => ({
  outer: {
    display: 'flex',
    justifyContent: 'center',
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

    [theme.fn.smallerThan('xl')]: {
      fontSize: '2rem',
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
  // 'verify HWID',
  'make life easier'
]

const Index = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.outer}>
      <Group direction='column' sx={{ minWidth: '100%' }}>
        <Text className={classes.landingText}>Hey there!</Text>
        {/* <TextLoop>
          {SWITCHABLE_TEXT.map((text, index) => (
            <Text key={index} className={classes.landingText}>{text}</Text>
          ))}
        </TextLoop> */}
        <Text className={classes.landingText}>We are currently</Text>
        <Text className={classes.landingText}>rebuilding <span style={{ color: "#F09821" }}>Orbium</span></Text>
        {/* <List spacing="sm" pt={12} icon={
          <ThemeIcon size={24} radius="xl" sx={{ backgroundColor: "#F09821" }}>
            <Check size={16} />
          </ThemeIcon>
        }>
          <List.Item>Monitor everything from online customers, logins and more.</List.Item>
          <List.Item>End-to-end security through the SDK and APIs both in transit and at rest.</List.Item>
          <List.Item>Easily upload and store files required by your software.</List.Item>
          <List.Item>Authenticate your customers using your XenForo, IPS, MyBB forum.</List.Item>
          <List.Item>Write and publish news to your clients.</List.Item>
        </List> */}
        <TextAnchor text='See all our' linkText='features' to='/features/' />
        <Button mt={12} size='xl' className={classes.startButton} component="a" href='https://discord.gg/6fGthxY594' target="_blank">JOIN DISCORD</Button>
        <TextAnchor text='By joining, you agree with our' linkText='Terms of Service' to='/tos/' />
      </Group>
    </Container>
  );
}

export default Index;