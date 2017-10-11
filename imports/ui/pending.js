import { Template } from 'meteor/templating';
 
import { Paperworks } from '../api/paperworks.js';
 
import moment from 'moment';
import 'moment/locale/es'

import './pending.html';
 
Template.pending.onCreated(function(){
        this.search = new ReactiveVar("");
});

Template.pending.helpers({
  paperworks() {
    const search = Template.instance().search.get();

    return Paperworks.find({
      $or: [
        { origin: { $regex: search, $options: 'mi' } },
        { route: { $regex: search, $options: 'mi' } },
        { person: { $regex: search, $options: 'mi' } },
        { state: { $regex: search, $options: 'mi' } },
        { createdAt: { $regex: search, $options: 'mi' } },
      ]
    }, { sort: { createdAt: -11 } });
  },
  convertDate(createdAt){
    return moment(createdAt).format('dddd, DD MMMM YYYY, h:mm:ss a');
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
    return Paperworks.find().count();
});