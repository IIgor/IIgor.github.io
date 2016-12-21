new Vue({
    el: '#wrapper',
    data: {
        myidWg: 'fedcdf58732a2c186096d0aed13e0131',
        allIdWg: '171745d21f7f98fd8878771da1000a31',
        link: 'http://api.worldoftanks.ru/2.0/account/list/?application_id=fedcdf58732a2c186096d0aed13e0131&search=',
        login: 'https://api.worldoftanks.ru/wot/auth/login/?application_id=fedcdf58732a2c186096d0aed13e0131&redirect_uri=https%3A%2F%2Fdevelopers.wargaming.net%2Freference%2Fall%2Fwot%2Fauth%2Flogin%2F',
        statistic: 'https://api.worldoftanks.ru/wot/account/info/?application_id=fedcdf58732a2c186096d0aed13e0131&account_id=',
        erroe: false,
        names: [],
        info: [],
    
    },
    methods: {
        // search all names
        getName: function(){
            var input = document.querySelector('.inputName').value;
            this.$http.get(this.link + input).then(function(respons){
                this.names = respons.data.data;
            })
        }, 
        // search all info about users
        getFullInfo: function(e){
            var accountId = e.target.getAttribute('href');
            this.$http.get(this.statistic + accountId).then(function(respons){
                var dataObj = respons.data.data
                this.info = dataObj[accountId];
            })
        }
    }
})