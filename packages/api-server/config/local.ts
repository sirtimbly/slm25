import type { ApplicationConfiguration } from "../src/configuration";

const config: Partial<ApplicationConfiguration> = {
	postgresql: {
		client: "pg",
		connection: "postgres://postgres:e2bSSXH1dsDE9tQP@ds923plus.local:5433/slm",
	},
	authentication: {
		entity: "user",
		service: "users",
		authStrategies: ["jwt", "local"],
		jwtOptions: {
			header: {
				typ: "access",
			},
			audience: "https://yourdomain.com",
			algorithm: "HS256",
			expiresIn: "1d",
		},
		local: {
			usernameField: "email",
			passwordField: "password",
			errorMessage: "Unable to log in",
		},
		secret: "18GHqz9vLoY4m865jk3ZXQvcBbydupd9",
		oauth: {},
	},
};
export default config;
