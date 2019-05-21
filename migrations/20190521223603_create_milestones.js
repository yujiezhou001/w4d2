
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable('milestones', function (table) {
       table.increments('id')
       .primary()
       .unsigned();
       table.string('description').notNullable();
       table.date('date_achieved').notNullable();
       table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('milestones');
};
