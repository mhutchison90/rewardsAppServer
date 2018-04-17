module.exports = {

  getUser: (req, res, next) => {
    const db = req.app.get('db');
    const { params } = req;

    db.users.get_user([params.id])
      .then(user => res.status(200).send(user[0]))
      .catch(() => res.status(500).send());
  },

  updateUser: (req, res, next) => {
    const db = req.app.get('db');
    var { firstname, lastname, email, picture, birthday, phone } = req.body;
    var { userid } = req.params;
    db.users.update_user([firstname, lastname, email, picture, birthday, phone, req.params.id[0]])
      .then(user => res.status(200).send(req.body))
      .catch((err) => res.status(500).send(console.log('error:', err)));
  },
  checkUser: (req, res, next) => {
    const db = req.app.get('db');
    const { params } = req.params;
    const {givenName, familyName, email, picture, sub } = req.body;
    // console.log('checking!', 'body',req.body,'params',req.params)
    // console.log(req.body)

    db.users.auth.find_user([req.body.sub]).then(user => {
      if (user[0]) { // if auth id num is found in DB sends get user sql query results back as the response
        console.log("OLD USER", user[0])


    db.users.get_user([req.body.sub])
    .then(user => res.status(200).send(user[0]))
    .catch(() => res.status(500).send());

      }
      else{
        console.log("NEW USER")
        db.users.auth.create_authed_user([givenName, familyName, email, picture, sub ])
        .then(user => res.status(200).send(user[0]))
        .catch(() => res.status(500).send());
      }
    // }).then(user => res.status(200).send(user))
  //   db.users.find_user([req.params])
  //     .then(console.log)
  //     .catch(() => res.status(500).send());
  })
}
};


