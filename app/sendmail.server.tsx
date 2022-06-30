import sendgridClient from "@sendgrid/client"

sendgridClient.setApiKey(process.env.SENDGRID_KEY);

export { sendgridClient }