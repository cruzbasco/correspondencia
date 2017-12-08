import { Template } from 'meteor/templating';
import $ from "jquery";
 
import { Paperworks } from '../api/paperworks.js';
 
import './paperworkWatchers.html';
 
Template.paperworkWatchers.helpers({
    nameOf(personId) {
        
                let user = Meteor.users.findOne({ _id: personId });
                return user.profile.name;
    },
});
