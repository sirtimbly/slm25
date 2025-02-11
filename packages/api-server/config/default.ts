import type { ApplicationConfiguration } from "../src/configuration";

const config: Partial<ApplicationConfiguration> & {
	oauth?: Record<string, unknown>;
} = {
	host: "localhost",
	port: 3030,
	public: "./public/",
	origins: ["http://localhost:3030"],
	paginate: {
		default: 10,
		max: 50,
	},
	postgresql: {
		client: "pg",
		connection: "postgres://postgres:postgres@localhost:5433/slm",
	},
	authentication: {
		secret: "abcdefg",
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
	},
};
export default config;
