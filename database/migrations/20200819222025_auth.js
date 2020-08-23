exports.up = function (knex) {
    return knex.schema
      .createTable("roles", tbl => {
        tbl.increments();
        tbl.string("name", 128).notNullable().unique();
      })
      .createTable("users", tbl => {
        tbl.increments();
        tbl.string("username", 128).notNullable().unique().index();
        tbl.string("email", 128).notNullable().unique().index();
        tbl.string("password", 256).notNullable();
        tbl.string("location", 128);
        tbl.string("locationGPS", 128);
        tbl
          .integer("role")
          .notNullable()
          .unsigned()
          .references("roles.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
      .createTable("trucks", tbl => {
        tbl.increments();
        tbl.string("imageURL", 128).notNullable().unique();
        tbl.string("cuisineType", 128).notNullable();
        tbl.string("location", 128);
        tbl.string("locationGPS", 128);
        tbl.datetime("departureTime");
        tbl.integer("customerRatingAvg").unsigned();
        tbl
          .string("username")
          .notNullable()
          .unsigned()
          .references("users.username")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
      .createTable("truckratings", tbl => {
        tbl.increments();
        tbl.integer("rating").unsigned();
        tbl
          .integer("truckid")
          .notNullable()
          .unsigned()
          .references("trucks.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
        tbl
          .string("username")
          .notNullable()
          .unsigned()
          .references("users.username")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
      .createTable("menuitems", tbl => {
        tbl.increments();
        tbl.string("itemName", 128).notNullable();
        tbl.string("itemDescription", 128);
        tbl.float("itemPrice").notNullable();
        tbl.integer("customerRatingAvg").unsigned();
        tbl
          .integer("truckid")
          .notNullable()
          .unsigned()
          .references("trucks.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
      .createTable("menuitemratings", tbl => {
        tbl.increments();
        tbl.integer("rating").unsigned();
        tbl
          .integer("menuitemid")
          .notNullable()
          .unsigned()
          .references("menuitems.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
        tbl
          .string("username")
          .notNullable()
          .unsigned()
          .references("users.username")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
      .createTable("menuitemphotos", tbl => {
        tbl.increments();
        tbl.string("photoURL").notNullable().unique();
        tbl
          .integer("menuitemid")
          .notNullable()
          .unsigned()
          .references("menuitems.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
      .createTable("dinerfavouritetrucks", tbl => {
        tbl.integer("userid")
          .notNullable()
          .unsigned()
          .references("users.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
        tbl.integer("truckid")
          .notNullable()
          .unsigned()
          .references("trucks.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
        tbl.primary(['userid', 'truckid']);
      });
  };
  
  exports.down = function (knex) {
    return ( 
            knex.schema
              .dropTableIfExists('dinerfavouritetrucks')
              .dropTableIfExists('menuitemphotos')
              .dropTableIfExists('menuratings')
              .dropTableIfExists('menuitems')
              .dropTableIfExists('truckratings')
              .dropTableIfExists('trucks')
              .dropTableIfExists('menuitemphotos')
              .dropTableIfExists('users')
              .dropTableIfExists('roles')
    );
  };