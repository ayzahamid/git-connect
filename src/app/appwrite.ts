import { Client, Account, ID } from 'appwrite'

const client = new Client()

client
    .setEndpoint(process.env.NEXT_PUBLIC_APP_WRITE_ENDPOINT|| '')
    .setProject(process.env.NEXT_PUBLIC_APP_WRITE_PROJECT_ID || '')

const account = new Account(client)

export { client, account, ID }
