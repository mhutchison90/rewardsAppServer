module.exports = {
    newOrder: (req, res, next) => {
        const db = req.app.get('db');
        var { userid, total, orderdate, paymentType } = req.body;
        let authID = 0
        db.users.get_user_info([req.body.userid]).then(user=>{
            authID = user[0].auth_id
        }).then(()=>{
            if (paymentType.toUpperCase() === 'REWARDS') {
                console.log('REWARDS')
                db.orders.add_order_rewards([userid, total, orderdate, paymentType])
                .then(user => {
                    console.log(authID)
                    db.users.get_user(authID)
                    // console.log('user',user[0])
                        .then(userInfo => res.status(200).send(userInfo[0]))
                        .catch((err) => res.status(500).send(console.log('error:', err)));
                })
            } else {
                console.log('CARD')
                db.orders.add_order_card([userid, total, orderdate, paymentType])
                .then(user => {
                    console.log(authID)
                    db.users.get_user(authID)
                    // console.log('user',user[0])
                        .then(userInfo => res.status(200).send(userInfo[0]))
                        .catch((err) => res.status(500).send(console.log('error:', err)));
                })
            }
        })
                
    },

};


