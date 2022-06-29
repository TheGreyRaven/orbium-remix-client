import sendgridClient from "@sendgrid/client"

// @ts-expect-error
sendgridClient.setApiKey(process.env.SENDGRID_KEY);

export { sendgridClient }