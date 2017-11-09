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
    let department = Departments.findOne({people: {$in: [Meteor.userId()]}});
    return Paperworks.find({
      $and: [
        {route: department.name},
        {$or: [
          { origin: { $regex: search, $options: 'mi' } },
          { route: { $regex: search, $options: 'mi' } },
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
    let department = Departments.findOne({people: {$in: [Meteor.userId()]}});

    return Paperworks.find({route: department.name}).count();
});