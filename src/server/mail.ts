import { auth } from '@clerk/nextjs/server';
import formdata from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formdata);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_SECRET || '',
  url: process.env.MAILGUN_URL || 'https://api.eu.mailgun.net',
});

export async function sendBuyConfirmationPremium(to: string) {
  auth().protect();
  mg.messages
    .create(process.env.MAILGUN_DOMAIN || 'mg.embrave.app', {
      from: 'Embrave <hello@embrave.app>',
      to: [to],
      subject: 'Thank you for your purchase!',
      template: 'subscription',
    })
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err));
}

export async function sendBuyConfirmationCredits(to: string) {
  auth().protect();
  mg.messages
    .create(process.env.MAILGUN_DOMAIN || 'mg.embrave.app', {
      from: 'Embrave <hello@embrave.app>',
      to: [to],
      subject: 'Thank you for your purchase!',
      template: 'credits',
    })
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err));
}
