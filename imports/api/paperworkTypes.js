import { Mongo } from 'meteor/mongo';

export const PaperworkTypes = new Mongo.Collection('paperworkTypes');


Meteor.methods({
    'PaperworkTypes.increment'(type) {

        PaperworkTypes.update(
            { type: type },
            { $inc: { code: 1 } },
        );
    }
});