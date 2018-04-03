module.exports = {
    newOrder: (req, res, next) => {
        const db = req.app.get('db');
        var { userid, total, orderdate, paymentType } = req.body;
        if(paymentType.toUpperCase() === 'REWARDS'){
            console.log('REWARDS')
            db.orders.add_order_rewards([userid, total, orderdate, paymentType])
            .then(user => res.status(200).send(req.body))
        .catch((err) => res.status(500).send(console.log('error:', err)));
        }else{
            console.log('CARD')
            db.orders.add_order_card([userid, total, orderdate, paymentType])
            .then(user => res.status(200).send(req.body))
        .catch((err) => res.status(500).send(console.log('error:', err)));
        }        
      },

};


