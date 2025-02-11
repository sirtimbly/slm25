// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import knex from "knex";
import type { Knex } from "knex";
import type { Application } from "./declarations.js";

declare module "./declarations.js" {
	interface Configuration {
		postgresqlClient: Knex;
	}
}

export const postgresql = (app: Application) => {
	const config = app.get("postgresql");
	if (!config) {
		throw Error("DB Config Not Set");
	}
	const db = knex(config);

	app.set("postgresqlClient", db);
};
