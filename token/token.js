const token = req.headers.authorization.split(" ")[1];
const decodedToken = jwt.verify(token, process.env.JWT_KEY);
const userId = decodedToken.userId;
const role = decodedToken.role;
