"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnection_1 = require("./database/dbConnection");
const globalError_1 = require("./src/middleware/globalError");
const auth_routes_1 = __importDefault(require("./src/modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./src/modules/user/user.routes"));
const post_routes_1 = __importDefault(require("./src/modules/posts/post.routes"));
const comment_routes_1 = __importDefault(require("./src/modules/comment/comment.routes"));
const like_routes_1 = __importDefault(require("./src/modules/likes/like.routes"));
const app = (0, express_1.default)();
const port = 3000;
(0, dbConnection_1.dbConnection)();
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.default);
app.use('/users', user_routes_1.default);
app.use('/posts', post_routes_1.default);
app.use('/comments', comment_routes_1.default);
app.use('/likes', like_routes_1.default);
app.use(globalError_1.globalError);
app.get("/", (req, res) => {
    res.json({ message: "Success" });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
