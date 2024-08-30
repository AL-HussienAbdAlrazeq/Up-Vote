"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const AppError_1 = require("../utils/AppError");
const validation = (schema) => {
    return (req, res, next) => {
        let data = Object.assign(Object.assign(Object.assign({}, req.body), req.params), req.query);
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            let errMsg = error.details.map((err) => { return err.message; });
            return next(new AppError_1.AppError(errMsg, 401));
        }
        next();
    };
};
exports.validation = validation;
