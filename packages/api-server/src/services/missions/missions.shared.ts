// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from "@feathersjs/feathers";
import type { ClientApplication } from "../../client.js";
import type {
	Missions,
	MissionsData,
	MissionsPatch,
	MissionsQuery,
	MissionsService,
} from "./missions.class.js";

export type { Missions, MissionsData, MissionsPatch, MissionsQuery };

export type MissionsClientService = Pick<
	MissionsService<Params<MissionsQuery>>,
	(typeof missionsMethods)[number]
>;

export const missionsPath = "missions";

export const missionsMethods: Array<keyof MissionsService> = [
	"find",
	"get",
	"create",
	"patch",
	"remove",
];

export const missionsClient = (client: ClientApplication) => {
	const connection = client.get("connection");

	client.use(missionsPath, connection.service(missionsPath), {
		methods: missionsMethods,
	});
};

// Add this service to the client service type index
declare module "../../client.js" {
	interface ServiceTypes {
		[missionsPath]: MissionsClientService;
	}
}
