
exports.up = function (knex) {
    return knex.schema
        .createTable('demo_pages', (table) => {
            table.increments('id').primary();
            table.string('url', 500).notNullable();
            table.string('head_title', 500);
            table.text('head_description');
            table.string('text_title', 500);
            table.text('text_paragraph');
        })
        .createTable('demo_images', (table) => {
            table.increments('id').primary();
            table.string('url', 3000).notNullable();
            table.string('img_key', 3072).notNullable();
            table.integer('page_id').unsigned().notNullable();
            table.foreign('page_id')
                .references('demo_pages.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('demo_images').dropTable('demo_pages');
};
