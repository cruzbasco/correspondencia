import { Template } from 'meteor/templating';
 
import { Paperworks } from '../api/paperworks.js';
import { Departments } from '../api/departments.js';
 
import moment from 'moment';
import 'moment/locale/es'

import './pending.html';
 
Template.pending.onCreated(function(){
        this.search = new ReactiveVar("");
});

Template.pending.helpers({
  paperworks() {
    const search = Template.instance().search.get();

    let departments = Departments.find({people: {$in: [Meteor.userId()]}}).fetch();
    let departmentNames = [];

    for(i = 0 ; i < departments.length; i++){
	departmentNames.push(departments[i].name);
    }

    return Paperworks.find({
      $and: [
        {department: {$in: departmentNames}},
        {$or: [
          { origin: { $regex: search, $options: 'mi' } },
          { department: { $regex: search, $options: 'mi' } },
          { person: { $regex: search, $options: 'mi' } },
          { state: { $regex: search, $options: 'mi' } },
          { createdAt: { $regex: search, $options: 'mi' } },
        ]}
      ]
    }, { sort: { createdAt: -11 } });
  },
  convertDate(createdAt){
    return moment(createdAt).format('dddd, DD MMMM YYYY, h:mm:ss a');
  },
  nameOf(personId) {
    let user =  Meteor.users.findOne({_id: personId});
    return user.profile.name;
  },

});


Template.pending.events({
  'keyup #search'(event, template) {
    let search = template.$('#search').val();
    search = "^" + search;
    template.search.set(search);
  }
});

Template.registerHelper('number', () => {
    let departments = Departments.find({people: {$in: [Meteor.userId()]}}).fetch();
    let departmentNames = [];

    for(i = 0 ; i < departments.length; i++){
	departmentNames.push(departments[i].name);
    }

    return Paperworks.find({department: {$in: departmentNames}}).count();
});