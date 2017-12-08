import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import moment from 'moment';
import 'moment/locale/es'

import $ from "jquery";

import Quill from 'quill';

import { Departments } from '../api/departments.js';
import { Paperworks } from '../api/paperworks.js';
import { PaperworkTypes } from '../api/paperworkTypes.js';

import './newPaperwork.html';
import { ReactiveVar } from 'meteor/reactive-var';

let editor;

Template.newPaperwork.onCreated(function () {
    this.selectedDepartment = new ReactiveVar(null);
    this.recipients = new ReactiveVar([]);
});

Template.newPaperwork.onRendered(function () {
    let toolbarOptions = [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

        ['bold', 'italic', 'underline'],        // toggled buttons

        [{ 'align': [] }],

        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent

        ['image'],

        ['clean']                                         // remove formatting button
    ];

    editor = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });
});

Template.newPaperwork.helpers({
    selectedState(state) {
        if (state === this.state) {
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

    paperworkTypes() {
        return PaperworkTypes.find({}, { sort: { type: 1 } });
    },

    convertDate(createdAt) {
        return moment(createdAt).format('dddd, DD MMMM YYYY, h:mm:ss a');
    },

    nameOf(personId) {

        let user = Meteor.users.findOne({ _id: personId });
        return user.profile.name;
    },
    haverecipients() {
        let recipients = Template.instance().recipients.get();

        return recipients.length > 0;
    },
    recipients() {
        return Template.instance().recipients.get();
    },

});

Template.newPaperwork.events({
    'submit .form-horizontal'(event, template) {
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const origin = target.origin.value;
        const subject = target.subject.value;
        const type = target.type.value;
        const state = target.state.value;
        const recipients = template.recipients.get();
        const department = target.department.value;
        const person = target.person.value;

        const watchers = [];

        const data = editor.getContents();

        const signId = Meteor.userId();

        moment.locale('es');
        // Insert a task into the collection
        Paperworks.insert({
            origin,
            recipients,
            subject,
            type,
            state,
            data,
            signId,
            createdAt: Date.now(),
            watchers,
            routes: [{ department, person, createdAt: Date.now(), message: subject, privacity: "public" }],
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
    'change #department'(event, template) {
        const target = event.target;
        template.selectedDepartment.set(target.value);

    },

    'click #addRecipient'(event, template) {
        event.preventDefault();

        let recipients = template.recipients.get();
        let department = template.$('#department').val();
        let person = template.$('#person').val();

        recipients.push ({department, person});

        template.recipients.set (recipients);
    },

    'click #removeRecipient'(event, template){
        event.preventDefault();

        let recipients = template.recipients.get();
        let filterRecipients = [];
        
        for (recipient of recipients){
            if (recipient.person !== this.person){
                filterRecipients.push(recipient);
            }
        }

        template.recipients.set (filterRecipients);        
    },

});