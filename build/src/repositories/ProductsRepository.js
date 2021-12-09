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
const handleError_1 = require("./../utils/handleError");
const connection = require('./../database');
const { PRODUCTS_TABLE_NAME } = require('./../database/types');
class ProductsRepository {
    constructor() {
        this.reference = () => connection(PRODUCTS_TABLE_NAME);
        this.create = ({ name, photo, description }) => __awaiter(this, void 0, void 0, function* () {
            return yield this.reference()
                .insert({ name, photo, description })
                .then(() => {
                return true;
            })
                .catch(error => {
                throw new handleError_1.AppError('Database Error', 406, error.message, true);
            });
        });
        this.index = ({}) => __awaiter(this, void 0, void 0, function* () {
            return yield this.reference()
                .select('*')
                .then(products => products)
                .catch(error => {
                throw new handleError_1.AppError('Database Error', 406, error.message, true);
            });
        });
        this.update = ({ id, payload }) => __awaiter(this, void 0, void 0, function* () {
            let query = this.reference();
            let updatePayload = {};
            if (!!payload.name) {
                updatePayload.name = payload.name;
            }
            if (!!payload.photo) {
                updatePayload.photo = payload.photo;
            }
            if (!!payload.description) {
                updatePayload.description = payload.description;
            }
            return yield query
                .update(Object.assign({}, updatePayload))
                .where({ id: id })
                .then(() => {
                return true;
            })
                .catch(error => {
                throw new handleError_1.AppError('Database Error', 406, error.message, true);
            });
        });
        this.delete = ({ id }) => __awaiter(this, void 0, void 0, function* () {
            return yield this.reference()
                .where('id', '=', id)
                .delete()
                .then(() => {
                return true;
            })
                .catch(error => {
                throw new handleError_1.AppError('Database Error', 406, error.message, true);
            });
        });
    }
}
exports.default = ProductsRepository;
