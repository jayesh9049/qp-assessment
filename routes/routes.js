"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admincontroller = require('../src/controller/admincontroller.ts');
module.exports = function routes(app) {
    app.post('/addGroceries', admincontroller.addGroceries);
};
