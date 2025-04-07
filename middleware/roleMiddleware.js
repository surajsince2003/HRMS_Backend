// middleware/roleMiddleware.js
const roleMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming 'role' is part of the JWT payload

    if (requiredRoles.includes(userRole)) {
        next(); // User has one of the required roles
    } else {
        res.status(403).json({ message: "Forbidden: You don't have the required permissions" });
    }
};
  };
  
  module.exports = roleMiddleware;
  