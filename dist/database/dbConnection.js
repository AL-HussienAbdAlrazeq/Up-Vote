"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = dbConnection;
const mongoose_1 = require("mongoose");
function dbConnection() {
    (0, mongoose_1.connect)("mongodb://localhost:27017/Upvote").
        then(() => {
        console.log("Database Connected Successfully");
    }).catch(() => {
        console.log("Database Error");
    });
}
