
exports.seed = function(knex) {
  return knex('issues')
    .then(function () {
      return knex('issues').insert([
        {
          title: "Leaking Fire Hydrant",
          description: "On the corner of 5th Ave., gushing out water nonstop",
          city: "los angeles",
          hoa: "",
          image: "",
          upvotes: 10,
          created_on: "June 11th, 2020",
          user_id: 1,
        },
        {
          title: "Fallen Tree",
          description: "Next to the elementary school",
          city: "santa barbara",
          hoa: "",
          image: "",
          upvotes: 7,
          created_on: "May 20th, 2020",
          user_id: 2,
        },
        {
          title: "Faulty Traffic Light",
          description: "Right before Baker St.",
          city: "san francisco",
          hoa: "",
          image: "",
          upvotes: 1,
          created_on: "January 22nd, 2020",
          user_id: 3,
        }
    ]);
    });
};