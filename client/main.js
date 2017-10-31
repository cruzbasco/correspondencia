import '../imports/ui/homepage.js';
import '../imports/ui/paperworks.js';
import '../imports/ui/paperwork.js';
import '../imports/ui/paperworkTypes.js';
import '../imports/ui/newPaperwork.js';
import '../imports/ui/pending.js';
import '../imports/ui/department/departments.js';
import '../imports/ui/department/department.js';
import '../imports/ui/configuration/user/userProfile.js';
import '../imports/ui/configuration/user/editableUserProfile.js';


import '../imports/api/router.js';


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import 'font-awesome/css/font-awesome.css';

import '../imports/startup/accountsConfig.js';


document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted")
      Notification.requestPermission();
  });


  var NodeRSA = require('node-rsa');
  var key = new NodeRSA({b: 512});
  
  var text = 'hola q tal!';
  var encrypted = key.encrypt(text, 'base64');
  console.log('encrypted: ', encrypted);
  var decrypted = key.decrypt(encrypted, 'utf8');
  console.log('decrypted: ', decrypted);