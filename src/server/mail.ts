import { auth } from '@clerk/nextjs/server';
import formdata from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formdata);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_SECRET || '',
  url: 'https://api.eu.mailgun.net',
});

export async function sendBuyConfirmationPremium(to: string) {
  auth().protect();
  mg.messages
    .create('mg.embrave.app', {
      from: 'Embrave <mailgun@mg.embrave.app>',
      to: [to],
      subject: 'Thank you for your purchase!',
      text: 'Testing some Mailgun awesomeness!',
      html: '<h1 class="text-green-9">Thanks for buying premium!</h1>',
    })
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err));
}

export async function sendBuyConfirmationCredits(to: string) {
  auth().protect();
  mg.messages
    .create('mg.embrave.app', {
      from: 'Embrave <mailgun@mg.embrave.app>',
      to: [to],
      subject: 'Thank you for your purchase!',
      text: 'Testing some Mailgun awesomeness!',
      html: '<h1 class="text-green-9">Thanks for buying more credits!</h1>',
    })
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err));
}
