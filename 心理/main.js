$(function(){
    //做到第幾題
    var currentQuiz = null;
    //當按下按鈕後當按下按鈕後，要做的事
    $("#startButton").on("click",function(){
        if(currentQuiz==null){
            currentQuiz = 0;
            debugger;
            $('#question').text(questions[0].question);//show the question
            $('#options').empty();//empty the options
            questions[0].answers.forEach(function(element,index,array){
                $("#options").append(`<input name = 'options' type = 'radio' value = '${index}'><label>${element[0]}</label><br></br>`);
            });
            $("#startButton").attr("value","Next");
        }
        else{
            //開始後，從這裡繼續
            $.each($(":radio"),function(i,val){
                if(val.checked){
                    //check if it is the last question and show the result
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        var finalResult = questions[currentQuiz].answers[i][1];//to the final result
                        $("#question").text(finalAnswers[finalResult][0]);//show the title of final result
                        $("#options").empty();//empty the options
                        $("#options").append(`${finalAnswers[finalResult][1]}<br></br>`);//show the text of final result
                        currentQuiz = null;
                        $("#startButton").attr("value","重新開始");
                    }
                    else{
                        //指定下一題，原始資料從1開始，所以要-1
                        currentQuiz = questions[currentQuiz].answers[i][1]-1;
                        //顯示新的題目
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
                        });
                    }
                    return false;//break the for loop
                }
            });
        }
    });
});