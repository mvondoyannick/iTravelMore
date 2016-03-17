//id du testeur
var id = '0.0.1.e';

var contributors = {
    'developers' : {
        '1' : {
            'name'      :'MVONDO Yannick',
            'fonction'  :'Main Developer',
            'module'    :'HTML5, CSS3, Jquery, Framework7, Designer, Map designer',
            'photo'     :'',
            'status'    :'Active'
        },
        '2' : {
            'name'      :'BIGA TANG Christian',
            'fonction'  :'Analyst, DB & CISCO admin',
            'module'    :'Not defined',
            'photo'     :'',
            'status'    :'???'
        },
        '3' : {
            'name'      :'Simplice Samain',
            'fonction'  :'Developer',
            'module'    :'HTML5, CSS3, Jquery, Framework7',
            'photo'     :'',
            'status'    :'Awaiting'
        },
        '4' : {
            'name'      :'MIASSE Liliane',
            'fonction'  :'Tester',
            'module'    :'Android Bundle tester',
            'photo'     :'',
            'status'    :'Active'
        }
    },
    'technologies' : {
        'web': {
            'design'    :'',
            'api'       :'CodeIgniter 3.0.1',
            'javascript':'jquery, framework7 js api'
        },
        'maps': {
            'engine'    :'OpenStreetMap',
            'API'       :'MapBox'
        },
        'databases': {
            'api DB'     :'Mysql',
            'realtime DB':'Google Firebase',
            'HTML DB API':'WebSQL'
        },
        'weather':{
            'weather API':'OpenStreetWeather'
        },
        'Deployment':{
            'development':'Heroku deploy',
            'production' :'Firebase deploy'
        }
    }
}

//defintion des classes de voyages
var classe = {
    'premiere':{
        'nom':'Premiere',
        'prix':'9000'
    },
    'premium':{
        'nom':'Premium',
        'prix':'6000'
    },
    'etudiant':{
        'nom':'Etudiant',
        'prix':'4000'
    },
    'lowcost':{
        'nom':'Low Coast',
        'prix':'3000'
    }
}

//definiton de la devise en JSON
var device = {
    'device':'CFA',
    'continent_fr':'Afrique Centrale',
    'continent_en':'Central Africa',
    'pays_fr':'Cameroun',
    'pays_en':'Cameroon'
}

//definition du type de voyage en JSON
var typevoyage = {
    'aller':'Aller',
    'aller_retour':'Allée et retour'
}

//definition des information de douala en utilisant JSON
var douala = {
    'nom':'Douala',
    'heure_depart': {
        'matin':'06h00',
        'soir':'14h45'
    }
}

//definitioin de yaoundé en utilisant JSON
var yaounde = {
    'nom':'Yaounde',
    'heure_depart': {
        'matin':'10h00',
        'soir':'19h45'
    }
}

/* ========= fin des déclarations ==========*/

// Init App
var myApp = new Framework7({
    modalTitle: '<i class="fa fa-map-marker"></i> &nbsp; TravelMore',
    tapHold: true,
    // Enable Material theme
    material: true,
    swipePanel: 'left',
    swipePanelCloseOpposite: false,
    modalPreloaderTitle: 'chargement ...',
    hideNavbarOnPageScroll: false,
    materialRipple: true,
    //hideNavbarOnPageScroll: false,
    hideToolbarOnPageScroll: true,
    hideTabbarOnPageScroll: true,
    fastClicks: true

});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
});
// Add another view, which is in right panel
var rightView = myApp.addView('.view-right', {
});

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});

$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});


/* ===== ouverture d ela zone de connexion ===== */
$$('.login').on('click', function () {
    myApp.loginScreen();
});

/* ==== si on maintient l'ecran pendant une certaine periode de temps ==== */
$$(document).on('taphold', function(){

   navigator.vibrate(250);
});


//========================================================================
//========================================================================
//===============declation de toutes les fonctions========================
//========================================================================
//========================================================================

/**
 * @details fonction de bienvenu au client
 * @param serviceid
 * @param depart
 * @param arrive
 * @param classe
 * @param heure
 * @param type
 * @param nom
 * @param prenom
 * @param email
 * @param phone
 */
function welcomeUser(nom){
    if (typeof localStorage.getItem('nom') == 'object'){
        myApp.addNotification({
            message:'nouvel abonné',
            hold: 3500,
            closeOnClick: true
        });
    }
    if (typeof localStorage.getItem('nom') == 'string'){

        //navigator.vibrate(250);
        myApp.confirm('Confirmer votre départ de '+localStorage.getItem('depart')+' à '+localStorage.getItem('arrive'),localStorage.getItem('nom')+' '+localStorage.getItem('prenom'),function(){
            myApp.alert('Merci, tout est OK');
        });
    }
}

/**
 * @details permet de retourner la position d'un client en fonction de son adresse IP
 * @param ipadress
 */
function returnPosition(){
    //on inclus l'API de here.com
    http://ip-api.com/json
        $.ajax({
            method: 'GET',
            url:    'http://ip-api.com/json',
            success: function(data){
                console.log(data);
                myApp.addNotification({
                    message: " <i class='fa fa-mixcloud'></i> localisé à : "+data.city,
                    hold: 10000,
                    button:{
                        text: 'Voir'
                    },
                    onClick: function(){
                        console.log('Ouverture autre page carte affichage');
                    }
                })
            },
            error: function(){
                console.log("Erreur");
            }
        });
}

/**
 * @details retourne la date en cours
 */
function getDate(){
    var n = new Date();
    var jour, mois, an, heure, minute, seconde, date;

    //on cree l'objet date
    var dateObj = {
        'jour'    : n.getDay(),
        'mois'    : n.getMonth(),
        'an'      : n.getFullYear(),

        //details supplementaire sur l'heure
        'heure'   : n.getHours(),
        'minute'  : n.getMinutes(),
        'seconde' : n.getSeconds(),

        //la date en entier
        'date'    : n.getDate(),
    }

    //on retourne les informations
    return dateObj;
}


/**
 * @details obtention de la cle serviceid provenant de l'API
 */
function serviceid(){

    if (typeof localStorage.getItem('serviceid') == 'object'){
        //on demande une nouvelle cle de service id a l'API

        $.ajax({
            url:'http://api-travel-more.herokuapp.com/index.php/api/serviceid',
            success:function(data){
                //on enregistre la clé dans l'application
                localStorage.setItem('serviceid', data.id);

                myApp.addNotification({
                    message:    data.id
                });
            },
            error:function(err){
                navigator.vibrate([250,250]);
                myApp.addNotification({
                    message:    'Authentification impossible, serveur indisponible.',
                    button:{
                        text: 'Fermer'
                    }
                });
            }
        });

    }
    if (typeof localStorage.getItem('serviceid') != 'object') {
        myApp.addNotification({
            message:    'Cette application a été identifiée.',
            hold: 3500,
            closeOnClick: true,
            button:{
                text: 'Fermer',
                color: 'red',
                close:true
            }
        });
    }
}

var permission = function(serviceid){
    //initialisation des service de permission des modules
    this.serviceid      = serviceid;
    this.position   = false;
    this.country    = false;
    this.status     = false;
    this.date       = '';
    this.moduleName = '';
}

/**
 *
 * @param serviceid
 */
var travel = function (serviceid){
    //initialisation des informations du client
    this.serviceid  = serviceid;
    this.clientid   = localStorage.getItem('clientid');
    this.nom        = localStorage.getItem('nom');
    this.prenom     = localStorage.getItem('prenom');
    this.email      = localStorage.getItem('email');
    this.phone      = localStorage.getItem('phone');
    this.info       = localStorage.getItem('info');

    //initialisation des services du voyage
    this.depart     = localStorage.getItem('depart');
    this.arrive     = localStorage.getItem('arrive');
    this.classe     = localStorage.getItem('classe');
    this.heure      = localStorage.getItem('heure');
    this.type       = localStorage.getItem('type');
    this.time       = localStorage.getItem('time');

    //les informations sur la date en cours
    var d = new Date();
    this.date = d.getFullYear()+'/'+ (d.getMonth()+1)+'/'+ d.getDate();
    this.heure = d.getHours()+'/'+ d.getMinutes()+'/'+ d.getSeconds();

    //envoi des informations
    this.send = function(){
        //on envoi les données vers le serveur API

        //ajax post
        $.ajax({
            url:'http://127.0.0.17:4000/api/test',
            method:'POST',
            headers:{},
            data:{
                'serviceid' :this.serviceid,
                'nom'       :this.nom,
                'prenom'    :this.prenom,
                'email'     :this.email,
                'phone'     :this.phone,
                'info'      :this.info,
                'depart'    :this.depart,
                'arrive'    :this.arrive,
                'classe'    :this.classe,
                'heure'     :this.heure,
                'type'      :this.type,
                'time'      :this.time,
                'date'      :this.date,
                'heure'     :this.heure
            },
        success: function(data){
            console.log(data);
        },
            error:function(){
                myApp.addNotification({
                    message: 'erreur'
                });
            }
        });
    }

    /**
     * @details initalise l'application, verifie si serviceid est encore valable
     */
    this.init = function(){

    }

    /**
     * @details initialisation de paypay sur le terminal client
     */
    this.wepayInit = function(){
        $.ajax({
            url:    'http://127.0.0.1:4000/api/wepayInit',
            method: 'POST',
            headers:{},
            data:{
                'serviceid' :this.serviceid,
                'clientid'  :this.clientid
            },
            success:function(data){
                console.log(data);
                if (data.message == 'error') {
                    //une erreur est survenue, on redirige le client

                }
            },
            error:function(err){
                console.log('erreur wepayInit, errCode : '+err);
            }
        });

    }

    /**
     * @details recupere toutes les informations enregistré dans le terminal
     */
    this.wepayGet = function(){

    }

    /**
     * @details envoi les informations verifiées vers le serveur API
     */
    this.wepaySend = function(){

    }


    this.wepayCreate = function(){

    }

    /**
     * @details demande au serveur d'API de verifier le clientid payway enregistré dans un terminal
     */
    this.paywayVerify = function(clientid){

    }

    /**
     * @details supprimme les informations payway d'un client et les bloques sur le serveur
     */
    this.paywayDelete = function(clientid){

        this.bloquer = false;  //on initialise a false l'etat bloqué du telephone
        this.clientid   = clientid;

        return this.bloquer+' -- '+this.clientid;
    }

}

var test = new travel(localStorage.getItem('serviceid'));

//on demande acces au serveur d'API
serviceid();

//verification de la presence des données du client
//(localStorage.getItem('nom'));

//retourne la position du client
returnPosition();

// Callbacks for specific pages when it initialized
/* ===== Modals Page events  ===== */
myApp.onPageInit('modals', function (page) {
    $$('.demo-alert').on('click', function () {
        myApp.alert('Hello!');
    });
    $$('.demo-confirm').on('click', function () {
        myApp.confirm('Are you feel good today?', function () {
            myApp.alert('Great!');
        });
    });
    $$('.demo-prompt').on('click', function () {
        myApp.prompt('What is your name?', function (data) {
            // @data contains input value
            myApp.confirm('Are you sure that your name is ' + data + '?', function () {
                myApp.alert('Ok, your name is ' + data + ' ;)');
            });
        });
    });
    $$('.demo-login').on('click', function () {
        myApp.modalLogin('Enter your username and password', function (username, password) {
            myApp.alert('Thank you! Username: ' + username + ', password: ' + password);
        });
    });
    $$('.demo-password').on('click', function () {
        myApp.modalPassword('Enter your password', function (password) {
            myApp.alert('Thank you! Password: ' + password);
        });
    });

    $$(document).on('taphold', function () {
        myApp.alert('Tap hold fired!');
    });

    $$('.demo-modals-stack').on('click', function () {
        // Open 5 alerts
        myApp.alert('Alert 1');
        myApp.alert('Alert 2');
        myApp.alert('Alert 3');
        myApp.alert('Alert 4');
        myApp.alert('Alert 5');
    });
    $$('.demo-picker-modal').on('click', function () {
        myApp.pickerModal('.picker-modal-demo');
    });
});

/* ===== Preloader Page events ===== */
myApp.onPageInit('preloader', function (page) {
    $$('.demo-indicator').on('click', function () {
        myApp.showIndicator();
        setTimeout(function () {
            myApp.hideIndicator();
        }, 2000);
    });
    $$('.demo-preloader').on('click', function () {
        myApp.showPreloader();
        setTimeout(function () {
            myApp.hidePreloader();
        }, 2000);
    });
    $$('.demo-preloader-custom').on('click', function () {
        myApp.showPreloader('My text...');
        setTimeout(function () {
            myApp.hidePreloader();
        }, 2000);
    });
});


/* ============ Configuration de wepay ============ */
myApp.onPageInit('wepay', function (page) {
    console.log('changement de wepay');
    
    //si le client click sur l'etape suivante
    $$('.wepay-create').on('click', function(){
    	//on recupere les informations qui ont ete saisie
    	var wepayCreate = localStorage.getItem('f7form-wepay');
    	
    	//on effectue les differents controles
    	if (JSON.parse(wepayCreate).nom == '' || (JSON.parse(wepayCreate).nom).length == 0){
    		myApp.alert('Impossible de continuer, le nom est invalide');

    	}
    	if (JSON.parse(wepayCreate).phone == '' || (JSON.parse(wepayCreate).phone).length == 0){
    		myApp.alert('Impossible de continuer, le nom est invalide');
    	}
    	if ((JSON.parse(wepayCreate).phone != '') && (JSON.parse(wepayCreate).phone).length != 0 && JSON.parse(wepayCreate).nom != '' && (JSON.parse(wepayCreate).nom).length != 0){
    		//wepay-paymentsolution.html
    		mainView.router.load({ url: 'wepay-paymentsolution.html', ignoreCache: false, reload: true });
    		
    	}
        //localStorage.setItem('arrive',JSON.parse(arrive).arrive);
    });
});


/* ============ authentification de wepay ============ */
//on commence a rechercher la presence d'une clé wepayid
myApp.onPageInit('wepay-auth', function (page) {
    console.log('changement de wepay auth');

    //on recherche dans le stockage local
    if (typeof localStorage.getItem('clientid') == 'object'){
        //la clé clientid n'existe pas dans ce cas on le demande s'il veut creer un compte wepay
        myApp.prompt('Entrez votre mot de passe wepay','Mot de passe wepay',
            function () {
                //tout va bien
            },
            function () {
                //le client a annulé l'action
        });
    }
    if (typeof localStorage.getItem('clientid') == 'string'){
        myApp.prompt('Entrez votre mot de passe wepay','Mot de passe wepay',
            function (e) {
                //tout va bien, on envoi l'information sur le serveur
                $.ajax({
                    url     :'http://127.0.0.1:4000/api/wepayPwd',
                    method  :'POST',
                    headers :{},
                    data    :{
                        'serviceid' :   localStorage.getItem('serviceid'),
                        'clientid'  :   localStorage.getItem('clientid'),
                        'pwd'       :   e.trim()
                    },
                    success:function(data){
                        //tout va bien
                        if (data.message == 'succes') {
                            //on effectue une redirection
                        	
                        	mainView.router.load({ url: 'recapitulatif-buy.html', ignoreCache: false, reload: true });
                            
                            //on informe le client de la situation
                              myApp.addNotification({
                              	message:	'<i class="icon icon-forward"></i>&nbsp;Vous avez été Authentifié '+data.name,
                              	button:{
                              		text:	'ok'
                              	}
                              })
                        	
                        }
                        else{

                            mainView.router.load({ url: 'paiement.html', ignoreCache: false, reload: true });
                            
                          //on informe le client de la situation
                            myApp.addNotification({
                            	message:	'<i class="icon icon-forward"></i>&nbsp;Authentification impossible, erreur dans le mot de passe',
                            	button:{
                            		text:	'Compris'
                            	}
                            })

                        }
                    },
                    error:function(err){
                        //une erreur est survenu
                        console.log('Une erreur est survenu durant la communication avec le serveur : '+err);
                        
                        //on renvoi le client sur la page precedente
                        mainView.router.load({ url: 'paiement.html', ignoreCache: false, reload: true });
                        
                        //on informe le client de la situation
                        myApp.addNotification({
                        	message:	'<i class="icon icon-forward"></i>&nbsp;Impossible de joindre le serveur, erreur reseau',
                            hold: 5000,
                            closeOnClick: true,
                        	button:{
                        		text:	'Compris',
                                color: red,
                                close: true
                        	}
                        })
                    }
                });

            },
            function () {
                //le client a annulé l'action, on le redirectionne
                mainView.router.load({ url: 'paiement.html', ignoreCache: false, reload: true });
                
                //on informe le client sur ce qui vient de se passer
                myApp.addNotification({
                	message:	'<i class="icon icon-forward"></i>&nbsp;Action annulée par l\'utilisateur',
                	button:{
                		text:	'Compris'
                	}
                })
        });
    }
});


/* ===== Swipe to delete events callback demo ===== */
myApp.onPageInit('swipe-delete', function (page) {
    $$('.demo-remove-callback').on('deleted', function () {
        myApp.alert('Thanks, item removed!');
    });
});
myApp.onPageInit('swipe-delete media-lists', function (page) {
    $$('.demo-reply').on('click', function () {
        myApp.alert('Reply');
    });
    $$('.demo-mark').on('click', function () {
        myApp.alert('Mark');
    });
    $$('.demo-forward').on('click', function () {
        myApp.alert('Forward');
    });
});


/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('swipe-delete modals media-lists', function (page) {
    var actionSheetButtons = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Choose some action',
                label: true
            },
            // First button
            {
                text: 'Alert',
                onClick: function () {
                    myApp.alert('He Hoou!');
                }
            },
            // Second button
            {
                text: 'Second Alert',
                onClick: function () {
                    myApp.alert('Second Alert!');
                }
            },
            // Another red button
            {
                text: 'Nice Red Button ',
                color: 'red',
                onClick: function () {
                    myApp.alert('You have clicked red button!');
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel'
            }
        ]
    ];
    $$('.demo-actions').on('click', function (e) {
        myApp.actions(actionSheetButtons);
    });
    $$('.demo-actions-popover').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(this, actionSheetButtons);
    });
    
});

/* ===== Messages Page ===== */
myApp.onPageInit('about', function (page) {
    myApp.addNotification({
        message: 'About this app',
        hold: 5000,
        closeOnClick: true
    });

    //on ajoute les informations
    $('.version').text(id);

    //les developpeurs
    $('.01').text(contributors.developers[1].name);
    $('.02').text(contributors.developers[2].name);
    $('.03').text(contributors.developers[3].name);
    $('.04').text(contributors.developers[4].name);

    $('.1').text(contributors.developers[1].fonction);
    $('.2').text(contributors.developers[2].fonction);
    $('.3').text(contributors.developers[3].fonction);
    $('.4').text(contributors.developers[4].fonction);
});

/* ===== Pull To Refresh Demo ===== */
myApp.onPageInit('pull-to-refresh', function (page) {
    // Dummy Content
    var songs = ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'];
    var authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];
    // Pull to refresh content
    var ptrContent = $$(page.container).find('.pull-to-refresh-content');
    // Add 'refresh' listener on it
    ptrContent.on('refresh', function (e) {
        // Emulate 2s loading
        setTimeout(function () {
            var picURL = 'http://lorempixel.com/88/88/abstract/' + Math.round(Math.random() * 10);
            var song = songs[Math.floor(Math.random() * songs.length)];
            var author = authors[Math.floor(Math.random() * authors.length)];
            var linkHTML = '<li class="item-content">' +
                                '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title-row">' +
                                        '<div class="item-title">' + song + '</div>' +
                                    '</div>' +
                                    '<div class="item-subtitle">' + author + '</div>' +
                                '</div>' +
                            '</li>';
            ptrContent.find('ul').prepend(linkHTML);
            // When loading done, we need to "close" it
            myApp.pullToRefreshDone();
        }, 2000);
    });
});

/* ===== Sortable page ===== */
myApp.onPageInit('sortable-list', function (page) {
    // Sortable toggler
    $$('.list-block.sortable').on('open', function () {
        $$('.toggle-sortable').text('Done');
    });
    $$('.list-block.sortable').on('close', function () {
        $$('.toggle-sortable').text('Edit');
    });
});


/* ===== login-signup page ======= */

myApp.onPageInit('login-signup', function (page){
	//on recupere les requetes
	var elem = page.query;
	console.log(page.query);
	$$(page.container).find('.title').text(page.query.utm);
});


/* ======= mes voyages ======= */
myApp.onPageInit('mes-voyages', function (page) {
	// gestion de la liste des voyages
	console.log('mes voyages chargés en memoire.');
	//mes-voyages.html
	//on recupere les informations provenant du serveur pour cet utilisateur
	$.ajax({
		url		: 'http://api-travel-more.herokuapp.com/index.php/api/student/2',
		method	: 'POST',
		data 	: {
			'serviceid'	: test.serviceid,
			'clientid'	: test.clientid
		},
		success: function(data){
			//
			console.log(data);
		},
		error:function(){
			myApp.addNotification({
				message: 'Une erreur est survenue durant le traitement de la requete'
			});
		}
	});
});

/* ===== index page ===== */
myApp.onPageInit('index', function (page) {
    // Sortable toggler
    $$('a.travel').on('click', function () {
        myApp.pickerModal('.picker-modal-demo');
    });
    
    var pickerTest = myApp.picker({
        input: '#ks-test',
        cols: [
            {
                textAlign: 'center',
                values: ['Premiere | 9000 F CFA', 'Premium | 6000 F CFA', 'Etudiant | 4000 F CFA', 'Low-cost | 3000 F CFA']
            }
        ]
    });
    //on verifie que le client n'a pas deja des anciennes données enregistrés
    $$('.list-block.sortable').on('open', function () {
        $$('.toggle-sortable').text('Done');
    });
    $$('.list-block.sortable').on('close', function () {
        $$('.toggle-sortable').text('Edit');
    });

    //si on click sur la reconnaissance vocale
    $$('.recognition').on('click', function(e){
        e.preventDefault();
        console.log('recog');

        //on verifie si le terminal est compatible
        if (!('webkitSpeechRecognition' in window)) {
            myApp.addNotification({
                message: ' <i class="fa fa-microphone fa-2x"></i> &nbsp; Terminale incompatible'
            });
            return false;
        } else {
            //on redirige vers la page concernée
            mainView.router.load({
                url         : 'recognition.html',
                animatePages: true
            });
        }
    });
    
    //avant d'ouvrir wepay via le menu on verifie, si le client a deja un compte on demande un mot de passe wepay
    $$('.wepay-menu').on('click', function(){
    	//on verifie si un clientid existe dans le terminal
    	if (typeof localStorage.getItem('clientid') == 'object'){
    		myApp.confirm('Aucun compte configurer. configurer maintenant?','Configurer WePay',function(){
                //le client decide de creer son compte wePay, on le redirige
                mainView.router.load({ url: 'login-screen-embedded.html?utm=Wepay Login', ignoreCache: true, reload: true });
            },function(){
            	//
            });
    	}
    	if (typeof localStorage.getItem('clientid') == 'string'){
    		//on demande un mot de passe au proprietaire du terminal, sachant que nous avons trouvé des traces du clientid
    		myApp.prompt('Entrer votre mot de passe pour acceder au service','<i class="icon icon-form-name"></i>&nbsp; WePay auth',function(e){
                //le client entre les informations et on les recuperes
    			console.log(e.trim());
    			
    			//on redirige
                mainView.router.load({ url: 'wepay.html', ignoreCache: true, reload: false, animatePages: true });
            },function(){
            	//
            });
    	}
    })
    
    //ouverture de mes-voyages
    $$('.mes-voyages').on('click', function(){
    	//recuperation du serviceid
    	if (typeof localStorage.getItem('serviceid') == 'object'){
    		//on retourne qu'il n'y a aucun voyage pour ce client
    		myApp.alert('Aucun voyage pour cet utilisateur');
    		
    	}
    	if (typeof localStorage.getItem('serviceid') == 'string'){
    		//tout vas bien, on ouvre la page mes-voyages.html
    		mainView.router.load({ url: 'mes-voyages.html?serviceid='+localStorage.getItem('serviceid'), ignoreCache: true, reload: false, animatePages: true });
    	}
    });


    /*if (typeof localStorage.getItem('serviceid') == 'object'){
        myApp.showPreloader('interrogation du serveur ...');
        setTimeout(function () {
            myApp.hidePreloader();
        }, 2500);
    }*/


    $$('.ks-pb-standalone').on('click', function () {
        photoBrowserStandalone.open();
    });

    //cas si on veux avoir la meteo grace a meteo lite
    $$('.meteo-lite').on('click', function(){

        //on intantie l'objet permission
        var meteo = new permission(localStorage.getItem('serviceid'));


        function test() {
            if (typeof localStorage.getItem('permission_status') == 'object'){
                return false;
            }
            else {
                return true;
            }
        }

        meteo.status = test();

        //on recupere le module en cours
        meteo.moduleName = 'Meteo';

        if (meteo.status == false){
            //dans cette condition une autorisation est demandée
            myApp.confirm('<i class="fa fa-map-marker fa-2x"></i>&nbsp;Autoriser '+meteo.moduleName+' à avoir accès à votre position?','App Permission',function(){
                //appel de la fonction qui permet de recuperer la position du client
                //on attribut la valeur true a p.status
                meteo.status = true;

                //on enregistre les informations
                localStorage.setItem('permission_status', meteo.status);

                //on notifie le client
                myApp.addNotification({
                    message:    'Permission accordée à : '+ meteo.moduleName,
                    hold:   5000,
                    button:{
                        text: 'OK',
                        color:'white'
                    }
                });

                //on retourne les informations
                console.log(meteo);

                //on redirige vers le service pour avoir acces au service de positionnement
                mainView.router.load({ url: 'panel-right2.html?serviceid='+localStorage.getItem('serviceid'), ignoreCache: true, reload: false, animatePages: true });

                //on ferme le panel
                myApp.closePanel();

            }, function(){
                myApp.closePanel();

                //on enregistre les informations
                localStorage.setItem('permission_status', meteo.status);

                console.log(meteo);
            });

        }
        if (meteo.status ==  true){
            myApp.addNotification({
                message:    'Permission accordée à <a href="#"> '+ meteo.moduleName+' </a>',
                hold: 3000,
                button:{
                    text: 'OK',
                    color: 'white'
                }
            });

            //on redirige vers le service pour avoir acces au service de positionnement
            mainView.router.load({ url: 'panel-right2.html?serviceid='+localStorage.getItem('serviceid'), ignoreCache: true, reload: false, animatePages: true });

            //on ferme le panel
            myApp.closePanel()  ;
        }

    });

    //cas si on veux avoir la position grace a myPosition
    $$('.ma-position').on('click', function(){
        //on intantie l'objet permission
        var position = new permission(localStorage.getItem('serviceid'));


        function test() {
            if (typeof localStorage.getItem('permission_status') == 'object'){
                return false;
            }
            else {
                return true;
            }
        }

        position.status = test();

        //on recupere le module en cours
        position.moduleName = 'Ma position';

        if (position.status == false){
            //dans cette condition une autorisation est demandée
            myApp.confirm('<i class="fa fa-map-marker fa-2x"></i>&nbsp;Autoriser '+position.moduleName+' à avoir accès à votre position?','App Permission',function(){
                //appel de la fonction qui permet de recuperer la position du client
                //on attribut la valeur true a p.status
                position.status = true;

                //on enregistre les informations
                localStorage.setItem('permission_status', position.status);

                //on notifie le client
                myApp.addNotification({
                    message:    'Permission accordée à : '+ position.moduleName,
                    hold: 5000,
                    button:{
                        text: 'OK',
                        color:'white'
                    }
                });

                //on retourne les informations
                console.log(position);

                //on redirige pour avoir acces a la page de position
                mainView.router.load({ url: 'panel-right2.html?serviceid='+localStorage.getItem('serviceid'), ignoreCache: true, reload: false, animatePages: true });

                //on ferme le panel
                myApp.closePanel();


            }, function(){
                myApp.closePanel();

                //on enregistre les informations
                localStorage.setItem('permission_status', position.status);

                console.log(position);
            });

        }
        if (position.status ==  true){
            myApp.addNotification({
                message:    'Permission accordée à <a href="#"> '+ position.moduleName+' </a>',
                hold: 5000,
                button:{
                    text: 'OK',
                    color: 'white'
                }
            });

            //on redirige vers le service pour avoir acces au service de positionnement
            mainView.router.load({ url: 'panel-right2.html?serviceid='+localStorage.getItem('serviceid'), ignoreCache: true, reload: false, animatePages: true });

            //on ferme le panel
            myApp.closePanel();
        }
    });

    //gestion des pancartes et des permissions
    $$('.pancarte').on('click', function(){
        //on intantie l'objet permission
        var pancarte = new permission(localStorage.getItem('serviceid'));


        function test() {
            if (typeof localStorage.getItem('permission_status') == 'object'){
                return false;
            }
            else {
                return true;
            }
        }

        pancarte.status = test();

        //on recupere le module en cours
        pancarte.moduleName = 'Pancarte';

        if (pancarte.status == false){
            //dans cette condition une autorisation est demandée
            myApp.confirm('<i class="fa fa-map-marker fa-2x"></i>&nbsp;Autoriser '+pancarte.moduleName+' à avoir accès à votre position?','App Permission',function(){
                //appel de la fonction qui permet de recuperer la position du client
                //on attribut la valeur true a p.status
                pancarte.status = true;

                //on enregistre les informations
                localStorage.setItem('permission_status', pancarte.status);

                //on notifie le client
                myApp.addNotification({
                    message:    'Permission accordée à : '+ pancarte.moduleName,
                    hold: 5000,
                    button:{
                        text: 'OK',
                        color:'white'
                    }
                });

                //on retourne les informations
                console.log(pancarte);

                //on redirige vers la page demandée
                //panel-pancarte.html
                mainView.router.load({ url: 'panel-pancarte.html?serviceid='+localStorage.getItem('serviceid'), ignoreCache: true, reload: false, animatePages: true });

                //on ferme le panel
                myApp.closePanel();

            }, function(){
                myApp.closePanel();

                //on enregistre les informations
                localStorage.setItem('permission_status', pancarte.status);

                console.log(pancarte);
            });

        }
        if (pancarte.status ==  true){
            myApp.addNotification({
                message:    'Permission accordée à <a href="#"> '+ pancarte.moduleName+' </a>',
                hold: 5000,
                button:{
                    text: 'OK',
                    color: 'white'
                }
            });

            //on redirige vers le service de pancarte pour scanning des pancarte
            mainView.router.load({ url: 'panel-pancarte.html?serviceid='+localStorage.getItem('serviceid'), ignoreCache: true, reload: false, animatePages: true });

            //on ferme le panel
            myApp.closePanel();
        }
    });
});

/* ===== Photo Browser Examples ===== */
// Create photoprobsers first:
var photoBrowserPhotos = [
	{
		url: 'img/beach.jpg',
		caption: 'Amazing beach in Goa, India'
	},
    'http://placekitten.com/1024/1024',
    'img/lock.jpg',
    {
        url: 'img/monkey.jpg',
        caption: 'I met this monkey in Chinese mountains'
    },
    {
        url: 'img/mountains.jpg',
        caption: 'Beautiful mountains in Zhangjiajie, China'
    }
    
];
var photoBrowserStandalone = myApp.photoBrowser({
    photos: photoBrowserPhotos
});
var photoBrowserPopup = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    type: 'popup'
});
var photoBrowserPage = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    type: 'page'
});
var photoBrowserDark = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    theme: 'dark'
});
var photoBrowserPopupDark = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    theme: 'dark',
    type: 'popup'
});
var photoBrowserLazy = myApp.photoBrowser({
    photos: photoBrowserPhotos,
    lazyLoading: true,
    theme: 'dark'
});
myApp.onPageInit('photo-browser', function (page) {
    $$('.ks-pb-standalone').on('click', function () {
        photoBrowserStandalone.open();
    });
    $$('.ks-pb-popup').on('click', function () {
        photoBrowserPopup.open();
    });
    $$('.ks-pb-page').on('click', function () {
        photoBrowserPage.open();
    });
    $$('.ks-pb-popup-dark').on('click', function () {
        photoBrowserPopupDark.open();
    });
    $$('.ks-pb-standalone-dark').on('click', function () {
        photoBrowserDark.open();
    });
    $$('.ks-pb-lazy').on('click', function () {
        photoBrowserLazy.open();
    });
});


$$('.ks-pb-popup-dark').on('click', function () {
    photoBrowserPopupDark.open();
});

/* ===== Infinite Scroll Page ===== */
myApp.onPageInit('infinite-scroll', function (page) {
    // Loading trigger
    var loading = false;
    // Last loaded index, we need to pass it to script
    var lastLoadedIndex = $$('.infinite-scroll .list-block li').length;
    // Attach 'infinite' event handler
    $$('.infinite-scroll').on('infinite', function () {
        // Exit, if loading in progress
        if (loading) return;
        // Set loading trigger
        loading = true;
        // Request some file with data
        $$.get('infinite-scroll-load.php', {leftIndex: lastLoadedIndex + 1}, function (data) {
            loading = false;
            if (data === '') {
                // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                myApp.detachInfiniteScroll($$('.infinite-scroll'));
            }
            else {
                // Append loaded elements to list block
                $$('.infinite-scroll .list-block ul').append(data);
                // Update last loaded index
                lastLoadedIndex = $$('.infinite-scroll .list-block li').length;
            }
        });
    });
});

/* ===== Notifications Page ===== */
myApp.onPageInit('notifications', function (page) {
    $$('.ks-notification-1').on('click', function () {
        myApp.addNotification({
            message: 'Simple message'
        });
    });
    $$('.ks-notification-2').on('click', function () {
        myApp.addNotification({
            message: 'Multi-line message. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in magna nisi.',
        });
    });
    $$('.ks-notification-3').on('click', function () {
        myApp.addNotification({
            message: 'Nice yellow button',
            button: {
                text: 'Click me',
                color: 'yellow'
            }
        });
    });
    $$('.ks-notification-4').on('click', function () {
        myApp.addNotification({
            message: 'Close me to see Alert',
            button: {
                text: 'Close',
                color: 'lightgreen'
            },
            onClose: function () {
                myApp.alert('Notification closed');
            }
        });
    });
});

/* ===== Login screen page events ===== */
myApp.onPageInit('login-screen-embedded', function (page) {
    $$(page.container).find('.btn-submit').on('click', function () {
        var username = $$(page.container).find('input[name="username"]').val();
        var password = $$(page.container).find('input[name="password"]').val();
        myApp.alert('Username: ' + username + ', password: ' + password, function () {
            mainView.router.back();
        });
    });
});

/* ======= initialisation de la page formulaire ========= */
myApp.onPageInit('formulaire', function(page){
   $$(page.container).find('.valider').on('click', function(){
       /* === on verifie le contenu des differentes zones ===*/
       var nom = $$(page.container).find('input[name="nom"]').val();
       var phone = $$(page.container).find('input[name="phone"]').val();
       var prenom = $$(page.container).find('input[name="prenom"]').val();
       var email = $$(page.container).find('input[name="email"]').val();
       var info = $$(page.container).find('textarea[name="info"]').val();

       if(nom == "" || nom.length <= 3){
           //myApp.alert("vous n avez fournis aucun nom");
           myApp.addNotification({
               message: 'merci de fournir votre nom',
               button: {
                   text: 'Fermer'
               }
           });
       }
       else if(phone == "" || phone.length != 9 ){
           //myApp.alert("Le numero de telephone est obligatoire, merci de le completer");
           myApp.addNotification({
               message: 'Votre numero de telephone ne semble pas etre correcte',
               button: {
                   text: 'Fermer'
               }
           });
       }
       else{
           //myApp.alert('Votre nom : '+nom+', votre telephone : '+phone);

           /*=== on sauvegarde les informations ===*/
           localStorage.setItem('nom', nom);
           localStorage.setItem('phone', phone);
           localStorage.setItem('email', email);
           localStorage.setItem('prenom', prenom);
           localStorage.setItem('info', info);

           myApp.addNotification({
               message: 'Merci '+localStorage.getItem('nom')+', vos informations sont OK',
               button: {
                   text: 'Compris'
               }
           });

           /*=== on retournedans la section sauvegrader finale ===*/
           mainView.router.back();
       }
   }) ;
});

myApp.onPageInit('merci', function(page){
    //on envoi les données en get
    /*$$.get('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example', {CrossDomaine: true}, function(data){
        myApp.alert(data);
    });*/

    //on ajoute la carte


});


/* === gestion des heures de departs === */
myApp.onPageInit('heure-depart', function(page){
    console.log('Service heure depart initialisé');
    if (typeof localStorage.getItem('depart') == 'object'){
        myApp.alert('Selectionner une ville de départ pour commencer','TravelMore',function(){
            //
            //ca n'existe pas
            $$(page.container).find('.matin-time').text('Ville érronée');
            $$(page.container).find('.soir-time').text('Ville erronée');

            //redirection vers le choix de la ville de depart
            mainView.router.load({ url: 'ville-depart.html', ignoreCache: true, reload: true });
        });
    }
    else {
        /* === on defini les heures en fonction de la ville de dépar === */
            //si ca existe
            if (localStorage.getItem('depart') == 'douala'){
                $$(page.container).find('.matin-time').text(douala.heure_depart.matin);
                $$(page.container).find('.soir-time').text(douala.heure_depart.soir);
            }
            else if (localStorage.getItem('depart') == 'yaounde'){
                $$(page.container).find('.matin-time').text(yaounde.heure_depart.matin);
                $$(page.container).find('.soir-time').text(yaounde.heure_depart.soir);
            }

        /* === les evenements === */
        /* === si le client click sur une heure de depart === */
        $$('.matin').on('click', function(){

            if (localStorage.getItem('depart') == 'douala'){
                //on enregistre l'heure
                if (localStorage.getItem('heure') == 'soir'){
                    //on redefini l'heure de depart
                    localStorage.setItem('heure', douala.heure_depart.soir)
                    myApp.addNotification({

                        message: 'Votre voyage quittera à '+ localStorage.getItem('heure')+' de '+localStorage.getItem('depart'),
                        button: {
                            text: 'ok',
                            color: 'red'
                        }
                    });
                }
                if (localStorage.getItem('heure') == 'matin'){
                    //on redefini l'heure de depart
                    localStorage.setItem('heure', douala.heure_depart.matin)
                    myApp.addNotification({

                        message: 'Votre voyage quittera à '+ localStorage.getItem('heure')+' de '+localStorage.getItem('depart'),
                        button: {
                            text: 'ok',
                            color: 'red'
                        }
                    });
                }


            }
            else if (localStorage.getItem('depart') == 'yaounde'){
                //on enregistre l'heure
                if (localStorage.getItem('heure') == 'soir'){
                    //on redefini l'heure de depart
                    localStorage.setItem('heure', yaounde.heure_depart.soir)
                    myApp.addNotification({

                        message: 'Votre voyage quittera à '+ localStorage.getItem('heure')+' de '+localStorage.getItem('depart'),
                        button: {
                            text: 'ok',
                            color: 'red'
                        }
                    });
                }
                if (localStorage.getItem('heure') == 'matin'){
                    //on redefini l'heure de depart
                    localStorage.setItem('heure', yaounde.heure_depart.matin)
                    myApp.addNotification({

                        message: 'Votre voyage quittera à '+ localStorage.getItem('heure')+' de '+localStorage.getItem('depart'),
                        button: {
                            text: 'ok',
                            color: 'red'
                        }
                    });
                }
            }
        });
        $$('.soir').on('click', function(){

            /*var heure = localStorage.getItem('f7form-heure');
            localStorage.setItem('heure', JSON.parse(heure).heure);*/

            if (localStorage.getItem('depart') == 'douala'){
                //on enregistre l'heure
                localStorage.setItem('heure', douala.heure_depart.soir)
                myApp.addNotification({

                    message: 'Votre voyage quittera à '+localStorage.getItem('heure')+' de '+localStorage.getItem('depart'),
                    button: {
                        text: 'ok',
                        color: 'red'
                    }
                });
            }
            else if (localStorage.getItem('depart') == 'yaounde'){
                //on enregistre l'heure
                localStorage.setItem('heure', yaounde.heure_depart.soir);

                myApp.addNotification({
                    message: 'Votre voyage quittera à '+localStorage.getItem('heure')+' de '+localStorage.getItem('depart'),
                    button: {
                        text: 'ok',
                        color: 'red'
                    }
                });
            }
        });
    }

    $$('.hd').on('click', function(){

        var heure = localStorage.getItem('f7form-heure');
        localStorage.setItem('heure', JSON.parse(heure).heure);

    });

});

/* === concernant la ville arrivée === */
myApp.onPageInit('ville-arrive', function(page){
    console.log('Service ville arrivée initialisé');

    //condition
    $$('.va').on('click', function(){

        var arrive = localStorage.getItem('f7form-arrive');
        localStorage.setItem('arrive',JSON.parse(arrive).arrive);

       if (typeof localStorage.getItem('arrive') == 'object'){
           myApp.addNotification({
               message: 'Choissez une ville d\' arrivée'
           });
       }
       else if (localStorage.getItem('arrive') === localStorage.getItem('depart')){
           myApp.confirm('La ville d\'arrivée est identique à la ville de départ; si vous décidez de continuer, la ville de départ sera réinitialisée.','Attention', function(){
               //si le client confirme la fermeture
               //on reinitialise les cookie de la ville arrivée
               localStorage.removeItem('depart');

               //on effectue une redirection
               mainView.router.load({
                   url: 'achat.html',
                   ignoreCache: true,
                   reload: true,
                   animatePages: true
               });

           });

       }
       else{
           //tout est correcte
           mainView.router.load({ url: 'achat.html',
               ignoreCache: true,
               reload: true,
               animatePages: true
           });
       }

    });
});


/* === concernant le recapitulatif d'achat du billet === */
myApp.onPageInit('recapitulatif-achat', function(page){
    console.log('Service recapitulatif initialisé');

    //on charge toutes les informations de l'utilisateur
    var cookie = $.cookie();

    //on envoi à l'api les informations
    
    //console.log(page.query);
    $$(page.container).find('.prix').text(localStorage.getItem('prix-classe'));
    $$(page.container).find('.nom').text(localStorage.getItem('nom'));
    $$(page.container).find('.phone').text(localStorage.getItem('phone'));
    $$(page.container).find('.paymode').text(localStorage.getItem('paymode'));
    $$(page.container).find('.agence').text(localStorage.getItem('agence'));

});


/* === concernant la page fin === */
myApp.onPageInit('fin', function(page){
    console.log('Service fin initialisé');

    //firebase
    var myDataRef = new Firebase('https://travelmore.firebaseio.com');

    //on envoi les informations
    //on genere un uniqid en js
    var n=Math.floor(Math.random()*11);
    var k = Math.floor(Math.random()* 1000000);
    var m = String.fromCharCode(n)+k;

    /* === génération de la date === */
    var d = new Date();
    var retrievedObject = localStorage.getItem('f7form-voyageur');

    //firebase dataStorage

    myDataRef.push({
     id: m,
     /*name: $.cookie('nom'),
     prénom: $.cookie('prenom'),
     phone: $.cookie('phone'),
     email: $.cookie('email'),
     information: $.cookie('info'),
        class: localStorage.classe,
        heure: localStorage.heure,
        prix: $.cookie('prix-classe'),
        depart: localStorage.depart,
        arrive: localStorage.arrive,*/
     passenger: JSON.parse(retrievedObject),
     data: $.cookie(),
     date: Date.now()
     });

    //console.log(page.query);
    myApp.addNotification({
        message: ' Génial: un SMS de confirmation vous sera envoyé.',
        hold: 5000,
        button:{
            text: 'Fermer',
            color: 'green'
        },
        onClick: function(){
            myApp.alert("merci");
        }
    });

    myApp.addNotification({
        message: localStorage.nom+' voulez-vous un taxi, hotel, restaurant à votre arrivé à '+ $.cookie('depart')+'?',
        hold: 10000,
        button:{
            text: 'OUI',
            color: 'red'
        }
    });

    //
    function moveMapToBerlin(map){
        map.setCenter({lat:52.5159, lng:13.3777});
        map.setZoom(14);
    }

    //Step 1: initialize communication with the platform
        var platform = new H.service.Platform({
            app_id: 'DemoAppId01082013GAL',
            app_code: 'AJKnXv84fjrb0KIHawS0Tg',
            useCIT: true,
            useHTTPS: true
        });
        var defaultLayers = platform.createDefaultLayers();

    //Step 2: initialize a map  - not specificing a location will give a whole world view.
        var map = new H.Map(document.getElementById('map'),
            defaultLayers.normal.map);

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
        var ui = H.ui.UI.createDefault(map, defaultLayers);

    // Now use the map as required...
        moveMapToBerlin(map);
    });

/* ==== la gestion des classes ==== */
myApp.onPageInit('classe', function(page){
   console.log('service classe initialisé');

    /* === on verifie que toutes les variables minimum ont été introduite === */
    //var ville_depart = $$('input[value="this"]')
    /*$$('input[value="premiere"]').on('click', function(){
        console.log('premiere');
        /* === on enregistre la section ===
        localStorage.setItem('classe', 'premiere');
        localStorage.setItem('prix-classe', '9000');
    });

    $$('input[value="premium"]').on('click', function(){
        console.log('premium');
        /* === on enregistre la section ===
        localStorage.setItem('classe', 'premium');
        localStorage.setItem('prix-classe', '6000');
    });

    $$('input[value="etudiant"]').on('click', function(){
        console.log('etudiant');
        /* === on enregistre la section ===
        localStorage.setItem('classe', 'etudiant');
        localStorage.setItem('prix-classe', '4000');
    });

    $$('input[value="low-cost"]').on('click', function(){
        console.log('low-cost');
        /* === on enregistre la section ===
        localStorage.setItem('classe', 'low-cost');
        localStorage.setItem('prix-classe', '3000');
    });*/

    $$('.cl').on('click', function(){

        var classe = localStorage.getItem('f7form-classe');
        localStorage.setItem('classe',JSON.parse(classe).classe);
    });
});

//on verifie si c'est necessaire de demarrer l'ecran de depart

function startScreen(){
    if (typeof localStorage.getItem('start') == 'string'){
        //on creer le cookie
        mainView.router.load({ url: 'i.html', ignoreCache: true, reload: true });
        //localStorage.setItem('start', 'setStartScreen');
        //mainView.router.load({ url: 'index.html', ignoreCache: true, reload: true });
    }
    if (typeof localStorage.getItem('start') == 'object'){
        localStorage.setItem('start', 'setStartScreen');
    }
}

$$('.pass').on('click', startScreen());

/* verification de la connexion internet */
if (!navigator.onLine){
    myApp.addNotification({
        message: '<i class="fa fa-connectdevelop"></i>&nbsp; Pas de connexion internet.',
        button:{
            text: 'Fermer',
            color: 'red'
        }
    });

    //vibration du terminal
    navigator.vibrate(250);
}
/* === fin de la notification === */


/* === ===*/
/*
 var $$ = window.Dom7;

 //do get request
 $$.get('path-to-file.php', {id:3}, function (data) {
 consol.log(data);
 }

 //do post request
 $$.post('path-to-file.php', {id:3}, function (data) {
 consol.log(data);
 }

 //get JSON request
 $$.getJSON('path-to-file.js', function (json) {
 consol.log(json);
 }
 */

myApp.onPageInit('page-achat', function (page){
    $$(page.container).find('.achat').text('Bienvenue chez '+page.query.agence);
    console.log('service achat initialisé');
    var agence = page.query.agence;
    $.cookie('agence', agence);
    if (typeof $.cookie('agence') == 'undefined'){
        myApp.alert('Impossible de déterminer l\'agence de voyage');

        //on redirige vers l'index principale
        mainView.router.load({
            url: 'index.html',
            ignoreCache: true,
            reload: true,
            animatePage: true
        });
    }

    /* ==== la date de depart ======== */
    if (typeof localStorage.getItem('date-depart') == 'object'){
        $$(page.container).find('.date-depart').text('Choisir ...');
    }
    else {
        $$(page.container).find('.date-depart').text(localStorage.getItem('date-depart'));
    }


    /* === le depart === */
    if (typeof localStorage.getItem('depart') == 'object') {
        $$(page.container).find('.depart').text('Choisir ...');
    }
    else {
        $$(page.container).find('.depart').text(localStorage.getItem('depart'));
    }

    /* === l'arrive === */
    if (typeof localStorage.getItem('arrive') == 'object') {
        $$(page.container).find('.arrive').text('Choisir ...');
    }
    else {
        $$(page.container).find('.arrive').text(localStorage.getItem('arrive'));
    }

    /* === les classe === */
    if (typeof localStorage.getItem('classe') == 'object') {
        $$(page.container).find('.classe').text('Choisir ...');
    }
    else {
        if (localStorage.getItem('classe') == 'low-cost'){
            $$(page.container).find('.classe').text(classe.lowcost.nom+' @ '+classe.lowcost.prix);
        }
        if (localStorage.getItem('classe') == 'premiere'){
            $$(page.container).find('.classe').text(classe.premiere.nom+' @ '+classe.premiere.prix);
        }
        if (localStorage.getItem('classe') == 'premium'){
            $$(page.container).find('.classe').text(classe.premium.nom+' @ '+classe.premium.prix);
        }
        if (localStorage.getItem('classe') == 'etudiant'){
            $$(page.container).find('.classe').text(classe.etudiant.nom+' @ '+classe.etudiant.prix);
        }

    }

    /* === les heures de depart === */
    if (typeof localStorage.getItem('depart') == 'object') {
        $$(page.container).find('.heure').text('Choisir ...');
    }
    if (typeof localStorage.getItem('depart') == 'string') {
        if (localStorage.getItem('depart') == 'douala' && localStorage.getItem('heure') == 'matin'){
            $$(page.container).find('.heure').text(douala.heure_depart.matin);
        }
        if (localStorage.getItem('depart') == 'douala' && localStorage.getItem('heure') == 'soir'){
            $$(page.container).find('.heure').text(douala.heure_depart.soir);
        }
        if (localStorage.getItem('depart') == 'yaounde' && localStorage.getItem('heure') == 'matin'){
            $$(page.container).find('.heure').text(yaounde.heure_depart.matin);
        }
        if (localStorage.getItem('depart') == 'yaounde' && localStorage.getItem('heure') == 'matin'){
            $$(page.container).find('.heure').text(yaounde.heure_depart.matin);
        }
    }

    /* === le nom et le telephone === */
    if (typeof localStorage.getItem('nom') == 'object') {
        $$(page.container).find('.client').text('identifiez-vous ...');
    }
    else {
        $$(page.container).find('.client').text(localStorage.getItem('nom'));
    }

    /* === le type de voyage === */
    if (typeof localStorage.getItem('type') == 'object') {
        $$(page.container).find('.type').text('choisir ...');
    }
    else {
        var type = localStorage.getItem('f7form-type');

        //on enregistre le type de voyage
        localStorage.setItem('type',JSON.parse(type).type);

        if (localStorage.getItem('type') == 'allee'){
            $$(page.container).find('.type').text(typevoyage.aller);
        }
        if (localStorage.getItem('type') == 'alleeretour'){
            $$(page.container).find('.type').text(typevoyage.aller_retour);
        }

    }

    /* === la ville de départtop === */
    $$(page.container).find('.yde').on('click', function(){
       myApp.addNotification({
           message: 'vous y etes'
       });
    });


    //
    $$(page.container).find('.form-validate').on('click', function(){
        if(!navigator.onLine){
            //myApp.alert('Vous semblez etre deconnecté du reseau internet')
            myApp.addNotification({
                message: 'Vous semblez etre déconnecté d\'internet'
            });
            /*=== on enregistre les données en locale ===*/
        }
        else if(typeof localStorage.getItem('nom') == 'object' || typeof localStorage.getItem('phone') == 'object'){
            //myApp.alert('Nous ne parvenons pas à trouver vos informations personnelles.');
            myApp.addNotification({
                message: 'Certaines de vos informations sont manquantes'
            });
        }
        else{
            //on verifie si les villes de departs/arrivée/classe voyages/heure depart, et identités personnelles ont ete évalué

            //on genere un uniqid en js
            var n=Math.floor(Math.random()*11);
            var k = Math.floor(Math.random()* 1000000);
            var m = String.fromCharCode(n)+k;

            /* === génération de la date === */
            var d = new Date();

            //firebase dataStorage

            /*myDataRef.push({
                id: m, name: $.cookie('nom'),
                prénom: $.cookie('prenom'),
                phone: $.cookie('phone'),
                email: $.cookie('email'),
                information: $.cookie('info'),
                date: Date.now()
            });*/

            //on notifie le client de ce qui vient de se passer
            myApp.addNotification({
                message: 'Vos informations ont été enregistrées'
            });

            //redirection vers une nouvelle pasge
            mainView.router.loadPage({
                url:            'merci.html',
                animatePages:   true
            });
        }
    });

    //si on click sur le bouton annuler de la page achat
    $$('.annuler-achat').on('click', function(){
        myApp.confirm('Etes vous sur de vouloir annuler toutes les informations de ce voyage?','TravelMore', function(){
            //on vide tous les cookies

            //on sauvegarde le service id
            var serviceidTmp = localStorage.getItem('serviceid');

            //on reinitialise toutes les informations
            localStorage.clear();

            //on restaure le serviceid
            localStorage.setItem('serviceid', serviceidTmp);

            //on notifie le client que tout c'est bien passé
           myApp.alert('Merci, vos informations ont été annulées.');

            //on actualise la page achat
            mainView.router.load({
                url: 'achat.html',
                ignoreCache: true,
                reload: true,
                animatePages: true
            });
        });
    });

    /* =================== si on click sur la validation de la page achat =====================*/
    $$('.achat-ok').on('click', function(){
       //on verifie que toutes les valeurs sont bien correcte

        //les informations sur le voyage
        var voyage = {
            'depart':   localStorage.getItem('depart'),
            'arrive':   localStorage.getItem('arrive'),
            'classe':   localStorage.getItem('classe'),
            'heure':    localStorage.getItem('heure'),
            'type':     localStorage.getItem('type')
        };

        //les informations sur le passager
        var voyageur = {
            'nom':      localStorage.getItem('nom'),
            'prenom':   localStorage.getItem('prenom'),
            'email':    localStorage.getItem('email'),
            'phone':    localStorage.getItem('phone'),
            'info':     localStorage.getItem('info')
        }

        //on verifie toutes ces informations
        if (typeof (voyage.depart) == 'undefined'){
            myApp.alert('La ville de départ semble ne pas avoir été definie.');
        }
        else if (typeof (voyage.arrive) == 'undefined'){
            myApp.alert('La ville de d\'arrivée semble ne pas avoir été definie.');
        }
        else if(typeof (voyage.classe) == 'undefined'){
            myApp.alert('Choisir une classe de voyage semble ne pas avoir été definie.');
        }
        else if(typeof (voyage.heure) == 'undefined'){
            myApp.alert('L\'heure de départ de votre voyage semble ne pas avoir été definie.');
        }
        else if(typeof (voyage.type) == 'undefined'){
            myApp.alert('Choisissez un type de voyage correspondant entre Aller/retour.');
        }
        else if (voyage.depart === voyage.arrive){
            myApp.alert('La ville départ et arrivée semblent etre identique. Merci de corriger');
        }
        else if (typeof (voyageur.nom) == 'undefined'){
            //les informations sur le nom
            myApp.alert('Il est Important de fournir un nom.');

            //on lui demande s'il veux fournir un nom maintenant
            myApp.prompt('Entrer votre Nom.','TravelMore', function(e){

                //on verifie avant de continuer
                if (e == "" || typeof (e) == 'undefined'){
                    //message d'erreur
                    myApp.addNotification({
                        message: 'Merci, mais vous n\'avez fourni aucune information'
                    });
                }
                else {
                    //on crée le cookie du nom
                    $.cookie('nom',e);

                    //on notifie
                    myApp.addNotification({
                        message: 'Merci, '+ $.cookie('nom')+' a été enregistré.'
                    });
                }

            },
            function(){
                //on renvoi a la page de confirmation
                mainView.router.load({
                    url: 'formulaire.html#nom',
                    ignoreCache: true,
                    reload: true,
                    animatePages: true
                });
            });

        }
        else if (typeof (voyageur.phone) == 'undefined'){
            //les informations sur le telephone
            myApp.alert('Le numéro de téléphone est requis.');

            //on lui demande de fournir un numero de telephone
            myApp.prompt('Entrer votre Numéro de téléphone','TravelMore', function(e){
                //on verifie le contenu
                if (e == "" || typeof (e) == 'undefined'){
                    //message d'erreur
                    myApp.addNotification({
                        message: 'Merci, mais vous n\'avez fourni aucune information'
                    });
                }
                else if (e.length < 9 || e.length > 9){
                    //message
                    myApp.addNotification({
                        message: 'Ce numero semble etre incompatible.'
                    });
                }
                else {
                    //on cree le cookie du telephone
                    $.cookie('phone',e);

                    //on retourne le message
                    myApp.addNotification({
                        message: 'Merci, le numéro '+ $.cookie('phone')+' a été enregistré'
                    });
                }
            });
        }
        else {
            //on renvoi a la page de confirmation
            mainView.router.load({
                url: 'confirmation.html',
                ignoreCache: true,
                reload: true,
                animatePages: true
            });
        }
        console.log(voyage.depart);
    });

});

//
/* ===== Color themes ===== */
myApp.onPageInit('meteo', function (page) {
    /*myApp.addNotification({
        message: 'bienvenu sur meteo'
    });*/

    getLocation();

    //on recupere l'emplacement grace a la geolocation API html5
    //var x = document.getElementById("demo");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            myApp.addNotification({
                message: 'Votre terminal ne support pas la geolocalisation'
            });
        }
    }

    function showPosition(position) {
        /*x.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;*/
        //on enregistre les informations dans les cookies

        $.cookie('lat', position.coords.latitude);
        $.cookie('lon', position.coords.longitude);

        //on appel l'API openstreetmap
        var meteo_params = {
            'APIKEY':'9d81dedf6450e43ddf5373ddb2f7c358',
            'LANG':'fr',
            'BASE_URL':'http://api.openweathermap.org/data/2.5/weather'
        }
        //var APIKEY = '9d81dedf6450e43ddf5373ddb2f7c358';
        //var BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?APPID='+APIKEY+'&lang=fr&lat='+position.coords.latitude+'&lon='+position.coords.longitude;
        var query = meteo_params.BASE_URL+'?APPID='+meteo_params.APIKEY+'&lang='+meteo_params.LANG+'&lat='+position.coords.latitude+'&lon='+position.coords.longitude;

        //on envoi jquery
        $.get(query, function(data) {
            // Success!
            console.log('Successfully fetched weather data!');

            // Extract data
            var location = data.name;
            var temperature = Math.round(data.main.temp - 273.15) + '°C';
            var description = data.weather[0].description;
            description = description.charAt(0).toUpperCase() + description.substring(1);

            //affichage de la temperature
            $$('.temp').text(temperature);

            //on affiche la ville
            $$('.ville').html(location);

            //on affiche la description de la ville
            $$('.description').text(description);

            //on affiche lae lien wikipedia de la ville
            $$('.localisation').text(location);

            // Always upper-case first letter of description

            console.log(location+'/'+temperature+'/'+description);

            //on charge les resultats
            $$('.titre').text('Météo lite de '+location);
        });

    }

    //on recupere l'enplacement grace a ip


});

$$('.recognition-stop').on('click', function () {

});

$$('.login-screen').find('.button').on('click', function () {
    var username = $$('.login-screen').find('input[name="username"]').val();
    var password = $$('.login-screen').find('input[name="password"]').val();
    myApp.alert('Username: ' + username + ', password: ' + password, function () {
        myApp.closeModal('.login-screen');
    });
});


/* ===== Color themes ===== */
myApp.onPageInit('recognition', function (page) {

    console.log('recognition start');

    var recognition = new webkitSpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.start();
    recognition.onresult = function(event) {
        var interim_transcript = '';
        var final_transcript = ' ';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        //final_transcript = capitalize(final_transcript);
        //final_span.innerHTML = linebreak(final_transcript);
        //interim_span.innerHTML = linebreak(interim_transcript);
        //console.log(final_transcript);
        //console.log('//');
        console.log(interim_transcript);
        $$(page.container).find('.content').text(interim_transcript);
    };


    $$(page.container).find('.recognition-stop').click(function () {
        myApp.addNotification({
            message: '<i class="fa fa-microphone-slash fa-2x"></i>&nbsp; Arret'
        });
        var recognition = new webkitSpeechRecognition();
        recognition.stop();
    });
});

/* ===== Demo Popover ===== */
$$('.popover a').on('click', function () {
    myApp.closeModal('.popover');
});

/* ===== Color themes ===== */
myApp.onPageInit('color-themes', function (page) {
    $$(page.container).find('.ks-color-theme').click(function () {
        var classList = $$('body')[0].classList;
        for (var i = 0; i < classList.length; i++) {
            if (classList[i].indexOf('theme') === 0) classList.remove(classList[i]);
        }
        classList.add('theme-' + $$(this).attr('data-theme'));
    });
    $$(page.container).find('.ks-layout-theme').click(function () {
        var classList = $$('body')[0].classList;
        for (var i = 0; i < classList.length; i++) {
            if (classList[i].indexOf('layout-') === 0) classList.remove(classList[i]);
        }
        classList.add('layout-' + $$(this).attr('data-theme')); 
    });
});


/* ===== Mobile banking (MTN & ORANGE) ===== */
myApp.onPageInit('mtn-mobile-money', function (page) {
    console.log('Services page initialized');
    console.log(page.query);

    //on recherche la section ou on doit rentrer les informations
    $$(page.container).find('.ag-payment').text('Paiement via '+page.query.paymentMode);
    $.cookie('paymode', page.query.paymentMode);

});


/* ===== MTN credit pay ===== */
myApp.onPageInit('mtn-credit-buy', function (page) {
    console.log('Services credit buy initialized');
    console.log(page.query);

    //on recherche la section ou on doit rentrer les informations
    $$(page.container).find('.ag-payment').text('Payer mon billet avec '+page.query.paymentMode);
    $.cookie('paymode', page.query.paymentMode);

});

/* ===== la page de recherche ===== */
myApp.onPageInit('recherche', function (page) {
    console.log('Services recherche initialized');
    console.log(page.query);

    //on recherche la section ou on doit rentrer les informations
    /*$$(page.container).find('.ag-payment').text('Payer mon billet avec '+page.query.paymentMode);
    $.cookie('paymode', page.query.paymentMode);*/

});

/* ===== Virtual List ===== */
myApp.onPageInit('virtual-list', function (page) {
    // Generate array with 10000 demo items:
    var items = [];
    for (var i = 0; i < 10000; i++) {
        items.push({
            title: 'Item ' + i,
            subtitle: 'Subtitle ' + i
        });
    }

    // Create virtual list
    var virtualList = myApp.virtualList($$(page.container).find('.virtual-list'), {
        // Pass array with items
        items: items,
        // Custom search function for searchbar
        searchAll: function (query, items) {
            var found = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].title.indexOf(query) >= 0 || query.trim() === '') found.push(i);
            }
            return found; //return array with mathced indexes
        },
        // List item Template7 template
        template: '<li>' +
                    '<a href="#" class="item-link item-content">' +
                      '<div class="item-inner">' +
                        '<div class="item-title-row">' +
                          '<div class="item-title">{{title}}</div>' +
                        '</div>' +
                        '<div class="item-subtitle">{{subtitle}}</div>' +
                      '</div>' +
                    '</a>' +
                  '</li>',
        // Item height
        height: 73,
    });
});
/* ===== Swiper Two Way Control Gallery ===== */
myApp.onPageInit('swiper-gallery', function (page) {
    var swiperTop = myApp.swiper('.ks-swiper-gallery-top', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 10
    });
    var swiperThumbs = myApp.swiper('.ks-swiper-gallery-thumbs', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        centeredSlides: true,
        touchRatio: 0.2,
        slideToClickedSlide: true
    });
    swiperTop.params.control = swiperThumbs;
    swiperThumbs.params.control = swiperTop;
});
/* ===== Calendar ===== */
myApp.onPageInit('calendar', function (page) {
    // Default
    console.log('Calendrier initialisé');
    //on recupere les informations sur le faite que la date soit valide
    var date_depart = localStorage.getItem('f7form-date-depart');

    localStorage.setItem('date-depart',JSON.parse(date_depart).date_depart);
    //on verifie
    $$('.date-depart').on('click', function (e){
        //on bloque l'envoi des informations
        e.preventDefault();

        //on traite l'information via ajax
        $.ajax({
            url:    'http://localhost:400/api/verifyDate',
            method: 'POST',
            data:   {
                'data':     localStorage.getItem('date-depart',JSON.parse(date_depart).date_depart),
                'serviceid':localStorage.getItem('serviceid')
            },
            success: function(data){
                console.log(data);
            },
            error: function(){
                console.log('Une erreur est survenu pendant la communication avec le serveur');

                //on notifie le client de ce qui vient de se passer
                myApp.addNotification({
                    message: '<i class="icon icon-back"></i>&nbsp;Impossible de joindre le serveur.',
                    button:{
                        text: 'Fermer',
                        color:'red'
                    }
                });

                //puis on effectue une redirection vers la page precedente
                mainView.router.back();
            }
        });
    });

    var calendarDefault = myApp.calendar({
        input: '#ks-calendar-default',
    });
    // With custom date format
    var calendarDateFormat = myApp.calendar({
        input: '#ks-calendar-date-format',
        dateFormat: 'DD, MM dd, yyyy'
    });
    // With multiple values
    var calendarMultiple = myApp.calendar({
        input: '#ks-calendar-multiple',
        dateFormat: 'M dd yyyy',
        multiple: true
    });
    // Inline with custom toolbar
    var monthNames = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout' , 'Septembre' , 'Octobre', 'Novembre', 'Decembre'];
    var calendarInline = myApp.calendar({
        container: '#ks-calendar-inline-container',
        value: [new Date()],
        weekHeader: false,
        header: false,
        footer: false,
        toolbarTemplate: 
            '<div class="toolbar calendar-custom-toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                    '</div>' +
                    '<div class="center"></div>' +
                    '<div class="right">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                    '</div>' +
                '</div>' +
            '</div>',
        onOpen: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function () {
                calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function () {
                calendarInline.nextMonth();
            });
        },
        onMonthYearChangeStart: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
        }
    });
});

/* === confirmation d'une reservation/achat === */
myApp.onPageInit('ville-depart', function (page){
    console.log('Service ville depart initialisé');


    //on verifie la condiftion de validation
    $$('.vd').on('click', function(){
        /* on recupere les informations de la ville de depart */
        var depart = localStorage.getItem('f7form-depart');

        localStorage.setItem('depart',JSON.parse(depart).depart);

        if (typeof localStorage.getItem('depart') == 'object'){
            navigator.vibrate();
            myApp.addNotification({
                message: 'Ville de départ incorrecte'
            });
        }
        else if (localStorage.getItem('depart') === localStorage.getItem('arrive')){
            myApp.confirm('La ville de départ est identique à la ville d\'arrivée; si vous décidez de continuer, la ville d\'arrivée sera réinitialisée.','Attention', function(){
                //si le client confirme la fermeture
                //on reinitialise les cookie de la ville arrivée
                localStorage.removeItem('arrive');

                //on effectue une redirection
                mainView.router.load({ url: 'achat.html', ignoreCache: true, reload: true });

            });

        }
        else{
            //tout est correcte
            mainView.router.load({ url: 'achat.html', ignoreCache: true, reload: true });
        }
    });

    //si on click sur demarrer pour avoir acces a la geolocalisation
    $$('.geolocation').on('click', function(){
        myApp.openModal();
    });

});


/* === confirmation du choix du type de voyage === */
myApp.onPageInit('type', function (page){
    console.log('Service type voyage initialisé');
    //console.log(page.query);
    $$('.tv').on('click', function(){

        var type = localStorage.getItem('f7form-type');
        localStorage.setItem('type', JSON.parse(type).type);

        if (typeof localStorage.getItem('type') == 'object'){
            myApp.alert('choisir un type de voyage');
        }
        if (typeof localStorage.getItem('type') == 'string'){
            mainView.router.load({ url: 'achat.html', ignoreCache: false, reload: true });
        }
    });

});

/* === confirmation d'une reservation/achat === */
myApp.onPageInit('confirmation', function (page){
    console.log('Service confirmation initialisé');

    //recuperation des informations sur la date
    var dateResult = getDate();

    //defintion des variables dans le localStorage
    var voyageur = localStorage.getItem('f7form-voyageur');
    localStorage.setItem('nom', JSON.parse(voyageur).nom);
    localStorage.setItem('prenom', JSON.parse(voyageur).prenom);
    localStorage.setItem('email', JSON.parse(voyageur).email);
    localStorage.setItem('phone', JSON.parse(voyageur).phone);

    //calcule de l'heure numerique de depart
    if (localStorage.getItem('depart') == 'douala'){
        if (localStorage.getItem('heure') == 'matin'){
            localStorage.setItem('time', douala.heure_depart.matin);
        }
        if (localStorage.getItem('heure') == 'soir'){
            localStorage.setItem('time', douala.heure_depart.soir);
        }
    }
    if (localStorage.getItem('depart') == 'yaounde'){
        if (localStorage.getItem('heure') == 'matin'){
            localStorage.setItem('time', yaounde.heure_depart.matin);
        }
        if (localStorage.getItem('heure') == 'soir'){
            localStorage.setItem('time', yaounde.heure_depart.soir);
        }
    }

    //calcul du prix de la classe
    if (localStorage.getItem('classe') == 'premiere'){
        localStorage.setItem('prix_classe', classe.premiere.prix);
    }
    if (localStorage.getItem('classe') == 'premium'){
        localStorage.setItem('prix_classe', classe.premium.prix);
    }
    if (localStorage.getItem('classe') == 'etudiant'){
        localStorage.setItem('prix_classe', classe.etudiant.prix);
    }
    if (localStorage.getItem('classe') == 'low-cost'){
        localStorage.setItem('prix_classe', classe.lowcost.prix);
    }

    //calcul du cout du voyage
    if (localStorage.getItem('type') == 'alleeretour'){
        var prix = parseInt(localStorage.getItem('prix_classe'));
        var $amount = ((prix * 2) - 1000);
    }
    else {
        $amount = localStorage.getItem('prix_classe');
    }



    //on charge toutes les informations du client
    $$(page.container).find('.nom').text(localStorage.getItem('nom').toUpperCase() +' '+localStorage.getItem('prenom') );
    //$$(page.container).find('.prenom').text(localStorage.getItem('prenom'));
    $$(page.container).find('.email').text(localStorage.getItem('email'));
    $$(page.container).find('.info').text('Toucher pour voir');
    $$(page.container).find('.phone').text(localStorage.getItem('phone'));


    //on charge les informations su voyage
    //var voyageur = localStorage.getItem('f7form-voyageur');

    $$(page.container).find('.depart').text(localStorage.getItem('depart').toUpperCase() );
    $$(page.container).find('.arrive').text(localStorage.getItem('arrive').toUpperCase() );
    $$(page.container).find('.classe').text(localStorage.getItem('classe')+' @ '+localStorage.getItem('prix_classe'));
    $$(page.container).find('.info').text('Toucher pour voir');
    //gestion du type de voyage
    if (localStorage.getItem('type') == 'alleeretour'){
        $$(page.container).find('.type').text(typevoyage.aller_retour.toUpperCase() );
    }
    else{
        $$(page.container).find('.type').text(typevoyage.aller.toUpperCase() );
    }

    $$(page.container).find('.heure').text(localStorage.getItem('heure')+' @ '+localStorage.getItem('time'));
    $$(page.container).find('.date').text('Aujourd\'hui'+' @ '+dateResult.date+'/'+(dateResult.mois+1)+'/'+dateResult.an);
    $$(page.container).find('.amount').text($amount + 'F CFA');

});



/* === gestion du paiement === */
myApp.onPageInit('paiement', function (page){
    console.log('Service paiement initialisé');
    //on charge toutes les informations du client
    $$(page.container).find('.titre').text('Paiement voyageur '+ $.cookie('nom')+' '+ $.cookie('prenom'));

    //si on click sur le bouton wepay
    $$('.wepay').on('click', function(){
        //on verifie la presence du userid et du service id
        if (typeof localStorage.getItem('serviceid') == 'string'){

        }
        else {
            myApp.addNotification({
                message:    'Configurer wepay'
            });
            myApp.confirm('Aucun compte configurer. configurer maintenant?','Configurer WePay',function(){
                //le client decide de creer son compte wePay, on le redirige
                mainView.router.load({ url: 'wepay.html', ignoreCache: true, reload: true });
            },function(){

            });
        }
    });

    //wp-solpay est reference dans la page paiement
    $$('.wp-solpay').on('click', function(){
        if (typeof localStorage.getItem('clientid') == 'object') {
            myApp.confirm('Désolé mais aucun compte <strong>WEPAY</strong> existant et configuré pour ce numero. <br><br> Configurer <strong>WEPAY</strong> maintenant?','Configurer <strong>WEPAY</strong>',function(){
                //le client decide de creer son compte wePay, on le redirige
                mainView.router.load({ url: 'wepay.html', ignoreCache: true, reload: true });
            },function(){
                myApp.alert('Pensez a configurer votre comptre <a href="#">WEPAY</a> pour payer en un click de maniere securisée.');
            });
        }
        if (typeof localStorage.getItem('clientid') == 'string') {
            //on fait une demande à l'API pour avoir les information du le clientid de wepay
            //cela permet de savoir si la durée de vie du client id est encore valide ou pas
            //si le clientid est valide, on procede au paiement dans le cas contraire (le client périmé)
            //on regenere la clé du clientid correspondant au numero et on notifie le client du nouvel ID

            //on demande a l'API de verifier le clientid
            test.wepayInit();
            //fin de la demande



            mainView.router.load({ url: 'wepay-auth.html', ignoreCache: false, reload: true });
        }
    })

});


/* === gestion du paiement via mobile money === */
myApp.onPageInit('mtn-mobile-money', function (page){
    console.log('Service paiement initialisé');
    //on charge toutes les informations du formulaire
    var _phone_mm_ = $$('input[name="phone-mm"]').val();
    var _pwd_mm_ = $$('input[name="pwd-mm"]').val();

    //text('Paiement voyageur '+localStorage.nom+' '+localStorage.prenom);

});




/* === gestion des informations supplementaires === */
myApp.onPageInit('info-supplementaire', function (page){
    console.log('Service info-supplementaire initialisé');
    //on charge toutes les informations
    $$(page.container).find('.nom').text('informations supplementaires de '+ $.cookie('nom')+' '+ $.cookie('prenom'));
    $$(page.container).find('.info').text($.cookie('info'));

});



/* === les informations meteo === */
/*$$.get('http://ip-api.com/json', function(data){
   console.log(data);*/
    //des que les données sont recu, on execute l'API de temprature
    /*$$.get('http://api.openweathermap.org/data/2.5/weather?q='+data.city+'&lang=fr&units=metric&appid=9d81dedf6450e43ddf5373ddb2f7c358', function(temperature){
        console.log(temperature);
    });*/
//});


myApp.onPageBeforeInit('info-agence', function (page) {
    console.log('Services info agence initialized');
    console.log(page.query);

    //on recherche la section ou on doit rentrer les informations
    $.get('http://localhost/v0/api/info_agence/'+page.query.agence, function(data){
        console.log(data);
        $$(page.container).find('.nom-agence').text(data.message.name);

        //enetet de la page en cours
        $$(page.container).find('.ag-name').text('Informations de '+data.message.name);
    });

});


/* === gestion des tarifs sur les agences === */
myApp.onPageBeforeInit('tarif', function (page) {
    console.log('Services info agence initialized');
    console.log(page.query);

    //on recherche la section ou on doit rentrer les informations
    $.get('http://localhost/v0/api/info_agence/'+page.query.agence, function(data){
        console.log(data);
        $$(page.container).find('.nom-agence').text(data.message.name);

        //enetet de la page en cours
        $$(page.container).find('.titre').text('Tarifs de '+data.message.name);
    });

});

/* === teste de here maps === */
myApp.onPageInit('here', function(page) {
    console.log('je suis sous here map');

    // heure depart ville depart
    var pickerHeureDepart = myApp.picker({
        input: '#ks-picker-heure-depart',
        cols: [
            {
                textAlign: 'center',
                values: ['Douala', 'Yaoundé']
            }
        ]
    });
});


/* === la localisation d'une agence ===*/
myApp.onPageInit('geolocation', function (page) {
    console.log('Services geolocation initialized');

    //on recherche la section ou on doit rentrer les informations


    myApp.addNotification({
        message: 'Recherche ...',
        button:{
            text: 'Fermer'
        }
    });
    $$(page.container).find('.ag-localisation').text('Autours de moi ');

    L.mapbox.accessToken = 'pk.eyJ1IjoibXZvbmRveWFubmljayIsImEiOiJjaWZ3d3c1ZGMwMjN3c3RtMGJidDQ4ZWl2In0.Azvjcz49V5_9DXxIm-_Mhg';
    var geolocate = document.getElementById('geolocate');
    var map = L.mapbox.map('map', 'mvondoyannick.o7p5kdh3').setView([3.8532129,11.485031],10);

    var myLayer = L.mapbox.featureLayer().addTo(map);

// This uses the HTML5 geolocation API, which is available on
// most mobile browsers and modern browsers, but not in Internet Explorer
//
// See this chart of compatibility for details:
// http://caniuse.com/#feat=geolocation
    if (!navigator.geolocation) {
        //geolocate.innerHTML = 'Geolocation is not available';
        myApp.addNotification({
            message: 'Geolocalisation indisponible',
            button:{
                text: 'Compris',
                color: 'blue'
            }
        });
    }
    else {
        map.locate()
    }

// Once we've got a position, zoom and center the map
// on it, and add a single marker.
    map.on('locationfound', function(e) {
        map.fitBounds(e.bounds);

        myLayer.setGeoJSON({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [e.latlng.lng, e.latlng.lat]
            },
            properties: {
                'title': 'Salut! vous etes ici.',
                'marker-color': '#ff8888',
                'marker-symbol': 'star'
            }
        });

    });

// If the user chooses not to allow their location
// to be shared, display an error message.
    map.on('locationerror', function() {
        //geolocate.innerHTML = 'Position could not be found';
        myApp.addNotification({
            message: 'impossible de determiner votre position',
            button:{
                text: 'Compris',
                color: 'blue'
            }
        });
    });

    L.mapbox.featureLayer({
        // this feature is in the GeoJSON format: see geojson.org
        // for the full specification
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry":
                {
                    "type": "Point",
                    "coordinates": [11.5220991,3.8732171]
                },
                "properties": {
                    'title': 'Camrail Yaounde',
                    'marker-color': '#ff8888',
                    'marker-symbol': 'rail'
                }
            },
            {
                "type": "Feature",
                "geometry":
                {
                    "type": "Point",
                    "coordinates": [11.5078721,3.8571499]
                },
                "properties": {
                    'title': 'Garantie Express Yaounde',
                    'marker-color': '#ff8888',
                    'marker-symbol': 'bus'
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [11.5220991,3.8732171]
                },
                "properties": {
                    'title': 'Hopital de la Caise (CNPS)',
                    'marker-color': '#0DFFCC',
                    'marker-symbol': 'hospital'
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [11.5238479,3.873201]
                },
                "properties": {
                    'title': 'Touristique Express SA Yaounde',
                    'marker-color': '#ff8888',
                    'marker-symbol': 'bus'
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [11.5110299, 3.8233828]
                },
                "properties": {
                    'title': 'Buca voyage Yaounde',
                    'marker-color': '#ff8888',
                    'marker-symbol': 'bus'
                }
            }
        ]
    }).addTo(map);


});


/* === la localisation d'une agence ===*/
myApp.onPageInit('localisation', function (page) {
    console.log('Services page initialized');
    console.log(page.query);

    //on recherche la section ou on doit rentrer les informations

        myApp.addNotification({
            message: 'Localisation ...',
            button:{
                text: 'Fermer'
            }
        });
    $$(page.container).find('.ag-localisation').text('localisation de '+page.query.agence);

    L.mapbox.accessToken = 'pk.eyJ1IjoibXZvbmRveWFubmljayIsImEiOiJjaWZ3d3c1ZGMwMjN3c3RtMGJidDQ4ZWl2In0.Azvjcz49V5_9DXxIm-_Mhg';
    var geolocate = document.getElementById('geolocate');
    var map = L.mapbox.map('map', 'mvondoyannick.o7p5kdh3').setView([3.8532129,11.485031], 10);

    var myLayer = L.mapbox.featureLayer().addTo(map);

// This uses the HTML5 geolocation API, which is available on
// most mobile browsers and modern browsers, but not in Internet Explorer
//
// See this chart of compatibility for details:
// http://caniuse.com/#feat=geolocation
    if (!navigator.geolocation) {
        geolocate.innerHTML = 'Geolocation is not available';
        myApp.addNotification({
            message: 'Geolocalisation indisponible',
            button:{
                text: 'Compris',
                color: 'blue'
            }
        });
    }
    else {
        map.locate()
    }

// Once we've got a position, zoom and center the map
// on it, and add a single marker.
    map.on('locationfound', function(e) {
        map.fitBounds(e.bounds);

        myLayer.setGeoJSON({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [e.latlng.lng, e.latlng.lat]
            },
            properties: {
                'title': 'Salut! vous etes ici.',
                'marker-color': '#ff8888',
                'marker-symbol': 'star'
            }
        });

    });

// If the user chooses not to allow their location
// to be shared, display an error message.
    map.on('locationerror', function() {
        //geolocate.innerHTML = 'Position could not be found';
        myApp.addNotification({
            message: 'impossible de determiner votre position',
            button:{
                text: 'Compris',
                color: 'blue'
            }
        });
    });

    L.mapbox.featureLayer({
        // this feature is in the GeoJSON format: see geojson.org
        // for the full specification
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry":
                {
                    "type": "Point",
                    "coordinates": [page.query.lonYde,page.query.latYde]
                },
                "properties": {
                    'title': page.query.agence+' Voyage Yaounde',
                    'marker-color': '#ff8888',
                    'marker-symbol': 'bus'
                }
            },
            {
                "type": "Feature",
                "geometry":
                {
                    "type": "Point",
                    "coordinates": [page.query.lonDla,page.query.latDla]
                },
                "properties": {
                    'title': page.query.agence+' Voyage Douala',
                    'marker-color': '#ff8888',
                    'marker-symbol': 'bus'
                }
            }
        ]
    }).addTo(map);


});

/* ===== les Pickers ===== */
myApp.onPageInit('page-achat', function (page) {
    var today = new Date();

    //pour le calendrier date depart
    var myCalendarDepart = myApp.calendar({
        input: '#calendar-depart',
        convertToPopover: true,
        monthNamesShort:['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthNames: 	['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout' , 'Septembre' , 'Octobre', 'Novembre', 'Decembre'],
        dateFormat: 'dd-mm-yyyy',
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        onChange: function(p, value, displayValue){
            console.log(p+" ,"+value+" ,"+displayValue);
        }
    });

    //pour le calendrier date arrivée
    var myCalendarArrive = myApp.calendar({
        input: '#calendar-arrive',
        convertToPopover: true,
        monthNamesShort:['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthNames: 	['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout' , 'Septembre' , 'Octobre', 'Novembre', 'Decembre'],
        dateFormat: 'dd-mm-yyyy',
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        onChange: function(p, value, displayValue){
            console.log(p+" ,"+value+" ,"+displayValue);
        }
    });

    // depart villes picker
    var pickerDepart = myApp.picker({
        input: '#ks-picker-depart',
        cols: [
            {
                textAlign: 'center',
                rotateEffect: true,
                values: ['Douala', 'Yaoundé']
            }
        ]
    });

    // arrivée villes picker
    var pickerArrive = myApp.picker({
        input: '#ks-picker-arrive',
        cols: [
            {
                rotateEffect: true,
                textAlign: 'center',
                values: ['Douala', 'Yaoundé']
            }
        ]
    });
    
    // type de voyage
    var pickerArrive = myApp.picker({
        input: '#ks-picker-type',
        cols: [
            {
                rotateEffect: true,
                textAlign: 'center',
                values: ['Allée simple', 'allée et retour']
            }
        ]
    });
    

    // classe de voyages picker
    var pickerArrive = myApp.picker({
        input: '#ks-picker-classe',
        cols: [
            {
                rotateEffect: true,
                textAlign: 'center',
                values: ['Premiere | 9000 F CFA', 'Premium | 6000 F CFA', 'Etudiant | 4000 F CFA', 'Low-cost | 3000 F CFA']
            }
        ]
    });

   //on retourne les informations sur la selection  des données su voyage
    var DataVoyage = localStorage.getItem('f7form-test');
    var depart, arrive, classe, DateDepart, DateRetour, type;
    var container = [];

    /*depart       = JSON.parse(DataVoyage).depart;
    arrive       = JSON.parse(DataVoyage).arrive;
    classe       = JSON.parse(DataVoyage).classe;
    DateDepart   = JSON.parse(DataVoyage).DateDepart;
    DateRetour   = JSON.parse(DataVoyage).DateRetour;

    //les données du voyageur
    var DataUser = localStorage.getItem('f7form-voyageur');
    var nom,prenom, email, phone, info;

    nom         = JSON.parse(DataUser).nom;
    prenom      = JSON.parse(DataUser).prenom;
    email         = JSON.parse(DataUser).email;
    phone       = JSON.parse(DataUser).phone;
    info         = JSON.parse(DataUser).info;

    container = [depart, arrive, classe, DateDepart, DateRetour, nom, prenom, email, phone, info];

    console.log(container);*/

});

/* ===== Pickers ===== */
myApp.onPageInit('pickers', function (page) {
    var today = new Date();

    // iOS Device picker
    var pickerDevice = myApp.picker({
        input: '#ks-picker-device',
        cols: [
            {
                textAlign: 'center',
                values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
            }
        ]
    });

    // Describe yourself picker
    var pickerDescribe = myApp.picker({
        input: '#ks-picker-describe',
        rotateEffect: true,
        cols: [
            {
                textAlign: 'left',
                values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
            },
            {
                values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
            },
        ]
    });

    // Dependent values
    var carVendors = {
        Japanese : ['Hondao', 'Lexus', 'Mazda', 'Nissan', 'Toyota'],
        German : ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo'],
        American : ['Cadillac', 'Chrysler', 'Dodge', 'Ford']
    };
    var pickerDependent = myApp.picker({
        input: '#ks-picker-dependent',
        rotateEffect: true,
        formatValue: function (picker, values) {
            return values[1];
        },
        cols: [
            {
                textAlign: 'left',
                values: ['Japanese', 'German', 'American'],
                onChange: function (picker, country) {
                    if(picker.cols[1].replaceValues){
                        picker.cols[1].replaceValues(carVendors[country]);
                    }
                }
            },
            {
                values: carVendors.Japanese,
                width: 160,
            },
        ]
    });

    // Custom Toolbar
    var pickerCustomToolbar = myApp.picker({
        input: '#ks-picker-custom-toolbar',
        rotateEffect: true,
        toolbarTemplate: 
            '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left">' +
                        '<a href="#" class="link toolbar-randomize-link">Randomize</a>' +
                    '</div>' +
                    '<div class="right">' +
                        '<a href="#" class="link close-picker">That\'s me</a>' +
                    '</div>' +
                '</div>' +
            '</div>',
        cols: [
            {
                values: ['Mr', 'Ms'],
            },
            {
                textAlign: 'left',
                values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
            },
            {
                values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
            },
        ],
        onOpen: function (picker) {
            picker.container.find('.toolbar-randomize-link').on('click', function () {
                var col0Values = picker.cols[0].values;
                var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];

                var col1Values = picker.cols[1].values;
                var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];

                var col2Values = picker.cols[2].values;
                var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];
                
                picker.setValue([col0Random, col1Random, col2Random]);
            });
        }
    });

    // Inline date-time
    var pickerInline = myApp.picker({
        input: '#ks-picker-date',
        container: '#ks-picker-date-container',
        toolbar: false,
        rotateEffect: true,
        value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
        onChange: function (picker, values, displayValues) {
            var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
            if (values[1] > daysInMonth) {
                picker.cols[1].setValue(daysInMonth);
            }
        },
        formatValue: function (p, values, displayValues) {
            return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
        },
        cols: [
            // Months
            {
                values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                displayValues: ('January February March April May June July August September October November December').split(' '),
                textAlign: 'left'
            },
            // Days
            {
                values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            },
            // Years
            {
                values: (function () {
                    var arr = [];
                    for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            // Space divider
            {
                divider: true,
                content: '&nbsp;&nbsp;'
            },
            // Hours
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            // Divider
            {
                divider: true,
                content: ':'
            },
            // Minutes
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
            }
        ]
    });
});


/* ===== Change statusbar bg when panel opened/closed ===== */
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-right').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-right');
});
$$('.panel-left, .panel-right').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

$$('.form-validate').on('click', function(){
   myApp.alert(1);
});

/* ===== Generate Content Dynamically ===== */
var dynamicPageIndex = 0;
function createContentPage() {
    mainView.router.loadContent(
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-content" class="page">' +
        '    <!-- Top Navbar-->' +
        '    <div class="navbar">' +
        '      <div class="navbar-inner">' +
        '        <div class="left"><a href="#" class="back link icon-only"><i class="icon icon-back"></i></a></div>' +
        '        <div class="center">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '      </div>' +
        '    </div>' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '        <p>Go <a href="#" class="back">back</a> or generate <a href="#" class="ks-generate-page">one more page</a>.</p>' +
        '      </div>' +
        '    </div>' +
        '  </div>'
    );
    return;
}
$$(document).on('click', '.ks-generate-page', createContentPage);

