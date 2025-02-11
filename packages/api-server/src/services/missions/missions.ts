// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from "@feathersjs/authentication";

import { hooks as schemaHooks } from "@feathersjs/schema";

import {
	missionsDataValidator,
	missionsPatchValidator,
	missionsQueryValidator,
	missionsResolver,
	missionsExternalResolver,
	missionsDataResolver,
	missionsPatchResolver,
	missionsQueryResolver,
} from "./missions.schema.js";

import type { Application } from "../../declarations.js";
import { MissionsService, getOptions } from "./missions.class.js";
import { missionsPath, missionsMethods } from "./missions.shared.js";

export * from "./missions.class.js";
export * from "./missions.schema.js";

// A configure function that registers the service and its hooks via `app.configure`
export const missions = (app: Application) => {
	// Register our service on the Feathers application
	app.use(missionsPath, new MissionsService(getOptions(app)), {
		// A list of all methods this service exposes externally
		methods: missionsMethods,
		// You can add additional custom events to be sent to clients here
		events: [],
	});
	// Initialize hooks
	app.service(missionsPath).hooks({
		around: {
			all: [
				authenticate("jwt"),
				schemaHooks.resolveExternal(missionsExternalResolver),
				schemaHooks.resolveResult(missionsResolver),
			],
		},
		before: {
			all: [
				schemaHooks.validateQuery(missionsQueryValidator),
				schemaHooks.resolveQuery(missionsQueryResolver),
			],
			find: [],
			get: [],
			create: [
				schemaHooks.validateData(missionsDataValidator),
				schemaHooks.resolveData(missionsDataResolver),
			],
			patch: [
				schemaHooks.validateData(missionsPatchValidator),
				schemaHooks.resolveData(missionsPatchResolver),
			],
			remove: [],
		},
		after: {
			all: [],
		},
		error: {
			all: [],
		},
	});
};

// Add this service to the service type index
declare module "../../declarations.js" {
	interface ServiceTypes {
		[missionsPath]: MissionsService;
	}
}
