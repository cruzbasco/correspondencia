import { Template } from 'meteor/templating';
import $ from "jquery";
 
import { PaperworkTypes } from '../api/paperworkTypes.js';
 
import './paperworkTypes.html';
 
Template.paperworkTypes.helpers({
  paperworkTypes(){
    return PaperworkTypes.find({}, { sort: { name: 1 } });
  },
});


Template.paperworkTypes.events({
    'click #edit'(event, template) {
        template.$(".paperworkTypes").toggle();
    },
    'click #cancel'(event, template) {
        event.preventDefault();
        template.$(".paperworkTypes").toggle();
    },
    'submit .form-paperworkTypes'(event, template){
        event.preventDefault();
        
        // Get value from form element
        const target = event.target;
        const type = target.paperworkType.value;

        // Insert a task into the collection
        PaperworkTypes.insert({
            type,
            code : 0,
        });    
        
        template.$("#paperworkType").val("");
        template.$(".paperworkTypes").toggle();
        
    },
});