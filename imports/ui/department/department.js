import { Template } from 'meteor/templating';
import $ from "jquery";
import moment from 'moment';
import 'moment/locale/es';
 
import { Departments } from '../../api/departments.js';
 
import './department.html';

Template.department.helpers({
});


Template.department.events({
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

        moment.locale('es');
        // Insert a task into the collection
        Departments.update(this._id, {
            $addToSet: { people: name, },
        }); 

        template.$("#departmentName").val("");
        template.$(".department").toggle();
        
    },
});