import { Template } from 'meteor/templating';
import $ from "jquery";
import { Paperworks } from '../api/paperworks.js';
import { Departments } from '../api/departments.js';
import moment from 'moment';
import 'moment/locale/es';
import Quill from 'quill';

import './paperwork.html';

let editor;

Template.paperwork.onCreated(function(){
        this.selectedDepartment = new ReactiveVar(null);   
       
});

Template.paperwork.onRendered(function(){
    const toolbar = [];
    editor = new Quill('#editor', {
        modules: {
            toolbar: false
        },
        readOnly: true,
        theme: 'snow'
    });
    editor.setContents(this.data.data);
});

Template.paperwork.helpers({

    selectedState(state){
        if (state === this.state){
            return 'selected';
        }
    },

    selectedType(type){
        if (type === this.type){
            return 'selected';
        }
    },

    departments(){
        return Departments.find({}, { sort: { name: 1 } });
    },

    people(){
        const selectedDepartment = Template.instance().selectedDepartment.get();
        
        if (selectedDepartment !== null) {
            return (Departments.findOne({ name: selectedDepartment })).people;
        } else {
            const departments = Departments.find({}, { sort: { name: 1 } }).fetch();
            return departments[0].people;
        }
    },

    convertDate(createdAt) {
        return moment(createdAt).format('dddd, DD MMMM YYYY, h:mm:ss a');
    },

});

Template.paperwork.events({
    'click #edit'(event, template) {
        event.preventDefault();        
        template.$(".routes").toggle();
    },
    'click #cancel'(event, template) {
        event.preventDefault();
        template.$(".routes").toggle();
    },
    'submit .form-routes'(event, template){
        event.preventDefault();
        
        // Get value from form element
        const target = event.target;
        const route = target.route.value;
        const person = target.person.value;

        moment.locale('es');
        // Insert a task into the collection
        Paperworks.update(this._id, {
            $addToSet: { routes:  {route: route, person: person, createdAt: Date.now() } },
        });

        template.$(".routes").toggle();
        
    },
    'change #route'(event, template){
        const target = event.target;    
        template.selectedDepartment.set(target.value);
    }


});