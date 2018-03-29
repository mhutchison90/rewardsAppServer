module.exports = {

    getUser: (req, res, next) => {
        const db = req.app.get('db');
        const { params } = req;
    
        db.get_user([params.id])
          .then(user => res.status(200).send(user[0]))
          .catch(() => res.status(500).send());
      }

};

