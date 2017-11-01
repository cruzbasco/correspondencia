import { Mongo } from 'meteor/mongo';

export const Departments = new Mongo.Collection('departments');


Meteor.methods({
    'Departments.addPerson'(departmentName,personId) {
        Departments.update(
            { "name": departmentName },
            { $addToSet: { "people": personId} },
        );
    },
    'Departments.removePerson'(departmentName, personId) {
        Departments.update(
            { "name": departmentName },
            { $pull: { "people": personId} },
        );
    }
});