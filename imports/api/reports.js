import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './paperworks.js';

import moment from 'moment';
import 'moment/locale/es'

import { Paperworks } from './paperworks.js';

export class Reports {
    type1(from, to) {
        let resume = {};
        const dateFrom = new Date (from);
        const dateTo = new Date (to);
        let paperworks = Paperworks.find({
                    "createdAt": {$gte: dateFrom, $lte: dateTo }
            }).fetch();

        for (p of paperworks){

            p.routes.splice(0,1);

            for (r of p.recipients){
                if (! resume.hasOwnProperty(r.person)){
                    resume[r.person] = {};
                }
                let resp = true;
                for (let i = 0 ; i< p.routes.length && resp ; i++){
                    if (r.person == p.routes[i].owner){
                        if (! resume.hasOwnProperty(r.department)){
                            resume[r.person][r.department] = {};
                            resume[r.person][r.department] = 0;
                        }
                        resp = false;
                        let endDate = moment(p.routes[i].createdAt);
                        let beginDate = moment(p.createdAt)
                        resume[r.person][r.department] += endDate.diff(beginDate, "minutes");
                        p.routes.splice(i,1);
                    }
                }
                if (resp){
                    if (! resume.hasOwnProperty(r.department)){
                        resume[r.person][r.department] = {};
                        resume[r.person][r.department] = 0;
                    }
                    let endDate = moment(Date.now());
                    let beginDate = moment(p.createdAt)
                    resume[r.person][r.department] += endDate.diff(beginDate, "minutes");
                }
            }


            for (let i = 0 ; i< p.routes.length ; i++){
                if (! resume.hasOwnProperty(p.routes[i].person)){
                    resume[p.routes[i].person] = {};
                }
                let resp = true;
                for (let j = i + 1 ; j< p.routes.length && resp ; j++){
                    if (p.routes[i].person == p.routes[j].owner){
                        if (! resume.hasOwnProperty(p.routes[i].department)){
                            resume[r.person][p.routes[i].department] = {};
                            resume[r.person][p.routes[i].department] = 0;
                        }
                        resp = false;
                        let endDate = moment(p.routes[j].createdAt);
                        let beginDate = moment(p.routes[i].createdAt)
                        resume[p.routes[i].person][p.routes[i].department] += endDate.diff(beginDate, "minutes");
                        p.routes.splice(i,1);
                    }
                }
                if (resp){
                    if (! resume.hasOwnProperty(p.routes[i].department)){
                        resume[r.person][p.routes[i].department] = {};
                        resume[r.person][p.routes[i].department] = 0;
                    }
                    let endDate = moment(Date.now());
                    let beginDate = moment(p.routes[i].createdAt)
                    resume[p.routes[i].person][p.routes[i].department] += endDate.diff(beginDate, "minutes");
                }
            }
            
            
        }   

        console.log(resume);
        
        return resume;
    }

     type2(from, to) {
        let resume = {};
        const dateFrom = new Date (from);
        const dateTo = new Date (to);
        let paperworks = Paperworks.find({
                    "createdAt": {$gte: dateFrom, $lte: dateTo }
            }).fetch();

        for (p of paperworks){

            let length = p.routes.length;
            let endDate = moment(p.routes[length - 1].createdAt);
            let beginDate = moment(p.routes[0].createdAt)

            if (! resume.hasOwnProperty(p.type)){
                resume[p.type] = {};
                resume[p.type]["sum"] = 0;
                resume[p.type]["cont"] = 0;
            }
            resume[p.type]["sum"] += endDate.diff(beginDate,"minutes");
            resume[p.type]["cont"] ++;
        }   

        return resume;
    }

     type3(from, to) {
        let resume = {};
        const dateFrom = new Date (from);
        const dateTo = new Date (to);
        let paperworks = Paperworks.find({
                    "createdAt": {$gte: dateFrom, $lte: dateTo }
            }).fetch();

        for (p of paperworks){

            p.routes.splice(0,1);

            for (r of p.recipients){
                if (! resume.hasOwnProperty(r.person)){
                    resume[r.person] = {};
                    resume[r.person]["sum"] = 0;
                    resume[r.person]["cont"] = 0;
                }
                let resp = true;
                for (let i = 0 ; i< p.routes.length && resp ; i++){
                    if (r.person == p.routes[i].owner){
                        resp = false;
                        let endDate = moment(p.routes[i].createdAt);
                        let beginDate = moment(p.createdAt)
                        resume[r.person]["sum"] += endDate.diff(beginDate, "minutes");
                        resume[r.person]["cont"] += 1;
                        p.routes.splice(i,1);
                    }
                }
                if (resp){
                    let endDate = moment(Date.now());
                    let beginDate = moment(p.createdAt)
                    resume[r.person]["sum"] += endDate.diff(beginDate, "minutes");
                    resume[r.person]["cont"] += 1;
                }
            }
            for (let i = 0 ; i< p.routes.length ; i++){
                if (! resume.hasOwnProperty(p.routes[i].person)){
                    resume[p.routes[i].person] = {};
                    resume[p.routes[i].person]["sum"] = 0;
                    resume[p.routes[i].person]["cont"] = 0;
                }
                let resp = true;
                for (let j = i + 1 ; j< p.routes.length && resp ; j++){
                    if (p.routes[i].person == p.routes[j].owner){
                        resp = false;
                        let endDate = moment(p.routes[j].createdAt);
                        let beginDate = moment(p.routes[i].createdAt)
                        resume[p.routes[i].person]["sum"] += endDate.diff(beginDate, "minutes");
                        resume[p.routes[i].person]["cont"] += 1;
                        p.routes.splice(i,1);
                    }
                }
                if (resp){
                    let endDate = moment(Date.now());
                    let beginDate = moment(p.routes[i].createdAt)
                    resume[p.routes[i].person]["sum"] += endDate.diff(beginDate, "minutes");
                    resume[p.routes[i].person]["cont"] += 1;
                }
            }
        }   

        return resume;
    }

     type4(from, to) {
        let resume = {};
        const dateFrom = new Date (from);
        const dateTo = new Date (to);
        let paperworks = Paperworks.find({
                    "createdAt": {$gte: dateFrom, $lte: dateTo }
            }).fetch();
        return "4";
    }

     type5(from, to) {
        let resume = {};
        const dateFrom = new Date (from);
        const dateTo = new Date (to);
        let paperworks = Paperworks.find({
                    "createdAt": {$gte: dateFrom, $lte: dateTo }
            }).fetch();

        for ( p of paperworks){
            if (! resume.hasOwnProperty(p.type)){
                resume[p.type] = {};
            }
            for (let r of p.routes) {
                if ((resume[p.type]).hasOwnProperty(r.department))
                    resume[p.type][(r.department)] += 1;
                else
                    resume[p.type][(r.department)] = 1;
            }    
        }

        return resume;
    }
}