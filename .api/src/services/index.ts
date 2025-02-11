import { missions } from "./missions/missions.js";
import { user } from "./users/users.js";
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from "../declarations.js";

export const services = (app: Application) => {
	app.configure(missions);
	app.configure(user);
	// All services will be registered here
};
