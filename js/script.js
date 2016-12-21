


$(document).ready(function () {
    var div = $('.result');
    var error = $('.error').hide();

    $('#sendForm').on('submit', function(e){
        e.preventDefault();
        var str = 'http://api.worldoftanks.ru/2.0/account/list/?application_id=171745d21f7f98fd8878771da1000a31&';
        var search = $(this).serialize();
        var finishLink = str + search;
        var arrData = [];

            $.ajax({
                    url: finishLink,
                    type: 'post',
                    data: "data"
                })
                .done(function(response) {
                    arrData = [];
                    console.log(response);
                    var datas = response.data;
                    if(datas.length > 0){
                        if(error.is(':visible')){ error.toggle(); }

                        datas.forEach(function(item, i, arr) {
                            arrData.push(item);
                        })
                    }else{
                        error.toggle();
                    }
                })

        var nameArr = [];
        setTimeout(function(){
            arrData.forEach(function(item){
                nameArr.push(item.nickname);                   
            })
        }, 500);    

            setTimeout(function(){
                div.empty()
                 var jointext = nameArr.join('<br>');
                div.append(jointext);
            }, 600); 
            
        })

        



        
});


