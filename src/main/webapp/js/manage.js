

$("#pr").click(function () {
    $("#ys li").eq(page).removeClass("active");
    if(page<=1)
        return;
    choose(--page);
});
$("#ne").click(function () {
    $("#ys li").eq(page).removeClass("active");
    if(all<=page)
        return;
choose(++page);
})
   choose=function (pa) {
        $("#ys li").eq(page).removeClass("active");
        page=pa;
        $.ajax({
            url:"/SCGL/fanye_SCAction.html",
            type:"post",
            data:{pageNo:page},
            success: function (data) {
                console.log(data);
                var jsdata=JSON.parse(data);
                var data1 = {dataList: jsdata}
                var Str = template("dataTemplate", data1);
                $("#box").html(Str);
                $("#ys li").eq(page).attr("class","active");
            }
        })

    }


$("#box").on("click", "a", function () {

    var box = document.getElementById("box");
    var trlist = box.getElementsByTagName("tr");
    var alist;
    for (var i = 0; i < trlist.length; i++) {
        alist = trlist[i].getElementsByTagName("a");
        for (var j = 0; j < alist.length; j++) {
            alist[j].setAttribute("data-index", "" + i);
        }
    }
    var choose = $(this).attr('data-val');
    var id = parseInt($(this).attr('data-id'));
    var index = parseInt($(this).attr('data-index'));

    if (choose == "bj") {

    } else {

        $.ajax({
            url: "/SCGL/delet_SCAction.html",
            type: "post",
            data: {de: id},
            success: function (data) {
                if (data == "success") {
                    document.getElementById('box').deleteRow(index);
                    for(var i=1;i<=all;i++){
                        $("#ys li").eq(1).remove();
                    }
                    init();
                } else {
                    alert("删除失败,你的蔬菜在订单中");
                }

            }
        })
    }


})