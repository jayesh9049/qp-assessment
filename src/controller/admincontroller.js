"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGroceries = exports.getGroceries = exports.updateGroceries = exports.addGroceries = void 0;
function addGroceries(req, res) {
    console.log('req = ', req);
    console.log('Adding Groceries ');
}
exports.addGroceries = addGroceries;
function updateGroceries(req, res) {
    console.log('update Groceries ');
    res.status(200).send('Groceries updated successfully');
}
exports.updateGroceries = updateGroceries;
function getGroceries(req, res) {
    console.log('get Groceries ');
    res.status(200).send('Fetch all Groeries');
}
exports.getGroceries = getGroceries;
function removeGroceries() {
    console.log('Remove Groceries ');
}
exports.removeGroceries = removeGroceries;
