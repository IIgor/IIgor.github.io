
var vm = new Vue({
    el: '#wrapper',
    data: {
        myidWg: 'fedcdf58732a2c186096d0aed13e0131',
        allIdWg: '171745d21f7f98fd8878771da1000a31',
        link: 'http://api.worldoftanks.ru/2.0/account/list/?application_id=fedcdf58732a2c186096d0aed13e0131&search=',
        login: 'https://api.worldoftanks.ru/wot/auth/login/?application_id=fedcdf58732a2c186096d0aed13e0131&redirect_uri=https%3A%2F%2Fdevelopers.wargaming.net%2Freference%2Fall%2Fwot%2Fauth%2Flogin%2F',
        statistic: 'https://api.worldoftanks.ru/wot/account/info/?application_id=fedcdf58732a2c186096d0aed13e0131&account_id=',
        listTanks: 'https://api.worldoftanks.ru/wot/encyclopedia/tanks/?application_id=fedcdf58732a2c186096d0aed13e0131&language=ru',
        TanksUser: 'https://api.worldoftanks.ru/wot/account/tanks/?application_id=fedcdf58732a2c186096d0aed13e0131&account_id=',
        newLinktank : 'https://api.worldoftanks.ru/wot/encyclopedia/vehicles/?application_id=fedcdf58732a2c186096d0aed13e0131',
        infoTankStatUser: 'https://api.worldoftanks.ru/wot/tanks/stats/?application_id=fedcdf58732a2c186096d0aed13e0131&account_id=',
        achievements: 'https://api.worldoftanks.ru/wot/account/achievements/?application_id=demo&account_id=',
        
        erroe: false,
        noneUser: false,
        nicknameUser: '',
        namesUser: [],
        info: [],
        statisticArr: [],
        showInfo: false,
        isError: false,
        showUsers: false,
        showAllTanksList: false,
        showUserTanks: false,
        loadingPage: true,
        loadLogo: true,
        loadTankInfo: false,
        
        inputName: '',
        tankArr: [],
        nations: [],
        listTanksUser: [],
        listSortUserTanks: [],
        thisClickUserId: '',
        arrTankUser: [],
        clickTankGetId: '',

        // nationsUSSR: [],
        // nationsGermany: [],
        // nationsUSA: [],
        // nationsUK: [],
        // nationsFrance: [],
        // nationsCzech: [],
        // nationsSweden: [],
        // nationsJapan: [],
        // nationsChina: [],
        achievementsArrInfo: [],

        lastUserObj: [],
  
    
    }, 
    methods: {
        closePoppup: function(){
            this.loadingPage = !this.loadingPage
            this.loadTankInfo = !this.loadTankInfo
            this.arrTankUser = []
        },
        showMethodFullInfo: function(e, tankId){
            this.arrTankUser = []
            
            var newBlc = e.target.nextElementSibling;
            var tnkId = e.target.getAttribute('data-tankId')
            this.clickTankGetId = tnkId

            console.log(tnkId);

            
            this.loadingPage = !this.loadingPage
            this.loadTankInfo = !this.loadTankInfo

            this.$http.get(this.infoTankStatUser + this.info.account_id + '&tank_id=' + tnkId).then(function(respons){
                var data = respons.data.data
                var id = data[this.info.account_id][0]
                
                this.arrTankUser.push(id)

            })    
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
         achievementsMethod: function(){
            this.$http.get(this.achievements + this.info.account_id).then(function(respons){
                var dataObj = respons.data.data
                var achievementsInfo = dataObj[this.info.account_id]
                this.achievementsArrInfo = achievementsInfo
                // this.tankArr = dataObj;
                console.log(this.achievementsArrInfo);

            })
        },
        getTechniksUser: function(user){
            var userId = user
            this.$http.get(this.TanksUser + userId).then(function(respons){
                    var dataObj = respons.data.data
                    this.listTanksUser = dataObj[userId]
                    
                    // sort tanks on user
                    this.sortUserTanks();
                             
                })
        },
        // search all info about users
        getFullInfo: function(e){
            var accountId = e.target.getAttribute('href');
            this.inputName = e.target.innerHTML;

           
            
            this.$http.get(this.statistic + accountId).then(function(respons){
                var dataObj = respons.data.data
                this.info = dataObj[accountId]
                console.log(this.info)
                this.showInfo = true
                this.showUsers = false
                this.statisticArr = this.info.statistics;
                this.showUserTanks = false
                this.listSortUserTanks = []

                // this.nicknameUser.push(dataObj[accountId].nicknameUser)
                // console.log(typeof this.nicknameUser)
                this.getTechniksUser(this.info.account_id)
                this.achievementsMethod()
            })
            // console.log(this.statisticArr)
            

            var lastUser = {
                name: this.inputName,
                id: accountId
            };
            
            var serialObj = JSON.stringify(lastUser); //сериализуем его

            
            localStorage.setItem("last", serialObj); //запишем его в хранилище по ключу "myKey"
            
            

        },
        sortUserTanks: function(){
            var list = this.listTanksUser
            var list1 = []
            var arrtank = this.tankArr
            console.log(list);

            list.forEach(function(el, index, array){
                var local = {}
                var idTank = el.tank_id
                var element = el
                var tankInfo = arrtank[idTank]
                if(arrtank[idTank] == undefined){
                    return true
                }else{
                    element.tankInfo = tankInfo
                    list1.push(element)
                }
               
            })

            this.listSortUserTanks.push(list1);
            this.showUserTanks = !this.showUserTanks
            
           
        },
        getListTanks: function(e){

            this.$http.get(this.newLinktank).then(function(respons){
                var dataObj = respons.data.data
                this.tankArr = dataObj;
                // console.log(dataObj);

            })
        },
        
        master: function(key){
             if(key == 4){
                return 'img/class-ace.png';
             }else if(key == 1){
                return 'img/class-1.png';   
             }else if(key == 2){
                return 'img/class-2.png';   
             }else if(key == 3){
                return 'img/class-3.png';   
             }
        },
        getLastFindUser: function(){
            var returnObj = JSON.parse(localStorage.getItem("last"))
            if(returnObj == null){
                return false;
            }else{
                this.noneUser = true
            }

            this.lastUserObj = returnObj
            console.log(this.lastUserObj);
        },
       
        
    },
    
    created: function(){
        this.getListTanks();
        this.getLastFindUser();
    },
    watch: {
        tankArr: function(){
            this.loadLogo = !this.loadLogo
            this.loadingPage = !this.loadingPage
        }
    },

   
})

Vue.component('pop', {
  // определяем входной параметр
  props: ['message'],
  // как и другие данные, входной параметр можно использовать
  // внутри шаблонов (а также и в методах, обращаясь через this.message)
  template: '\
        <div>\
            <div class="img_tank"><img v-bind:src="objTank[0].tankInfo.images.big_icon" /></div>\
            <div class="items">Максимум уничтожено за бой:  <span>{{ test.max_frags }}</span></div>\
            <div class="items">Всего боев: <span>{{ infoAll.battles }}</span></div>\
            <div class="items">Уничтожено техники: <span>{{ infoAll.frags }} ({{ (infoAll.frags / infoAll.battles).toFixed(2) }} )</span></div>\
            <div class="items">Победы: <span>{{ infoAll.wins }} ({{   ((infoAll.wins * 100) / infoAll.battles).toFixed(2) + "%"  }})</span></div>\
            <div class="items">Поражения: <span>{{ infoAll.losses }} ({{   ((infoAll.losses * 100) / infoAll.battles).toFixed(2) + "%"  }})</span></div>\
            \
            <div class="items">Средний опыт за бой: <span>{{ infoAll.battle_avg_xp }}</span></div>\
            <div class="items">Нанесено повреждений: <span>{{ infoAll.damage_dealt }}</span></div>\
            <div class="items">Средний дамаг: <span>{{ (infoAll.damage_dealt / infoAll.frags).toFixed()  }}</span></div>\
           \
        </div>\
  ',
  data: function(){
    return {
        id: vm.clickTankGetId,
        arrUsertanks: vm.listSortUserTanks,
        objTank: [],
        arrTank: vm.arrTankUser,
        loadingPage: vm.loadingPage,
        loadLogo: vm.loadLogo,
        test: [],
        infoAll: [],
        
    }  
  },
  methods: {
      getMastery: function(){
          var len = this.arrUsertanks[0]
          var id = this.id
          var obj = []

            len.forEach(function(el, index, arr){
                if(el.tank_id == id){
                     obj.push(arr[index]) 
                }
            })
            this.objTank = obj
      },
      getInfoWithArrTank: function(vals){
          
          if(this.arrTank.length == 0){
              this.loadingPage = true
                this.loadLogo = true
                console.log('no info');
          }else{
              var arrr = this.arrTank[0]

                this.test = arrr
                this.infoAll = arrr.all
          }

    },
    

  },
  created: function(){
        this.getMastery();
    },
    watch: {
        arrTank: function(){
            if(this.arrTank.length == 0){
                console.log('NAN');
            }else{
                this.getInfoWithArrTank();
            }
        }
    }
})

