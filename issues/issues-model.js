const db = require('../data/dbConfig');

// NEED TO ADD:
// ISSUE.IMAGE
// ISSUE.HOA

// GET ALL ISSUES
function find() {
  return db('issues')
    .join('users', 'user_id', 'users.id')
    .select('issues.id', 'issues.title', 'issues.description', 'issues.city', 'issues.hoa', 'issues.image', 'issues.upvotes', 'issues.created_on', 'users.profile_pic', 'users.name')
    .orderBy('issues.id');
}

function findBy(city) {
  return db('issues')
    .where('city', city.replace(new RegExp("\\+","g"),' '))
    .join('users', 'users.id', 'issues.user_id')
    .select('issues.id', 'issues.title', 'issues.description', 'issues.city', 'issues.hoa', 'issues.image', 'issues.upvotes', 'issues.created_on', 'users.profile_pic', 'users.name')
    .orderBy('issues.id');
}

// GET ISSUE BY ID
function findById(id) {
  return db('issues')
    .where('issues.id', id)
    .join('users', 'users.id', 'issues.user_id')
    .select('issues.id', 'issues.title', 'issues.description', 'issues.city', 'issues.hoa', 'issues.image', 'issues.upvotes', 'issues.created_on', 'users.profile_pic', 'users.name')
    .first();
}

// GET ISSUE BY USER_ID
function findByUserId(id) {
  return db('users')
    .where('users.id', id)
    .join('issues', 'issues.user_id', 'users.id')
    .select('issues.id', 'issues.title', 'issues.description', 'issues.city', 'issues.hoa', 'issues.image', 'issues.upvotes', 'issues.created_on')
}

// POST ISSUE
function add(issue) {
  return db('issues')
    .insert(issue, 'id')
    .then(ids => findById(ids[0]))
    .catch(err => console.log(err))
}

// PUT ISSUE
function edit(issue, id) {
  return db('issues')
    .where({ id })
    .update(issue)
    .then(ids => {
      return findById(id)
    })
}

// DELETE ISSUE
function remove(id) {
  return db('issues')
    .where({ id })
    .del()
}

module.exports = {
  find,
  findBy,
  findById,
  findByUserId,
  add,
  edit,
  remove
};