import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import stripe from '@/config/stripe';

export async function POST(req: NextRequest, res: NextResponse) {
  const headersList = headers();
  const origin = headersList.get('origin');

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price: 'price_1P405j05xPAER8V0FZ46vU4m',
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const session_id = url.searchParams.get('session_id');

  try {
    if (session_id != null) {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.customer_details) {
        return NextResponse.json({
          status: session.status,
          customer_email: session.customer_details.email,
        });
      }
    }
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message });
  }
}
