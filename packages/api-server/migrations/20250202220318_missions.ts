import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.schema
		.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
		.createTable("missions", (table) => {
			table.uuid("id").primary().defaultTo(knex.raw("uuidv7()"));
			table.timestamps(true, true);
			table.bigint("userId").references("id").inTable("users");
			table.text("name");
			table.text("goal");
			table.boolean("active");
			table.text("gpx_track");
			table.decimal("score");
			table.point("final_start");
			table.point("final_end");
		});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable("missions");
}
