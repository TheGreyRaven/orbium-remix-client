import { ActionIcon, Anchor, createStyles } from "@mantine/core"
import React from "react"

const useStyles = createStyles((theme) => ({
  link: {
    '&:hover': {
      color: '#c27c1c'
    }
  }
}))

const ActionIconLink = ({ url, icon }: {url: string, icon: React.ReactElement}) => {

  const { classes } = useStyles();

  return (
    // @ts-expect-error
    <ActionIcon size="lg" component={Anchor} href={url} target="_blank" className={classes.link}>
      {icon}
    </ActionIcon>
  )
}

export { ActionIconLink };