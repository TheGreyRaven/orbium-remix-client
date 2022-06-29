import { Group, Text, Accordion, Container, createStyles, Paper, Title, Avatar } from '@mantine/core';
import type { MetaFunction } from '@remix-run/node';
import { ChartBar, CloudUpload, CurrencyDollar, Dashboard, Lifebuoy, Lock, Server } from "tabler-icons-react";
import Logo from "../../media/logo.png";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Orbium - Features",
	description: 'See all the features that Orbium has to offer.',
	keywords: 'Orbium, licensing, hwid, cheap, cloud-hosted, features',
	robots: 'index, follow',
	language: 'English',
	viewport: "width=device-width,initial-scale=1",
  'og:image': Logo,
  'og:title': "Orbium - Features",
  'og:description': 'See all the features that Orbium has to offer.'
});


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
}))

const charactersList = [
  {
    image: <Server size={32} />,
    label: '99.99% uptime',
    description: 'Guaranteed to always be online',
    content: "Our service uses load balancers across multiple server around the world to make sure that everything is available and working 24/7.",
  },

  {
    image: <CloudUpload size={32} />,
    label: 'Easy Distribution',
    description: 'Easily upload and securely store files that your application requires',
    content: "Easily upload and securely store files that your application requires directly from the dashboard and distribute it to your application",
  },
  {
    image: <Dashboard size={32} />,
    label: 'Powerful Dashboard',
    description: 'See everything from login location, authentication logs and more',
    content: 'In our dashboard you can see everything from login location, authentication logs, manage your customers and much more',
  },
  {
    image: <ChartBar size={32} />,
    label: 'Informative statistics',
    description: 'Collect and visualize statistics from your users',
    content: 'Using our SDK you can collect all kinds of statistics such as hardware information, GEO location and visualize everything in our dashboard.'
  },
  {
    image: <Lock size={32} />,
    label: 'Secure',
    description: 'End-to-end security both in transit and at rest',
    content: 'End-to-end security through the SDK and APIs both in transit and at rest',
  },
  {
    image: <Lifebuoy size={32} />,
    label: '24/7 Support',
    description: 'We are always available on Discord to help whenever you need it',
    content: 'We are always available on Discord to help whenever you need it, we also love to hear feedback and feature ideas',
  },
  {
    image: <CurrencyDollar size={32} />,
    label: 'Affordable',
    description: 'Our service are affordably priced',
    content: 'Our service are affordably priced and is just a one time payment for lifetime access without any limits',
  },
]

interface AccordionLabelProps {
  label: string;
  image: any;
  description: string;
}

const AccordionLabel = ({ label, image, description }: AccordionLabelProps) => {
  return (
    <Group noWrap>
      <Avatar radius="xl" size="lg">
        {image}
      </Avatar>
      <div>
        <Text>{label}</Text>
        <Text size="sm" color="dimmed" weight={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

const Features = () => {
  const { classes } = useStyles();

  const items = charactersList.map((item, index) =>  (
    <Accordion.Item label={<AccordionLabel {...item} />} key={item.label} sx={{
      borderBottom: (charactersList.length - 1) === index ? 0 : '1px solid #373A40'
    }}>
      <Text size="sm">{item.content}</Text>
    </Accordion.Item>
  ));

  return (
    <Container my={40} className={classes.container}>
      <Title
        align="center"
        className={classes.titleText}
      >
        What we can offer
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        This list covers our most important features and more features are added regularly
      </Text>
      <Paper withBorder shadow="md" p={8} mt={30} radius="md" sx={{ backgroundColor: '#101010' }}>
        <Accordion iconPosition="right">
          {items}
        </Accordion>
      </Paper>
    </Container>
  )
}

export default Features;