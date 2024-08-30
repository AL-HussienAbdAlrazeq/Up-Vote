"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = catchError;
function catchError(callback) {
    return (req, res, next) => {
        callback(req, res, next).catch((error) => {
            next(error);
        });
    };
}
