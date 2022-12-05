const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const { data } = req.user;
        if (!data.role) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        // console.log(`roles that are allowed`, rolesArray); 
        // console.log(`roles from jwt access token`, data.role); 
        const userRoles = Object.values(data.role)
        const result = userRoles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;