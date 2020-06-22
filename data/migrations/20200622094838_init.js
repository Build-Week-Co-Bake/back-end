
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('email', 128)
        .notNullable()
        .unique()
        .index();
      tbl.string('name', 128)
        .notNullable();
      tbl.string('password', 128)
        .notNullable();
      tbl.string('profile_pic');
    })

    .createTable('issues', tbl => {
      tbl.increments();
      tbl.string('title', 128)
        .notNullable()
        .index();
      tbl.string('description')
        .notNullable();
      tbl.string('city')
        .notNullable();
      tbl.string('hoa');
      tbl.string('image');
      tbl.integer('upvotes')
        .defaultTo(0);
      tbl.string('created_on');
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('issues')
    .dropTableIfExists('users')
};
