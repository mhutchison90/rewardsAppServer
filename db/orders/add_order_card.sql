insert into orders(
    userid, total, orderdate, paymentType
    )values(
        $1, $2, $3, $4
);
UPDATE users
SET pointbalance = pointbalance + floor($2::money::numeric)
where userid = $1;