import { Template } from 'meteor/templating';
import $ from "jquery";
import { Paperworks } from '../api/paperworks.js';
import { Departments } from '../api/departments.js';
import moment from 'moment';
import 'moment/locale/es';
import Quill from 'quill';

import './paperwork.html';

let editor;

Template.paperwork.onCreated(function () {
    this.selectedDepartment = new ReactiveVar(null);
    
});

Template.paperwork.onRendered(function () {
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

    selectedState(state) {
        if (state === this.state) {
            return 'selected';
        }
    },

    selectedType(type) {
        if (type === this.type) {
            return 'selected';
        }
    },

    departments() {
        return Departments.find({}, { sort: { name: 1 } });
    },

    people() {
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

    nameOf(personId) {

        let user = Meteor.users.findOne({ _id: personId });
        return user.profile.name;
    },
    
    isPublic() {
        if (this.privacity == "public" || this.person == Meteor.userId() || this.owner == Meteor.userId()){
            return this.message;
        } else {
            return "Mensaje privado.";
        }
    }

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
    'submit .form-routes'(event, template) {
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const department = target.department.value;
        const person = target.person.value;
        const message = target.message.value;
        const privacity = target.privacity.value;

        const owner = Meteor.userId();

        moment.locale('es');
        // Insert a task into the collection
        Paperworks.update(this._id, {
            $addToSet: { routes: { owner, department, person, createdAt: Date.now(), message, privacity } },
        });

        template.$(".routes").toggle();

    },
    'change #department'(event, template) {
        const target = event.target;
        template.selectedDepartment.set(target.value);
    },
     'click .watched' (event, template) {

        console.log (template.data);
        let w = template.data.watchers;
        
            
            let resp = false;
            for (let i = 0; i < w.length; i++) {
        
                if (w[i] == Meteor.userId()) {
                    resp = true;
                }
        
            }
        
            if (resp == false) {
                Paperworks.update(this._id, {
                    $addToSet: { watchers: { watcher: Meteor.userId() } },
                });
            }
     }

});