// import jwt from "jsonwebtoken";

// import { ApiError, asyncHandler } from "../utils/index.js";
// import { ACCESS_TOKEN_NAME } from "../constants.js";
// import { userService } from "../services/index.js";
// import { ACCESS_TOKEN_SECRET } from "../config/environment.js";

// const authenticate = asyncHandler(async (req, res, next) => {
//   const accessToken = req.cookies?.[ACCESS_TOKEN_NAME];

//   if (!accessToken) {
//     throw new ApiError(403, "unauthorized, Access token not Provided");
//   }

//   let userId;
//   jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) throw new ApiError(403, "unauthorized, Invalid Access Token");

//     userId = decoded._id;
//   });

//   const user = await userService.getUserDetail(userId);

//   if (!user) throw new ApiError(403, "unauthorized user");

//   req.user = user;

//   next();
// });

// export default authenticate;
