import { ActionIcon, Anchor } from "@mantine/core"
import React from "react"

const ActionIconLink = ({ url, icon }: {url: string, icon: React.ReactElement}) => {
  return (
    // @ts-expect-error
    <ActionIcon size="lg" component={Anchor} href={url} target="_blank">
      {icon}
    </ActionIcon>
  )
}

export { ActionIconLink };