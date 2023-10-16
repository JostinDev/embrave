/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		loginUrl: 'http://localhost:8080/oauth2/authorization/auth0',
		logoutUrl: 'http://localhost:8080/logout',
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.googleusercontent.com",
				port: "",
				pathname: "/a/**",
			}
		],
	},
	webpack: (config) => {
		config.resolve = {
			...config.resolve,
			fallback: {
				fs: false,
			},
		};
		return config;
	},
};

module.exports = nextConfig


