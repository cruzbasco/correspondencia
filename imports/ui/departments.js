import { Template } from 'meteor/templating';
import $ from "jquery";
 
import { Departments } from '../api/departments.js';
 
import './departments.html';
 
Template.departments.helpers({
  departments(){
    return Departments.find({}, { sort: { name: 1 } });
  },
});


Template.departments.events({
    'click #edit'(event, template) {
        template.$(".department").toggle();
    },
    'click #cancel'(event, template) {
        event.preventDefault();
        template.$(".department").toggle();
    },
    'submit .form-deparment'(event, template){
        event.preventDefault();
        
        // Get value from form element
        const target = event.target;
        const name = target.departmentName.value;
        // Insert a task into the collection
        Departments.insert({
            name,
        });    
        template.$("#departmentName").val("");
        template.$(".department").toggle();
        
    },
});