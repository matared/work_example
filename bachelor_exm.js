/**
 * Created by martina on 7. 5. 2017.
 */
//These are code samples from the Bachelor Thesis, written in 2015-2016.
//The work was focused at creating an application for visualizing user activity in the host system.

//function to create columnt chart with google charts API
function drawColumnChart(sectionname) {

    console.log('toto sa vypise');

    if(conditions==0) array=[['people']];
    selection=document.getElementById("sel"+ conditions.toString());
    name=selection.options[selection.selectedIndex].value;
    array[0].push(name);

    jQuery(function ($) {
        selection=document.getElementById("sel"+ conditions.toString());
        id=selection.options[selection.selectedIndex].id.toString();

        //demand for the REST API
        var url = 'http://eclipsewi ... /act_id=' + id;

        $.getJSON(url, function (data) {
            var len = data[0].length;
            //data preprocessing
            for (i = 1; i < len; i++) {
                k=1;
                while (k <= array.length) {
                    if (k == array.length) {
                        array.push([]);
                        for(j=0;j<=conditions;j++){
                            array[array.length-1].push('0');
                        }
                        array[array.length-1][0]=data[0][i];
                        array[array.length-1][conditions+1]=data[1][i];
                        k=array.length+1;
                    }
                    else {
                           if(array[k][0]>data[0][i]){
                                array.splice(k,0,[]);
                                for(j=0;j<=conditions;j++){
                                    array[k].push('0');
                                }
                                array[k][0]=data[0][i];
                                array[k][conditions+1]=data[1][i];
                                k=array.length+1;
                            }
                        }
                    }
                    k++;
                }
            }
            for(a=0;a<array.length;a++){
                if(array[a][conditions+1]==undefined) array[a][conditions+1]=0;
            }
            columnDraw(sectionname);

        });

        function columnDraw(sectionname) {

            var data = google.visualization.arrayToDataTable(array);
            var view = new google.visualization.DataView(data);
            var options = {
                title: "Activity of users",
                height: 300,
                bar: {groupWidth: "100%"},
                legend: {position: "top"},
                hAxis: {
                    title: 'Amount of activity',
                    minValue : 0,
                    format: '0'
                },
                vAxis: {
                    title: 'Amount of users',
                    minValue : 0,
                    format: '0'

                },
                explorer: {
                    maxZoomOut:0,
                    maxZoomIn: 50,
                    //keepInBounds: true,
                    axis: 'horizontal'
                }

            };
            var chart = new google.visualization.ColumnChart(document.getElementById(sectionname));

            function selectHandler() {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    var rate_value=$('input[name=dom_optradio]:checked', '#border-input-badge0').val();
                    console.log(rate_value);
                    if(rate_value!=undefined)
                        document.getElementById("input"+rate_value.toString()+"-badge0").value = data.getValue(selectedItem.row, 0);
                    else
                    {   var AlertMsg='<div class="alert alert-warning">'+
                        '<strong>Tip!</strong> Choose activity you want to select border for at first.</div>';
                        document.getElementById("alert").insertAdjacentHTML('beforeend',AlertMsg);
                    }
                }
            }
            google.visualization.events.addListener(chart, 'select', selectHandler);
            chart.draw(view, options);
        }

    });
}

//function to create list of elements
//create table to show elements details
function getDetailsBadgeList() {
    var url = 'http://eclipsewildflyserver-gobanit.rhcloud.com/.../badges';
    var table = document.getElementById("myTable");
    jQuery(function($){
        $.getJSON(url, function (data) {
            // var data=jQuery.parseJSON(data2);
            var len=data.length;
            for (i=0;i<len;i++)
            {   var row = table.insertRow(i+1);

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);

                cell1.innerHTML = data[i].id;
                cell2.innerHTML = data[i].name;
                var created= new Date(data[i].created);
                var mydate=created.toString("MMM yyyy").split(" ");
                cell3.innerHTML = mydate[1]+' '+mydate[2]+' '+mydate[3];
                cell4.innerHTML = data[i].grants;
                cell5.innerHTML = '<a value="Detail" role="button" class="btn btn-sm btn-default" href="detail.html?id='+data[i].id+'"> <span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span> Detail </a></form>'+
                    '<a role="button" class="btn btn-sm btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit </a>'+
                    '<a role="button" class="btn btn-sm btn-default"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete </a>'
            }
        });
    });
}

//function to extend option select
function addOptionToSelect(){
    var url='http://eclipsewildflyserver-gobanit.rhcloud.com/BadgeAssignToolWebApp/rest/FrontendInterface/activity_types';
    jQuery(function($){
        $.getJSON(url, function (data) {
            var select=document.getElementById("activitySelect");
            var len=data.length;
            for (i=0;i<len;i++) {
                var new_option= document.createElement("option");
                new_option.text=data[i].id;
                select.add(new_option);
            }
        });
    });
}