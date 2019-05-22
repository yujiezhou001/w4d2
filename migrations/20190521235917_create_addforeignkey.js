
exports.up = function(knex, Promise) {
    return knex.schema.table('milestones', function(table) {
        table.integer('famous_person_id').notNull().defaultTo(0);
        table.foreign('famous_person_id').references('id').on('famous_people').onDelete('cascade');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('milestones', function(table) {
        table.dropColumn('famous_person_id');
    });
};
