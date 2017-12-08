import { Template } from 'meteor/templating';
import moment from 'moment';
import 'moment/locale/es'
import { Paperworks } from '../api/paperworks.js';
 
import './paperworks.html';
 
Template.paperworks.onCreated(function(){
        this.search = new ReactiveVar("");

        
});

Template.paperworks.helpers({
  paperworks() {
    const search = Template.instance().search.get();

    return Paperworks.find({
      $or: [
        { origin: { $regex: search, $options: 'i' } },
        { 'recipients.department': { $regex: search, $options: 'i' } },
        { 'recipients.person': { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
      ]
    }, { sort: { createdAt: -1 } });
  },
  convertDate(createdAt){
    return moment(createdAt).format('dddd, DD MMMM YYYY, h:mm:ss a');
  },

  nameOf(personId) {
    let user =  Meteor.users.findOne({_id: personId});
    return user.profile.name;
  },

});


Template.paperworks.events({
  'keyup #search'(event, template) {
    let search = template.$('#search').val();
    // search = "^" + search;
    template.search.set(search);
  }
});