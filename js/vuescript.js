new Vue({
    el: '#wrapper',
    data: {
        myidWg: 'fedcdf58732a2c186096d0aed13e0131',
        allIdWg: '171745d21f7f98fd8878771da1000a31',
        link: 'http://api.worldoftanks.ru/2.0/account/list/?application_id=fedcdf58732a2c186096d0aed13e0131&search=',
        login: 'https://api.worldoftanks.ru/wot/auth/login/?application_id=fedcdf58732a2c186096d0aed13e0131&redirect_uri=https%3A%2F%2Fdevelopers.wargaming.net%2Freference%2Fall%2Fwot%2Fauth%2Flogin%2F',
        statistic: 'https://api.worldoftanks.ru/wot/account/info/?application_id=fedcdf58732a2c186096d0aed13e0131&account_id=',
        listTanks: 'https://api.worldoftanks.ru/wot/encyclopedia/tanks/?application_id=fedcdf58732a2c186096d0aed13e0131&language=ru',
        erroe: false,
        namesUser: [],
        info: [],
        statisticArr: [],
        showInfo: false,
        isError: false,
        showUsers: false,
        inputName: '',
        tankArr: [],
        nations: [],

        nationsUSSR: [],
        nationsGermany: [],
        nationsUSA: [],
        nationsUK: [],
        nationsFrance: [],
        nationsCzech: [],
        nationsSweden: [],
        nationsJapan: [],
        nationsChina: [],
        testArr: [],
       
        
    
    },
    methods: {
        sortTank: function(obj) {
                var natArrLevel = []
                
                for(var i = 1; i <= 10; i++){
                    for(item in obj){
                        var b = obj[item].level
                        if(b == i){
                           natArrLevel.push(obj[item])
                        }
                    }
                }
                this.testArr.push(natArrLevel)
            },
        sortTanks: function(){
            var a = this.tankArr
            //germany usa france uk czech sweden japan china
            
            for(var key in a){
                switch(a[key].nation) {
                    case 'ussr':

                       this.nationsUSSR.push(a[key])
                       
                    //    console.log(this.testArr);
                       break;
                    case 'germany':
                        this.nationsGermany.push(a[key])
                        
                        break;
                    case 'usa':
                        this.nationsUSA.push(a[key])
                        break;
                    case 'france':
                        this.nationsFrance.push(a[key])
                        break;
                    case 'uk':
                        this.nationsUK.push(a[key])
                        break;
                    case 'czech':
                        this.nationsCzech.push(a[key])
                        
                        break;
                    case 'sweden':
                        this.nationsSweden.push(a[key])
                        
                        break;
                    case 'japan':
                        this.nationsJapan.push(a[key])
                        
                        break;
                    case 'china':
                        this.nationsChina.push(a[key])
                        
                        break;
                }
                // console.log(a[key]);
            }
            // console.log(this.nationsUSSR);
            
        this.sortTank(this.nationsUSSR)
        this.sortTank(this.nationsGermany)
        this.sortTank(this.nationsChina)
        this.sortTank(this.nationsJapan)
        this.sortTank(this.nationsSweden)
        this.sortTank(this.nationsCzech)
        this.sortTank(this.nationsUK)
        this.sortTank(this.nationsFrance)
        this.sortTank(this.nationsUSA)

        console.log(this.testArr);
        
        
        

            
        },
        getDay : function(date, exactly){
            function converDate(date){
                var w = new Date(+date * 1000)
                return w;
            }
            var d = converDate(date);
            if(exactly){
                return moment(d).locale("ru").format('LLL')
            }else{
                return moment(d).locale("ru").format('L')
            }
            
        },
        // search all names
        getName: function(){
            var input = this.inputName;
            if(input.length < 3){
                this.showUsers = false
                this.isError = true
                this.info = []
                this.showInfo = false
                return false
            }
            this.$http.get(this.link + input).then(function(respons){
                if(respons.data.data.length > 0){
                    this.namesUser = respons.data.data;
                    this.showUsers = true,
                    this.isError = false
                }else{
                    this.showUsers = false
                    this.isError = true
                    this.info = []
                    this.showInfo = false
                }
                
            })
        }, 
        // search all info about users
        getFullInfo: function(e){
            var accountId = e.target.getAttribute('href');
            this.inputName = e.target.innerHTML;
            
            this.$http.get(this.statistic + accountId).then(function(respons){
                var dataObj = respons.data.data
                this.info = dataObj[accountId];
                this.showInfo = true
                this.showUsers = false
                this.statisticArr = this.info.statistics;
                
            })
        },
        getListTanks: function(e){
            this.$http.get(this.listTanks).then(function(respons){
                var dataObj = respons.data.data
                this.tankArr = dataObj;
                this.sortTanks();
                // this.sortTank(this.nationsUSSR);
                
                // console.log(this.tankArr);
            })
        }
        
    },
    

})