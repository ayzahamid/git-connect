import { Client, Account, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.APP_WRITE_ENDPOINT || '') // Your API Endpoint
    .setProject(process.env.APP_WRITE_PROJECT_ID || ''); // Your project ID

const account = new Account(client);

export { client, account, ID };
