import { Template } from 'meteor/templating';
import $ from "jquery";
import Chart from "chart.js";
import {Reports} from '../../api/reports.js';
import { Paperworks } from '../../api/paperworks.js';


import './report2.html';
 

Template.report2.onCreated(function () {
    this.resume = new ReactiveVar(null);
    this.chart = new ReactiveVar(null);
});

Template.report2.helpers({
    resume() {
        let resume = Template.instance().resume.get();

        return resume;
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
    }

});

Template.report2.events({
    'click #search'(event, template) {
        event.preventDefault();

        let from = template.$("#from").val();
        let to = template.$("#to").val();
        let reports = new Reports();
        let resume = reports.type2(from, to);

        let result = Object.keys(resume).map(function(key) {
            return {"type" : key, "time" : Math.floor(resume[key].sum / resume[key].cont)}
        })

        template.resume.set(result);

        let graph = Object.keys(resume).map(function(key) {
            return {"label" : key ,"y" : Math.floor(resume[key].sum / resume[key].cont)}
        })

        template.chart.set(graph);


        
        var chart = new CanvasJS.Chart("canvas", {
            animationEnabled: true,
            
            data: [{
                type: "column",
                dataPoints: graph
                
            }]
        });
        chart.render();
        
        
    },

    'click #pdf'(event,template) {
        var dataSource = shield.DataSource.create({
            data: "#exportTable",
            schema: {
                type: "table",
                fields: {
                    "Tipo de correspondencia": { type: String },
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
                    { field: "Tipo de correspondencia", title: "Tipo de correspondencia", width: 200 },
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