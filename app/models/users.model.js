import sql from './db.js';

const User = (user) => {
  this.uName = user.uName;
  this.email = user.email;
  this.fName = user.fName;
}

User.create = (newUser, result) => {
  sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.log(`ERROR: ${err}`);
      result(err, null);
      return;
    }

    console.log(`User created: ${{ id: res.uid, ...newUser }}`);
    result(null, { id: res.uid, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(`Error: ${err}`);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log(`found user: ${res[0]}`);
      result(null, res[0]);
      return;
    }

    result({ kind: 'not_found' }, null);
  });
};

User.getAll = (userName, result) => {
  let query = 'SELECT * FROM users';

  if (userName) {
    query += `WHERE userName LIKE '%${userName}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log(`Error: ${err}`);
      result(null, err);
      return;
    }

    console.log(`tutorial: ${res}`);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query('UPDATE user SET uName = ?, email = ?, fName = ? WHERE id = ?',
    [user.uName, user.email, user.fName, id]),
    (err, res) => {
      if (err) {
        console.log(`Error: ${err}`);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log(`Updated user: ${{ id: id, ...user }}`);
    }
}

module.exports = User;
