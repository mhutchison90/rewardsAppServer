module.exports = {

    getUser: (req, res, next) => {
        const db = req.app.get('db');
        const { params } = req;
    
        db.get_user([params.id])
          .then(user => res.status(200).send(user[0]))
          .catch(() => res.status(500).send());
      },

      updateUser: (req, res, next) => {
        const db = req.app.get('db');
        var { firstname, lastname, email, picture, birthday, phone } = req.body;
        var { userid } = req.params;
        db.update_user([firstname, lastname, email, picture, birthday, phone, req.params.id[0]])
        .then(user => res.status(200).send(req.body))
        .catch((err) => res.status(500).send(console.log('error:', err)));
      }

};


