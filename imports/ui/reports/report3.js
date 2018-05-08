import { Template } from 'meteor/templating';
import $ from "jquery";
import {Reports} from '../../api/reports.js';
import { Paperworks } from '../../api/paperworks.js';

 
import './report3.html';
 

Template.report3.onCreated(function () {
    this.resume = new ReactiveVar(null);
    this.isPressed = new ReactiveVar(false);
    
});

Template.report3.helpers({
    resume() {
        let resume = Template.instance().resume.get();

        var result = Object.keys(resume).map(function(key) {
            return {"person" : key, "time" : Math.floor(resume[key].sum / resume[key].cont)}
        })

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
    checkLength(resume) {
        if (resume.length > 0)
            return true;
        return false;
        
    },
    isPressed() {
        return Template.instance().isPressed.get();
    }

});

Template.report3.events({
    'submit .form-horizontal'(event, template) {
        event.preventDefault();
        const target = event.target

        let from = target.from.value;
        let to = target.to.value;
        let reports = new Reports();
        let resume = reports.type3(from, to);

        template.resume.set(resume);
        template.isPressed.set(true);
        


        let graph = Object.keys(resume).map(function(key) {
            return {"label" : Meteor.users.findOne({ _id: key }).profile.name  ,"y" : Math.floor(resume[key].sum / resume[key].cont)}
        })

        var chart = new CanvasJS.Chart("canvas", {
            animationEnabled: true,
            
            data: [{
                type: "column",
                dataPoints: graph
                
            }]
        });

        if (graph.length > 0)    
            chart.render();

    },
    'click #pdf'(event,template) {
        var dataSource = shield.DataSource.create({
            data: "#exportTable",
            schema: {
                type: "table",
                fields: {
                    "Destinatario": { type: String },
                    "Tiempo promedio": { type: String }
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
                    { field: "Destinatario", title: "Destinatario", width: 200 },
                    { field: "Tiempo promedio", title: "Tiempo promedio", width: 200 }
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