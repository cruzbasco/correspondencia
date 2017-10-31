import { Template } from 'meteor/templating';
import $ from "jquery";

import './editableUserProfile.html';

Template.editableUserProfile.helpers({
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
 
 Template.editableUserProfile.events({
     'submit form': function(event, template) {
         event.preventDefault();
         var name = template.$('#user-name').val();
         var mail = template.$('#user-mail').val();
         var phone = template.$('#user-phone').val();
 
         Meteor.call("updateUsers", Meteor.userId(), name, mail, phone)
         
         Router.go("/configuration/userProfile");
     }
 });