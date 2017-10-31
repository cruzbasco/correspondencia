import { Template } from 'meteor/templating';
import $ from "jquery";

import './userProfile.html';

Template.userProfile.helpers({
    'name': function (){
        return Meteor.user().profile.name;
    },
    'mail': function (){
        return Meteor.user().profile.mail;
    },
    'phone': function (){
        return Meteor.user().profile.phone;
    } 
 });