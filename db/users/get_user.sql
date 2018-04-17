-- SELECT 
-- u.userid,
-- u.firstname,
-- u.lastname,
-- u.email,
-- u.picture,
-- u.auth_id,
-- u.birthday,
-- u.phone,
-- u.pointBalance,

-- -- (SELECT SUM(floor(total::money::numeric))
-- -- FROM orders
-- -- WHERE userid = $1) as pointBalance,

-- json_agg(json_build_object(
-- 'orderid', o.orderid,
-- 'userid', o.userid,
-- 'total', o.total,
-- 'orderdate',o.orderdate
-- )) AS orders


-- FROM users as u
-- INNER JOIN orders as o ON u.userid = o.userid
-- Where u.auth_id= $1
-- group by u.userid,
-- u.firstname,
-- u.lastname,
-- u.email,
-- u.picture,
-- u.auth_id,
-- u.birthday,
-- u.phone,
-- u.pointbalance;




SELECT
u.userid,
u.firstname,
u.lastname,
u.email,
u.picture,
u.auth_id,
u.birthday,
u.phone,
u.pointBalance,
    CASE  get_num_of_orders($1)
    WHEN 0 THEN 
    '[]'
   ELSE
(SeleCT 
   json_agg(json_build_object(
    'orderid', o.orderid,
    'userid', o.userid,
    'total', o.total,
    'orderdate',o.orderdate
    ))
    from orders as o
    INNER JOIN users as u ON o.userid = u.userid
where u.auth_id= $1)
    END AS orders
    from users as u
-- INNER JOIN orders as o ON u.userid = o.userid
Where u.auth_id= $1
group by u.userid,
u.firstname,
u.lastname,
u.email,
u.picture,
u.auth_id,
u.birthday,
u.phone,
u.pointbalance;
