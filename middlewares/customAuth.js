// exports.isCompany = (req, res, next) => {
//   console.log(req.payload);
//   if (req.payload.role === "parent" || req.payload.role === "sitter") {
//     return res.status(403).json({
//       message: "You are not COMPANY, Access denied",
//     });
//   }
//   next();
// };

// exports.isParent = (req, res, next) => {
//   if (req.payload.role === "company" || req.payload.role === "sitter") {
//     return res.status(403).json({
//       message: "You are not PARENT, Access denied",
//     });
//   }
//   next();
// };

// exports.isSitter = (req, res, next) => {
//   if (req.payload.role === "company" || req.payload.role === "parent") {
//     return res.status(403).json({
//       message: "You are not SITTER, Access denied",
//     });
//   }
//   next();
// };

exports.isBookingRole = (req, res, next) => {
  if (req.payload.role === "sitter") {
    return res.status(403).json({
      status: 403,
      message: "You are not Company/Parent, Access denied",
    });
  }
  next();
};
