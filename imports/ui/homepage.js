import { Template } from 'meteor/templating';


import './navbar.html';
import './homepage.html';

import Quill from 'quill';


Template.homepage.onRendered(function () {
    let editor = new Quill('#editor', {
        theme: 'snow'
      });
});
 