import express, {Application} from 'express'
import * as admincontroller from "../src/controller/admincontroller.ts";

module.exports = function routes(app:Application) {
    app.post('/addGroceries',admincontroller.addGroceries),
    app.post('/updateGroceriesPrice',admincontroller.updateGroceriesPrice),
    app.get('/getAllGroceries',admincontroller.getAllGroceries),
    app.post('/removeGroceries',admincontroller.removeGroceries)
    app.post('/bookGroceries',admincontroller.bookGroceries)
}
