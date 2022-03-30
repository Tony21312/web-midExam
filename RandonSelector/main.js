function choose() {
    $(function () {
        //        alert("Hi");
        var numberOfListNumber = $("li").length;

        var randomChildNumber = Math.floor(Math.random() * numberOfListNumber);
        //        debugger;
        $("h1").text($("li").eq(randomChildNumber).text());
        if (randomChildNumber === 0) {
            $("img").attr({
                src: "下載.jfif",
            });
            $("div").text($("img").attr("alt"));
        }
        if (randomChildNumber === 1) {
            $("img").attr({
                src: "rice.jfif",
            });
            $("div").text($("img").attr("alt"));
        }
        if (randomChildNumber === 2) {
            $("img").attr({
                src: "dumpling.jpg",
            });
            $("div").text($("img").attr("alt"));
        }
    });
}
function add(){
    
}