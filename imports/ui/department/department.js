import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import $ from "jquery";
import moment from 'moment';
import 'moment/locale/es';
 
import { Departments } from '../../api/departments.js';
 
import './department.html';

Template.department.onCreated(function() {
    this.autorun(function(){
        Session.set('searchText', "");        
    });
});

Template.department.helpers({
    'users': function() {
        var search = Session.get('searchText');
        
        return Meteor.users.find({
                $or: [
                    {'profile.name': {$regex: search,$options: 'i'}},
                    {'emails.address': {$regex: search,$options: 'i'}}
                ]}, {sort:{ 'emails.address' : 1 }});
    },
    "isMemberOf" : function (personId) {
        const people = Template.instance().data.people;
        
        for (person of people){
            if (person === personId){
                return true;
            }
        }
        return false;
    }
});

Template.department.events({
    'keyup #user-search': function(event, template) {
        var searchText = template.$('#user-search').val();
        
        Session.set('searchText', searchText);
    },
    'click #add' : function(event, template) {
        console.log('prmote');
        Meteor.call('Departments.addPerson', template.data.name, this._id);
    },
    'click #remove' : function(event, template) {
        console.log('remove');
        Meteor.call('Departments.removePerson', template.data.name, this._id);
    }
});