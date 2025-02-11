import rest from "@feathersjs/rest-client";
import { createClient } from "@slm/api-client";

const app = createClient(rest("http://localhost:3030/").fetch(fetch));

/**
 *
 * @returns Missions
 */
export const useMissions = () => {
	const missionsApi = app.service("missions");
	return { missions: missionsApi };
};
