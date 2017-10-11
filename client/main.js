import '../imports/ui/homepage.js';
import '../imports/ui/paperworks.js';
import '../imports/ui/paperwork.js';
import '../imports/ui/paperworkTypes.js';
import '../imports/ui/newPaperwork.js';
import '../imports/ui/pending.js';
import '../imports/ui/departments.js';
import '../imports/ui/department.js';

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