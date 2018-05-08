import { Template } from 'meteor/templating';
import $ from "jquery";
import {Reports} from '../../api/reports.js';
import { Paperworks } from '../../api/paperworks.js';

 
import './report4.html';
 

Template.report4.onCreated(function () {
    this.resume = new ReactiveVar(null);
    this.personId = new ReactiveVar(null);
    this.isPressed = new ReactiveVar(false);    
    Meteor.subscribe('allUsers');
});

Template.report4.helpers({
    resume() {
        let resume = Template.instance().resume.get();
        let personId = Template.instance().personId.get();
        var result = Object.keys(resume).map(function(key) {
            return {"personId" : key, 
            "data" : Object.keys(resume[key]).map(function(secondKey){
                return {"type": secondKey, "time": resume[key][secondKey]}
            })
        }
        })

        if (personId !== "todos")
        result = result.filter(function(el) {
            return el.personId === personId;
        });

        return result;
    },
    convert(time) {
        let resp = "";        
        let hours, days, minutes;
            hours = Math.floor(time / 60);
            minutes = time % 60;
            days = Math.floor(hours / 24);
            hours = hours % 24;
            if (days > 0){
                resp += days + " Dias " 
            }
            if (hours > 0){
                resp += hours + " Horas " 
            }
            
            resp += minutes + " Minutos " 
        return resp;
    },
    nameOf(personId) {

        let user = Meteor.users.findOne({ _id: personId });
        return user.profile.name;
    },
    people() {
        let users = Meteor.users.find({});
        return users;
    },
    checkLength(resume) {
        if (resume.length > 0)
            return true;
        return false;
        
    },
    isPressed() {
        return Template.instance().isPressed.get();
    }

});

Template.report4.events({
    'submit .form-horizontal'(event, template) {
        event.preventDefault();
        const target = event.target
        let personId = target.person.value;
        let from = target.from.value;
        let to = target.to.value;
        let reports = new Reports();
        let resume = reports.type1(from, to);

        template.resume.set(resume);
        template.personId.set(personId);
        template.isPressed.set(true);        



        let graph = Object.keys(resume).map(function(key) {
            return{ "userID": key,
                 "data" :  Object.keys(resume[key]).map(function(secondKey){
                    return {"label": secondKey, "y": resume[key][secondKey] }
                })
            }   
        
        })


        graph = graph.filter(function(el) {
            return el.userID === personId;
        });

        const graphData = graph[0].data;
        
        var chart = new CanvasJS.Chart("canvas", {
            animationEnabled: true,
            data: [{
                type: "column",
                dataPoints: graphData
                
            }]
        });
        if (personId !== "todos" && graphData.length > 0 )        
            chart.render();
    },

    'click #pdf'(event,template) {
        var dataSource = shield.DataSource.create({
            data: "#exportTable",
            schema: {
                type: "table",
                fields: {
                    "Destinatario": { type: String },
                    "Tipo de correspondencia": { type: String },
                    "Tiempo": { type: String }
                }
            }
        });

        // when parsing is done, export the data to PDF
        dataSource.read().then(function (data) {
            var pdf = new shield.exp.PDFDocument({
                author: "PrepBootstrap",
                created: new Date()
            });

            pdf.addPage("a4", "portrait");

            pdf.table(
                50,
                50,
                data,
                [
                    { field: "Destinatario", title: "Destinatario", width: 130 },
                    { field: "Tipo de correspondencia", title: "Tipo de correspondencia", width: 150 },
                    { field: "Tiempo", title: "Tiempo", width: 180 }
                ],
                {
                    margins: {
                        top: 50,
                        left: 50
                    }
                }
            );

            pdf.saveAs({
                fileName: "Export-to-PDF"
            });
        });
    }

});