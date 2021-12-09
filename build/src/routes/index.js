"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsRoutes_1 = __importDefault(require("./productsRoutes"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    return res.status(201).json({
        message: 'ok'
    });
});
(0, productsRoutes_1.default)(router);
exports.default = router;
