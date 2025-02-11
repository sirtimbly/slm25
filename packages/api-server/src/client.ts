// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from "@feathersjs/feathers";
import type { TransportConnection, Application } from "@feathersjs/feathers";
import authenticationClient from "@feathersjs/authentication-client";
import type { AuthenticationClientOptions } from "@feathersjs/authentication-client";

import { missionsClient } from "./services/missions/missions.shared.js";
export type {
	Missions,
	MissionsData,
	MissionsQuery,
	MissionsPatch,
} from "./services/missions/missions.shared.js";

import { userClient } from "./services/users/users.shared.js";
export type {
	User,
	UserData,
	UserQuery,
	UserPatch,
} from "./services/users/users.shared.js";

export interface Configuration {
	connection: TransportConnection<ServiceTypes>;
}

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>;

/**
 * Returns a typed client for the server app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = unknown>(
	connection: TransportConnection<ServiceTypes>,
	authenticationOptions: Partial<AuthenticationClientOptions> = {},
) => {
	const client: ClientApplication = feathers();

	client.configure(connection);
	client.configure(authenticationClient.default(authenticationOptions));
	client.set("connection", connection);

	client.configure(userClient);
	client.configure(missionsClient);
	return client;
};
