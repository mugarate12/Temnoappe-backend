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
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("./../repositories");
const handleError_1 = require("./../utils/handleError");
class ProductsController {
    constructor() {
        this.setoffSetValue = (page, numberOfItems) => {
            if (page === 1) {
                return 0;
            }
            else {
                return (page - 1) * numberOfItems;
            }
        };
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, photo, description } = req.body;
            return yield repositories_1.productsRepository.create({
                name: String(name),
                photo: String(photo),
                description: String(description)
            })
                .then(() => {
                return res.status(201).json({
                    message: 'product created successful!'
                });
            })
                .catch((error) => {
                return (0, handleError_1.errorHandler)(error, res);
            });
        });
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { numberOfItems, page } = req.query;
            const limit = !!Number(numberOfItems) ? Number(numberOfItems) : undefined;
            const offset = !!Number(page) ? this.setoffSetValue(Number(page), Number(numberOfItems)) : 0;
            return yield repositories_1.productsRepository.index({
                limit,
                offset
            })
                .then(products => {
                return res.status(200).json({
                    data: products
                });
            })
                .catch((error) => {
                return (0, handleError_1.errorHandler)(error, res);
            });
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, photo, description } = req.body;
            return yield repositories_1.productsRepository.update({
                id: Number(id),
                payload: {
                    name: String(name) !== 'undefined' ? String(name) : undefined,
                    photo: String(photo) !== 'undefined' ? String(photo) : undefined,
                    description: String(description) !== 'undefined' ? String(description) : undefined,
                }
            })
                .then(() => {
                return res.status(200).json({
                    message: 'product updated successful!'
                });
            })
                .catch((error) => {
                return (0, handleError_1.errorHandler)(error, res);
            });
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return yield repositories_1.productsRepository.delete({ id: Number(id) })
                .then(() => {
                return res.status(200).json({
                    message: 'product delete successful!'
                });
            })
                .catch((error) => {
                return (0, handleError_1.errorHandler)(error, res);
            });
        });
    }
}
exports.default = ProductsController;
