import { Template } from 'meteor/templating';
import $ from "jquery";
import {Reports} from '../../api/reports.js';
import { Paperworks } from '../../api/paperworks.js';

 
import './report5.html';
 

Template.report5.onCreated(function () {
    this.resume = new ReactiveVar(null);
    this.isPressed = new ReactiveVar(false);    
});

Template.report5.helpers({
    resume() {
        let resume = Template.instance().resume.get();

        console.log(resume);
        var result = Object.keys(resume).map(function(key) {
            return {"type" : key, 
            "data" : Object.keys(resume[key]).map(function(secondKey){
                return {"departament": secondKey, "count": resume[key][secondKey]}
            })
        }
        })

        console.log(result);

        return result;
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

Template.report5.events({
    'submit .form-horizontal'(event, template) {
        event.preventDefault();
        const target = event.target

        let from = target.from.value;
        let to = target.to.value;
        let reports = new Reports();
        let resume = reports.type5(from, to);

        template.resume.set(resume);
        template.isPressed.set(true);



        let graph = Object.keys(resume).map(function(key) {
            return {"label" : key, "y" : Object.keys(resume[key]).reduce(function(prev, current, index) {
                return prev + (+resume[key][current])
            }, 0)
        }
        })

        console.log("mensaje desde type5");
        console.log(graph);


        var chart = new CanvasJS.Chart("canvas", {
            animationEnabled: true,
            legend: {
                maxWidth: 350,
                itemWidth: 120
            },
            data: [{
                type: "pie",
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
                    "Tipo de correspondencia": { type: String },
                    "Departamento": { type: String },
                    "Cantidad": { type: String }
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
                    { field: "Tipo de correspondencia", title: "Tipo de correspondencia", width: 150 },
                    { field: "Departamento", title: "Departamento", width: 150 },
                    { field: "Cantidad", title: "Cantidad", width: 150 }
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