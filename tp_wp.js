$(document).ready(function () {
   var newArray = [];
   d3.csv("test.csv", function(error, data) {// with header..
       data.forEach(function(d) {


               newArray.push(d);
       });

       });

       d3.csv("test1.csv", function(error, data2) {// without header..
           data2.forEach(function(d2) {


                   newArray.push(d2);
           });

           });
       console.log(newArray);
   });
   d3.csv("./IMT/DATA/NEWIMTENGLISH25May2017_results.csv",function(error , d){
       d.forEach(function(d1)
       {
         newArray.push(d1);
       });
     });
       d3.csv("./IMT/DATA/IMTHindi29June2017_xls_results.csv",function(error , d2){
           d2.forEach(function(d4)
           {
             newArray.push(d4);
           });
