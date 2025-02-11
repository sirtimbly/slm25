// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from "@feathersjs/schema";
import { Type, getValidator, querySyntax } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";

import type { HookContext } from "../../declarations.js";
import { dataValidator, queryValidator } from "../../validators.js";
import type { MissionsService } from "./missions.class.js";
import { userSchema } from "../users/users.schema.js";

// Main data model schema
export const missionsSchema = Type.Object(
	{
		id: Type.String(),
		name: Type.String(),
		userId: Type.Number(),
		user: Type.Ref(userSchema),
		goal: Type.Optional(Type.String()),
		active: Type.Boolean({ default: true }),
		gpx_track: Type.Optional(Type.String()),
		score: Type.Optional(Type.Number()),
		createdAt: Type.Number(),
		final_start: Type.Optional(Type.Tuple([Type.Number(), Type.Number()])),
		final_end: Type.Optional(Type.Tuple([Type.Number(), Type.Number()])),
	},
	{ $id: "Missions", additionalProperties: false },
);
export type Missions = Static<typeof missionsSchema>;
export const missionsValidator = getValidator(missionsSchema, dataValidator);
export const missionsResolver = resolve<Missions, HookContext<MissionsService>>(
	{
		user: virtual(async (mission, context) => {
			return context.app.service("users").get(mission.userId);
		}),
	},
);

export const missionsExternalResolver = resolve<
	Missions,
	HookContext<MissionsService>
>({});

// Schema for creating new entries
export const missionsDataSchema = Type.Pick(
	missionsSchema,
	["name", "goal", "gpx_track", "final_start", "final_end", "userId"],
	{
		$id: "MissionsData",
	},
);
export type MissionsData = Static<typeof missionsDataSchema>;
export const missionsDataValidator = getValidator(
	missionsDataSchema,
	dataValidator,
);
export const missionsDataResolver = resolve<
	Missions,
	HookContext<MissionsService>
>({
	userId: async (_value, _message, context) => {
		// Associate the record with the id of the authenticated user
		return context.params.user?.id;
	},
	createdAt: async () => {
		return Date.now();
	},
});

// Schema for updating existing entries
export const missionsPatchSchema = Type.Partial(missionsSchema, {
	$id: "MissionsPatch",
});
export type MissionsPatch = Static<typeof missionsPatchSchema>;
export const missionsPatchValidator = getValidator(
	missionsPatchSchema,
	dataValidator,
);
export const missionsPatchResolver = resolve<
	Missions,
	HookContext<MissionsService>
>({});

// Schema for allowed query properties
export const missionsQueryProperties = Type.Pick(missionsSchema, [
	"id",
	"name",
	"goal",
	"active",
	"score",
	"userId",
]);
export const missionsQuerySchema = Type.Intersect(
	[
		querySyntax(missionsQueryProperties),
		// Add additional query properties here
		Type.Object({}, { additionalProperties: false }),
	],
	{ additionalProperties: false },
);
export type MissionsQuery = Static<typeof missionsQuerySchema>;
export const missionsQueryValidator = getValidator(
	missionsQuerySchema,
	queryValidator,
);
export const missionsQueryResolver = resolve<
	MissionsQuery,
	HookContext<MissionsService>
>({
	userId: async (value, user, context) => {
		// We want to be able to find all messages but
		// only let a user modify their own messages otherwise
		if (context.params.user && context.method !== "find") {
			return context.params.user.id;
		}

		return value;
	},
});
