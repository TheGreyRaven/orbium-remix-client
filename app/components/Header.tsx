import { Container, Group, Image, Text, Header, createStyles } from "@mantine/core"
import { BrandDiscord, BrandTwitter } from "tabler-icons-react"
import { ActionIconLink } from "./atoms"
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
}))

const SiteHeader = () => {
  const { classes } = useStyles();
  return (
    <Header height={56} mb={120} sx={{ borderBottom: 0 }} >
      <Container className={classes.inner}>
        <Group>
          <Image src={Logo} height={48} />
          <Text weight={700} size="xl">Orbium</Text>
        </Group>

        <Group spacing={8} className={classes.social} position="right" noWrap>
          <ActionIconLink url='https://twitter.com/theravengrey' icon={<BrandTwitter size={24} />} />
          <ActionIconLink url='https://discord.gg/6fGthxY594' icon={ <BrandDiscord size={24} />} />
        </Group>
      </Container>
    </Header>
  )
}

export { SiteHeader }