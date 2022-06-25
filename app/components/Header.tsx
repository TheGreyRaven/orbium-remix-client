import { Container, Group, Image, Text, Header, createStyles, Anchor } from "@mantine/core"
import { Link } from '@remix-run/react';
import { BrandDiscord, BrandTwitter } from "tabler-icons-react"
import { ActionIconLink } from "./atoms"
import Logo from '../media/logo.png';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

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

  link: {
		color: '#C1C2C5',
    '&:link': {
      textDecoration: 'none'
    },
    '&:visited': {
      textDecoration: 'none'
    },
    '&:active': {
      textDecoration: 'none'
    },
    '&:hover': {
      textDecoration: 'none',
      color: '#c27c1c'
    },
	},
}))

const SiteHeader = () => {
  const { classes } = useStyles();
  return (
    <Header height={56} sx={{ borderBottom: 0 }} >
      <Container className={classes.inner} onClick={() => console.log("asd")}>
        <Anchor component={Link} to="/" className={classes.link}>
          <Group>
            <Image src={Logo} height={48} />
            <Text weight={700} size="xl">Orbium</Text>
          </Group>
        </Anchor>
        <Group spacing={8} className={classes.social} position="right" noWrap>
          <ActionIconLink url='https://twitter.com/theravengrey' icon={<BrandTwitter size={24} />} />
          <ActionIconLink url='https://discord.gg/6fGthxY594' icon={ <BrandDiscord size={24} />} />
        </Group>
      </Container>
    </Header>
  )
}

export { SiteHeader }