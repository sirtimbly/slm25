// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from "@feathersjs/feathers";
import { KnexService } from "@feathersjs/knex";
import type { KnexAdapterParams, KnexAdapterOptions } from "@feathersjs/knex";

import type { Application } from "../../declarations.js";
import type {
	Missions,
	MissionsData,
	MissionsPatch,
	MissionsQuery,
} from "./missions.schema.js";

export type { Missions, MissionsData, MissionsPatch, MissionsQuery };

export interface MissionsParams extends KnexAdapterParams<MissionsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class MissionsService<
	ServiceParams extends Params = MissionsParams,
> extends KnexService<Missions, MissionsData, MissionsParams, MissionsPatch> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
	return {
		paginate: app.get("paginate"),
		Model: app.get("postgresqlClient"),
		name: "missions",
	};
};
