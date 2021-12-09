"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const controllers_1 = require("./../controllers");
function productsRoutes(router) {
    router.post('/products', (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            name: celebrate_1.Joi.string().required(),
            photo: celebrate_1.Joi.string().required(),
            description: celebrate_1.Joi.string().required()
        })
    }), controllers_1.productsController.create);
    router.get('/products', (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object().keys({
            page: celebrate_1.Joi.number().optional().min(1),
            numberOfItems: celebrate_1.Joi.number().optional().min(1)
        })
    }), controllers_1.productsController.index);
    router.put('/products/:id', (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object().keys({
            id: celebrate_1.Joi.number().required()
        }),
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
            name: celebrate_1.Joi.string().optional(),
            photo: celebrate_1.Joi.string().optional(),
            description: celebrate_1.Joi.string().optional()
        })
    }), controllers_1.productsController.update);
    router.delete('/products/:id', (0, celebrate_1.celebrate)({
        [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object().keys({
            id: celebrate_1.Joi.number().required()
        })
    }), controllers_1.productsController.delete);
}
exports.default = productsRoutes;
