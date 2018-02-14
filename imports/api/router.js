import { Router } from 'meteor/iron:router';
import { Paperworks } from './paperworks.js';
import { Departments } from './departments.js';

Router.route("/", function () {
	this.layout("navbar");
	this.render("homepage");
});

Router.route("/paperworks", function () {
	this.layout("navbar");
	this.render("paperworks");
});

Router.route("/newPaperwork", function () {
	this.layout("navbar");
	const deparment = Departments.find({}, { sort: { name: 1 } }).fetch();
	const firstDeparment = deparment[0].name;

	this.render("newPaperwork", { data: firstDeparment});
});

Router.route("/paperwork/:id", function () {
	this.layout("navbar");
	const paperwork = Paperworks.findOne({ _id: this.params.id });
	this.render("paperwork", { data: paperwork });
});

Router.route("/paperworkWatchers/:id", function () {
	this.layout("navbar");
	const paperwork = Paperworks.findOne({ _id: this.params.id });
	this.render("paperworkWatchers", { data: paperwork });
});

Router.route("/paperworkTypes", function () {
	this.layout("navbar");
	this.render("paperworkTypes");
});




Router.route("/pending", function () {
	this.layout("navbar");
	this.render("pending");
});

Router.route("/departments", function () {
	this.layout("navbar");
	this.render("departments");
});

Router.route("/department/:id", function () {
	this.layout("navbar");
	const department = Departments.findOne({ _id: this.params.id });
	this.render("department", { data: department });
});

Router.route("/reports/type2", function () {
	this.layout("navbar");
	this.render("report2");
});

Router.route("/reports/type3", function () {
	this.layout("navbar");
	this.render("report3");
});

Router.route("/reports/type4", function () {
	this.layout("navbar");
	this.render("report4");
});
Router.route("/reports/type5", function () {
	this.layout("navbar");
	this.render("report5");
});

// User Profile
Router.route("/configuration/userProfile", function() {
	this.layout("navbar");
    this.render("userProfile");
});

// Editable User Profile
Router.route("/configuration/editableUserProfile", function() {
	this.layout("navbar");	
    this.render("editableUserProfile");
});