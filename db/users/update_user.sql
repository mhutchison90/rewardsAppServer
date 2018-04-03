update users 
    set 
        firstname = $1,
        lastname = $2,
        email = $3,
        picture = $4,
        birthday = $5,
        phone = $6

where userid = $7;