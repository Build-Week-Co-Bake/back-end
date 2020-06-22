
exports.seed = function(knex) {
  return knex('users')
    .then(function () {
      return knex('users').insert([
        {
          email: "john@gmail.com",
          name: "John Doe",
          password: "password",
          profile_pic: "",
        },
        {
          email: "jane@aol.com",
          name: "Jane Doe",
          password: "password",
          profile_pic: "",
        },
        {
          email: "jim@hey.com",
          name: "Jim Doe",
          password: "password",
          profile_pic: "",
        },
      ]);
    });
};