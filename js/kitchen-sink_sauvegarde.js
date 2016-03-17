//firebase
//var myDataRef = new Firebase('https://ibus.firebaseio.com/beta/test');
//id du testeur
var id = 434492;

// Init App
var myApp = new Framework7({
    modalTitle: '<i class="fa fa-map-marker"></i> &nbsp; TravelMore',
    tapHold: true,
    // Enable Material theme
    material: true,
    swipePanel: 'left',
    swipePanelCloseOpposite: true,
    modalPreloaderTitle: 'chagement ...',
    hideNavbarOnPageScroll: true,
    //materialRipple: false,
    hideNavbarOnPageScroll: false,
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
myApp.onPageInit('messages', function (page) {
    var conversationStarted = false;
    var answers = [
        'Yes!',
        'No',
        'Hm...',
        'I am not sure',
        'And what about you?',
        'May be ;)',
        'Lorem ipsum dolor sit amet, consectetur',
        'What?',
        'Are you sure?',
        'Of course',
        'Need to think about it',
        'Amazing!!!',
    ];
    var people = [
        {
            name: 'Kate Johnson',
            avatar: 'http://lorempixel.com/output/people-q-c-100-100-9.jpg'
        },
        {
            name: 'Blue Ninja',
            avatar: 'http://lorempixel.com/output/people-q-c-100-100-7.jpg'
        },
        
    ];
    var answerTimeout, isFocused;

    // Initialize Messages
    var myMessages = myApp.messages('.messages');

    // Initialize Messagebar
    var myMessagebar = myApp.messagebar('.messagebar');
    
    $$('.messagebar a.send-message').on('touchstart mousedown', function () {
        isFocused = document.activeElement && document.activeElement === myMessagebar.textarea[0];
    });
    $$('.messagebar a.send-message').on('click', function (e) {
        // Keep focused messagebar's textarea if it was in focus before
        if (isFocused) {
            e.preventDefault();
            myMessagebar.textarea[0].focus();
        }
        var messageText = myMessagebar.value();
        if (messageText.length === 0) {
            return;
        }
        // Clear messagebar
        myMessagebar.clear();

        // Add Message
        myMessages.addMessage({
            text: messageText,
            avatar: 'http://lorempixel.com/output/people-q-c-200-200-6.jpg',
            type: 'sent',
            date: 'Now'
        });
        conversationStarted = true;
        // Add answer after timeout
        if (answerTimeout) clearTimeout(answerTimeout);
        answerTimeout = setTimeout(function () {
            var answerText = answers[Math.floor(Math.random() * answers.length)];
            var person = people[Math.floor(Math.random() * people.length)];
            myMessages.addMessage({
                text: answers[Math.floor(Math.random() * answers.length)],
                type: 'received',
                name: person.name,
                avatar: person.avatar,
                date: 'Just now'
            });
        }, 2000);
    });
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
           if (window.localStorage){
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
           else{
               myApp.alert('Une erreur est survenue lors de la sauvegarde des informations');
           }
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
    if (!localStorage){
        console.log('Erreur, ce navigateur n est pas compatible');
    }
    else {
        /* === on defini les heures en fonction de la ville de dépar === */
        if (localStorage.getItem('depart')){
            //si ca existe
            if (localStorage.getItem(('depart') == 'douala')){
                $$(page.container).find('.matin-time').text('06h00');
                $$(page.container).find('.soir-time').text('14h45');
            }
            else if (localStorage.getItem('depart') == 'yaounde'){
                $$(page.container).find('.matin-time').text('10h15');
                $$(page.container).find('.soir-time').text('19h15');
            }
        }
        else {
            //ca n'existe pas
            $$(page.container).find('.matin-time').text('Ville érronée');
            $$(page.container).find('.soir-time').text('Ville erronée');
        }

        /* === les evenements === */
        /* === si le client click sur une heure de depart === */
        $$('input[value="matin"]').on('click', function(){
            if (localStorage.getItem('depart') == 'douala'){
                //on enregistre l'heure
                localStorage.setItem('heure', '06h00')
                myApp.addNotification({

                    message: 'Votre voyage quittera à '+localStorage.heure+' de '+localStorage.depart,
                    button: {
                        text: 'ok',
                        color: 'red'
                    }
                });
            }
            else if (localStorage.getItem('depart') == 'yaounde'){
                //on enregistre l'heure
                localStorage.setItem('heure', '10h45');

                myApp.addNotification({
                    message: 'Votre voyage quittera à '+localStorage.heure+' de '+localStorage.depart,
                    button: {
                        text: 'ok',
                        color: 'red'
                    }
                });
            }
        });
        $$('input[value="soir"]').on('click', function(){
            if (localStorage.getItem('depart') == 'douala'){
                //on enregistre l'heure
                localStorage.setItem('heure', '14h45')
                myApp.addNotification({

                    message: 'Votre voyage quittera à '+localStorage.heure+' de '+localStorage.depart,
                    button: {
                        text: 'ok',
                        color: 'red'
                    }
                });
            }
            else if (localStorage.getItem('depart') == 'yaounde'){
                //on enregistre l'heure
                localStorage.setItem('heure', '19h15');

                myApp.addNotification({
                    message: 'Votre voyage quittera à '+localStorage.heure+' de '+localStorage.depart,
                    button: {
                        text: 'ok',
                        color: 'red'
                    }
                });
            }
        });
    }

});

/* === concernant la ville arrivée === */
myApp.onPageInit('ville-arrive', function(page){
    console.log('Service initialisé');
    //console.log(page.query);

    /* === on verifie que toutes les variables minimum ont été introduite === */
    //var ville_depart = $$('input[value="this"]')
    $$('input[value="douala"]').on('click', function(){
        console.log('douala');
        /* === on enregistre la section === */
        if(!localStorage){
            console.log('Erreur, navigateur non compatible');
        }
        else {
            localStorage.setItem('arrive', 'douala');
        }
    });
    $$('input[value="yaounde"]').on('click', function(){
        console.log('yaounde');
        /* === on enregistre la section === */
        if(!localStorage){
            console.log('Erreur, navigateur non compatible');
        }
        else {
            localStorage.setItem('arrive', 'yaounde');
        }
    });
});


/* === concernant le recapitulatif d'achat du billet === */
myApp.onPageInit('recapitulatif-achat', function(page){
    console.log('Service recapitulatif initialisé');
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

    //on envoi les informations
    //on genere un uniqid en js
    var n=Math.floor(Math.random()*11);
    var k = Math.floor(Math.random()* 1000000);
    var m = String.fromCharCode(n)+k;

    /* === génération de la date === */
    var d = new Date();

    //firebase dataStorage

    /*myDataRef.push({
     id: m,
        name: localStorage.getItem('nom'),
     prénom: localStorage.getItem('prenom'),
     phone: localStorage.getItem('phone'),
     email: localStorage.getItem('email'),
     information: localStorage.getItem('info'),
        class: localStorage.classe,
        heure: localStorage.heure,
        prix: localStorage.getItem('prix-classe'),
        depart: localStorage.depart,
        arrive: localStorage.arrive,
     date: Date.now()
     });*/
    //console.log(page.query);
    myApp.addNotification({
        message: ' Vos données ont été enregistrées.',
        button:{
            text: 'OK',
            color: 'green'
        }
    });

    myApp.addNotification({
        message: localStorage.nom+' voulez-vous un taxi, hotel, restaurant à votre arrivé à '+localStorage.depart+'?',
        button:{
            text: 'OUI',
            color: 'red'
        }
    });
});


/* ==== la gestion des classes ==== */
myApp.onPageInit('classe', function(page){
   console.log('service classe initialisé');

    /* === on verifie que toutes les variables minimum ont été introduite === */
    //var ville_depart = $$('input[value="this"]')
    $$('input[value="premiere"]').on('click', function(){
        console.log('premiere');
        /* === on enregistre la section === */
        if(!localStorage){
            console.log('Erreur, navigateur non compatible');
        }
        else {
            localStorage.setItem('classe', 'premiere');
            localStorage.setItem('prix-classe', '9000');
        }
    });

    $$('input[value="premium"]').on('click', function(){
        console.log('premium');
        /* === on enregistre la section === */
        if(!localStorage){
            console.log('Erreur, navigateur non compatible');
        }
        else {
            localStorage.setItem('classe', 'premium');
            localStorage.setItem('prix-classe', '6000');
        }
    });

    $$('input[value="etudiant"]').on('click', function(){
        console.log('yaounde');
        /* === on enregistre la section === */
        if(!localStorage){
            console.log('Erreur, navigateur non compatible');
        }
        else {
            localStorage.setItem('classe', 'etudiant');
            localStorage.setItem('prix-classe', '4000');
        }
    });

    $$('input[value="low-cost"]').on('click', function(){
        console.log('low-cost');
        /* === on enregistre la section === */
        if(!localStorage){
            console.log('Erreur, navigateur non compatible');
        }
        else {
            localStorage.setItem('classe', 'low-cost');
            localStorage.setItem('prix-classe', '3000');
        }
    });
});

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
}else
{
    //myApp.alert('ca fonctionne');
    //var n=Math.floor(Math.random()*11);
    //var k = Math.floor(Math.random()* 1000000);
    //var m = String.fromCharCode(n)+k;

    myApp.addNotification({
        message: 'Liliane ID : '+id,
        button: {
            text: 'Terminé',
            color: 'blue'
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

myApp.onPageBeforeInit('page-achat', function (page){
    $$(page.container).find('.achat').text('Achat de ticket à '+page.query.agence);
    console.log('service achat initialisé');


    /* === on compare les deux villes  === */
    /*if (localStorage.depart == localStorage.arrive){
        myApp.alert('les deux villes semblent etre identiques.');
    }*/
    //definiton des agences de voyage selectionnées par le client
    localStorage.setItem('agence', page.query.agence);

    /* === le depart === */
    if (typeof localStorage.depart == 'undefined' || localStorage.depart == null) {
        $$(page.container).find('.depart').text('Choisir ...');
    }
    else {
        $$(page.container).find('.depart').text(localStorage.depart);
    }

    /* === l'arrive === */
    if (typeof localStorage.arrive == 'undefined' || localStorage.arrive == null) {
        $$(page.container).find('.arrive').text('Choisir ...');
    }
    else {
        $$(page.container).find('.arrive').text(localStorage.arrive);
    }

    /* === les classe === */
    if (typeof localStorage.classe == 'undefined' || localStorage.classe == null) {
        $$(page.container).find('.classe').text('Choisir ...');
    }
    else {
        $$(page.container).find('.classe').text(localStorage.classe+' @ '+localStorage.getItem('prix-classe'));
    }

    /* === les heures de depart === */
    if (typeof localStorage.heure == 'undefined' || localStorage.heure == null) {
        $$(page.container).find('.heure').text('Choisir ...');
    }
    else {
        $$(page.container).find('.heure').text(localStorage.heure);
    }

    /* === le nom et le telephone === */
    if (typeof localStorage.nom == 'undefined' || localStorage.nom == null) {
        $$(page.container).find('.client').text('identifiez-vous ...');
    }
    else {
        $$(page.container).find('.client').text(localStorage.nom);
    }

    /* === le type de voyage === */
    if (typeof localStorage.type == 'undefined' || localStorage.type == null) {
        $$(page.container).find('.type').text('choisir ...');
    }
    else {
        $$(page.container).find('.type').text(localStorage.type);
    }

    /* === la ville de départtop === */
    $$(page.container).find('.yde').on('click', function(){
       myApp.addNotification({
           message: 'vous y etes'
       });
    });
    
    $$(page.container).find('.form-validate').on('click', function(){
        if(!navigator.onLine){
            //myApp.alert('Vous semblez etre deconnecté du reseau internet')
            myApp.addNotification({
                message: 'Vous semblez etre déconnecté d\'internet'
            });
            /*=== on enregistre les données en locale ===*/
        }
        else if(!localStorage.getItem('nom') || !localStorage.getItem('phone')){
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
                id: m, name: localStorage.getItem('nom'),
                prénom: localStorage.getItem('prenom'),
                phone: localStorage.getItem('phone'),
                email: localStorage.getItem('email'),
                information: localStorage.getItem('info'),
                date: Date.now()
            });*/

            //on notifie le client de ce qui vient de se passer
            myApp.addNotification({
                message: 'Vos informations ont été enregistrées'
            });

            //redirection vers une nouvelle pasge
            mainView.router.loadPage('merci.html');
        }
    });

});


/* === reconnaissance vocale === */
$$('.recognition').on('click', function () {
    //
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

    /*myApp.addNotification({
        message: '<i class="fa fa-microphone fa-2x"></i>&nbsp;demarrage'
    });*/

    if (!('webkitSpeechRecognition' in window)) {
        myApp.addNotification({
            message: ' <i class="fa fa-microphone fa-2x"></i> &nbsp; Terminale incompatible'
        });
    } else {
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
    }

    /*var recognition = new SpeechRecognition();
    recognition.onresult = function(event) {
        if (event.results.length > 0) {
            q.value = event.results[0][0].transcript;
            q.form.submit();
        }
    }*/



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
    localStorage.setItem('paymode', page.query.paymentMode);

});


/* ===== MTN credit pay ===== */
myApp.onPageInit('mtn-credit-buy', function (page) {
    console.log('Services credit buy initialized');
    console.log(page.query);

    //on recherche la section ou on doit rentrer les informations
    $$(page.container).find('.ag-payment').text('Payer mon billet avec '+page.query.paymentMode);
    localStorage.setItem('paymode', page.query.paymentMode);

});

/* ===== la page de recherche ===== */
myApp.onPageInit('recherche', function (page) {
    console.log('Services recherche initialized');
    console.log(page.query);

    //on recherche la section ou on doit rentrer les informations
    /*$$(page.container).find('.ag-payment').text('Payer mon billet avec '+page.query.paymentMode);
    localStorage.setItem('paymode', page.query.paymentMode);*/

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
    //console.log(page.query);

    /* === on verifie que toutes les variables minimum ont été introduite === */
    //var ville_depart = $$('input[value="this"]')
    $$('input[value="douala"]').on('click', function(){
        console.log('douala');
        /* === on enregistre la section === */
        if(!localStorage){
            console.log('Erreur, navigateur non compatible');
        }
        else {
            localStorage.setItem('depart', 'douala');
        }
    });
    $$('input[value="yaounde"]').on('click', function(){
        console.log('yaounde');
        /* === on enregistre la section === */
        if(!localStorage){
            console.log('Erreur, navigateur non compatible');
        }
        else {
            localStorage.setItem('depart', 'yaounde');
        }
    });

});


/* === confirmation du choix du type de voyage === */
myApp.onPageInit('type', function (page){
    console.log('Service type voyage initialisé');
    //console.log(page.query);

    $$('input[value="allee"]').on('click', function(){
        console.log('allée simple');
        /* === on enregistre la section === */
        if(!localStorage){
            //console.log('Erreur, navigateur non compatible');
            myApp.addNotification({
                message: 'Erreur, votre terminal semble etre incompatible',
                button:{
                    text: 'Fermer',
                    color: 'red'
                }
            });
        }
        else {
            localStorage.setItem('type', 'allee');
        }
    });
    $$('input[value="alleeretour"]').on('click', function(){
        console.log('allee et retour');
        /* === on enregistre la section === */
        if(!localStorage){
            //console.log('Erreur, navigateur non compatible');
            myApp.addNotification({
                message: 'Erreur, votre terminal semble etre incompatible',
                button:{
                    text: 'Fermer',
                    color: 'red'
                }
            });
        }
        else {
            localStorage.setItem('type', 'allée retour');
        }
    });

});

/* === confirmation d'une reservation/achat === */
myApp.onPageInit('confirmation', function (page){
    console.log('Service confirmation initialisé');
    //on charge toutes les informations du client
    $$(page.container).find('.nom').text(localStorage.nom);
    $$(page.container).find('.prenom').text(localStorage.prenom);
    $$(page.container).find('.email').text(localStorage.email);
    $$(page.container).find('.info').text('Toucher pour voir');
    $$(page.container).find('.phone').text(localStorage.phone);


    //on charge les informations su voyage
    $$(page.container).find('.depart').text(localStorage.depart);
    $$(page.container).find('.arrive').text(localStorage.arrive);
    $$(page.container).find('.classe').text(localStorage.classe);
    $$(page.container).find('.info').text('Toucher pour voir');
    $$(page.container).find('.heure').text(localStorage.heure);

});



/* === gestion du paiement === */
myApp.onPageInit('paiement', function (page){
    console.log('Service paiement initialisé');
    //on charge toutes les informations du client
    $$(page.container).find('.titre').text('Paiement voyageur '+localStorage.nom+' '+localStorage.prenom);

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
    $$(page.container).find('.nom').text('informations supplementaires de '+localStorage.nom+' '+localStorage.prenom);
    $$(page.container).find('.info').text(localStorage.info);

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
    var map = L.mapbox.map('map', 'mvondoyannick.o7p5kdh3').setView([3.8532129,11.485031],12);

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
    var map = L.mapbox.map('map', 'mvondoyannick.o7p5kdh3').setView([3.8532129,11.485031]);

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
        Japanese : ['Honda', 'Lexus', 'Mazda', 'Nissan', 'Toyota'],
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

