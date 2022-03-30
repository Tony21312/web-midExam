$(function(){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    let topicCount = topic.length;
    let millisecsPerDay = 24*60*60*1000;//86400 seconds each day
    for(var x=0;x<topicCount;x++){
        if(x>1){
            $("#courseTable").append("<tr>"+
            `<td>${x+1}</td>`+
            `<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString().slice(5)}</td>`+
            `<td>${topic[x]}</td>`+
            "</tr>");
        }
        else{
            $("#courseTable").append("<tr style = 'color:red'>"+
            `<td>${x+1}</td>`+
            `<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString().slice(5)}</td>`+
            `<td>${topic[x]}</td>`+
            "</tr>");
        }

    }
    });