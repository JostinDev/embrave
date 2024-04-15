export default function client(endpoint, {body, ...customConfig} = {}) {
	const headers = {'content-type': 'application/json', 'Credentials': 'include'}
	const config = {
		method: body ? 'POST' : 'GET',
		...customConfig,
		headers: {
			...headers,
			...customConfig.headers,
		},
	}
	if (body) {
		config.body = JSON.stringify(body)
	}

	return window
			.fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/${endpoint}`, config)
			.then(async response => {
				if (response.status === 401) {
					await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/logout`, {
						method:'POST'
					})
					return
				}
				if (response.ok) {
					return await response.json()
				} else {
					const errorMessage = await response.text()
					return Promise.reject(new Error(errorMessage))
				}
			})
}

