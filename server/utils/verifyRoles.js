const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const { data } = req.user;
        console.log(data);
        if (!data.role) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(rolesArray); // roles that are allowed
        console.log(data.role); //roles from jwt
        const userRoles = Object.values(data.role)
        console.log(userRoles)
        //const result = data.role.map(role => rolesArray.includes(role)).find(val => val === true);
        const result = rolesArray.includes(userRoles).find(val => val === true);
        console.log(result)
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;