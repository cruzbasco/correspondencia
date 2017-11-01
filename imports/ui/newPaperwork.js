import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import moment from 'moment';
import 'moment/locale/es'

import Quill from 'quill';

import { Departments } from '../api/departments.js';

import { Paperworks } from '../api/paperworks.js';
import { PaperworkTypes } from '../api/paperworkTypes.js';

import './newPaperwork.html';

let editor;

Template.newPaperwork.onCreated(function(){
    this.selectedDepartment = new ReactiveVar(null);
});

Template.newPaperwork.onRendered(function(){
    let toolbarOptions = [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'align': [] }],        
      
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      
        ['clean']                                         // remove formatting button
      ];

    editor = new Quill('#editor', {
        modules:{
            toolbar: toolbarOptions
        },
        theme: 'snow'
      });
});

Template.newPaperwork.helpers({
    selectedState(state){
        if (state === this.state){
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

    paperworkTypes(){
        return PaperworkTypes.find({}, { sort: { type: 1 } });
    },

    convertDate(createdAt) {
        return moment(createdAt).format('dddd, DD MMMM YYYY, h:mm:ss a');
    },

    nameOf(personId) {
        
        let user =  Meteor.users.findOne({_id: personId});
        console.log(user);
        return user.profile.name;
    }

});

Template.newPaperwork.events({
    'submit .form-horizontal' () {
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const origin = target.origin.value;
        const subject = target.subject.value;
        const type = target.type.value;
        const state = target.state.value;
        const route = target.route.value;
        const person = target.person.value;

        const data = editor.getContents();

        moment.locale('es');
        // Insert a task into the collection
        Paperworks.insert({
            origin,
            route,
            person,
            subject,
            type,
            state,
            data,
            createdAt: Date.now(),
            routes: [{route: route, person: person, createdAt: Date.now() }] ,
        });

        Meteor.call('PaperworkTypes.increment', type);        



        if (!Notification) {
            alert('Desktop notifications not available in your browser. Try Chromium.'); 
            return;
          }
        
          if (Notification.permission !== "granted")
            Notification.requestPermission();
          else {
            var notification = new Notification('Postman App', {
              icon: 'https://scontent.flpb1-1.fna.fbcdn.net/v/t1.0-9/21149979_10155262279945376_4357735238076947498_n.jpg?oh=e6b39392ecb43295e8334a585d4e14e1&oe=5A25BDAD',
              body: "Nueva correspondencia!",
            });
        
            notification.onclick = function () {
              window.open('/pending');      
            };
        }

        Router.go('/paperworks');
    },
    'change #route'(event, template){
        const target = event.target;    
        template.selectedDepartment.set(target.value);
        
    },

});