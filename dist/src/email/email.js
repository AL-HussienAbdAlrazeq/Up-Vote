"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailHtml_1 = require("./emailHtml");
const sendEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "hessenabdalrazek1@gmail.com",
            pass: "okwk pxjv uwio plaj",
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
    });
    jsonwebtoken_1.default.sign({ email }, "my-secret-key", { expiresIn: "5m" }, (err, token) => __awaiter(void 0, void 0, void 0, function* () {
        const info = yield transporter.sendMail({
            from: '"Up-Vote" <hessenabdalrazek1@gmail.com>',
            to: email,
            subject: "🧙‍♂️Verify Account",
            html: (0, emailHtml_1.emailHtml)(token),
        });
    }));
});
exports.sendEmail = sendEmail;
