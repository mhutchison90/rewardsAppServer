SELECT 
u.userid,
u.firstname,
u.lastname,
u.email,
u.picture,
u.auth_id,
u.birthday,
u.phone,

(SELECT SUM(floor(total::money::numeric))
FROM orders
WHERE userid = $1) as pointBalance,

json_agg(json_build_object(
'orderid', o.orderid,
'userid', o.userid,
'total', o.total,
'orderdate',o.orderdate
)) AS orders


FROM users as u
INNER JOIN orders as o ON u.userid = o.userid
Where u.userid = $1
group by u.userid,
u.firstname,
u.lastname,
u.email,
u.picture,
u.auth_id,
u.birthday,
u.phone,
u.pointbalance;

