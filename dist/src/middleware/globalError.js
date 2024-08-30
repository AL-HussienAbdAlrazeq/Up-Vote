"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const globalError = (err, req, res, next) => {
    let code = err.statusCode || 500;
    res.status(code).json({ error: "error", message: err.message, code });
};
exports.globalError = globalError;
