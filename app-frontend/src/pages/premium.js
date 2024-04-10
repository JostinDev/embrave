import '../app/globals.css';
import {useEffect, useState} from "react";
import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {EmbeddedCheckoutProvider, EmbeddedCheckout} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Premium() {

	const fetchClientSecret = useCallback(() => {
		// Create a Checkout Session
		return fetch("/api/checkout_sessions", {
			method: "POST",
		})
				.then((res) => res.json())
				.then((data) => data.clientSecret);
	}, []);

	const options = {fetchClientSecret};

	useEffect(() => {

	}, []);


	async function saveUser() {
		const data = { username: name};
		const response = await fetch("/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		await response.json().then((response) => {
					console.log(response)
				}
		);

	}


	return (
			<div className="mt-10">
				<p className='text-sand-12 text-title1 mb-4'>Get Embrave Premium</p>
				<p className='text-sand-12 text-body-l-medium mb-4'>
					All users get 3 credits upon creating an account. Creating or joining a room costs 1 credit.
				</p>

				<p className='text-sand-12 text-body-l-medium mb-4'>
					Get Embrave premium now for unlimited credits
				</p>

				<div id="checkout">
					<EmbeddedCheckoutProvider
							stripe={stripePromise}
							options={options}
					>
						<EmbeddedCheckout/>
					</EmbeddedCheckoutProvider>
				</div>


			</div>
	)
}
