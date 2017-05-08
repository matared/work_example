/**
 * Created by martina on 7. 5. 2017.
 */
//This project was aimed at displaying journal numbers, in which it was necessary to graphically separate
// blocks belonging to individual articles.

//function to switch between pages to page where article is placed
function findArticle(art_num,selectObj,art_temp_arr){
   //check any blocks belong to article
    if(art_temp_arr[art_num].groups.length > 0) {
        document.getElementById("left-page-num").value = art_temp_arr[art_num].groups[0].page;
        articlePageSwitch();
    }
    else {
        //if not view alert a change color of button
        document.getElementById("empty-art-alert").style.visibility = "visible";
        document.getElementById("empty-art-alert").style.position = "static";
        selectObj.style.backgroundColor = "red";
    }
}

//fucntion to create Popover for each block
function loadPopover(art_num, group_num, selectObj, art_temp_arr) {
    //console.log("neico neico");
    var page_number = art_temp_arr[art_num].groups[group_num].page.toString();
    var keywords = "";
    var $popoverInbox = $(selectObj).popover({
        placement: 'right',
        title:  '<b>Article details</b>',
        content: '<div class="article-details"> ' +
        '<form>' +
        '<div class="form-group">' +
        '<table class="table table-bordered">' +
            //...
        '</table>' +
        '<textarea onchange="changeText(' + art_num.toString() + ',' + group_num.toString() + ',this);" ' +
        'class="form-control art-text" rows="5">' + art_temp_arr[art_num].groups[group_num].text.toString() +
        '</textarea></div>' +
        '</form>' +
        '</div>',
        html: true,
        animation: true
    });
}

//function to add new article and its marker
function newArticle(art_temp_arr){
    document.getElementById("markers-panel").innerHTML += '<a onclick="findArticle('+art_temp_arr.length+',this)" class="btn btn-info" ><b>Art.'+ art_temp_arr.length+'</b></a>';
    var new_json  =   '{"groups": [], "color" : "'+getRandColor()+'" }';
    //console.log(new_json);

    art_temp_arr.push(JSON.parse(new_json));
    document.getElementsByClassName("article-num").max = art_temp_arr.length-1;
}
