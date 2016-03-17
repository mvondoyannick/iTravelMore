/*jslint browser: true*/
/*global console*/

var myapp = myapp || {};
myapp.pages = myapp.pages || {};

//on verifie
if (typeof localStorage.start == 'undefined' || localStorage.start == null) {

    myapp.pages.IndexPageController = function (myapp, $$) {
        'use strict';

        // Init method
        (function () {

            var options = {
                    'bgcolor': '#0da6ec',
                    'fontcolor': '#fff',
                    'onOpened': function () {
                        console.log("welcome screen opened");
                    },
                    'onClosed': function () {
                        console.log("welcome screen closed");
                        location.href = 'index/index.html';
                    }
                },
                welcomescreen_slides,
                welcomescreen;

            welcomescreen_slides = [
                {
                    id: 'slide0',
                    picture: '<div class="tutorialicon"><i class="fa fa-modx"></i></div>',
                    text: 'Bienvenu sur TravelMore, le service qui va changer votre manière de voyager et découvrir. the <a class="tutorial-next-link" href="#">next steps</a> we will guide you through a manual that will teach you how to use this app.'
                },
                {
                    id: 'slide1',
                    picture: '<div class="tutorialicon"><i class="fa fa-bus"></i></div>',
                    text: 'Découvrez tous les bus qui vous sont proposé à porter de votre smartphone.'
                },
                {
                    id: 'slide2',
                    picture: '<div class="tutorialicon"><i class="fa fa-taxi"></i></div>',
                    text: 'Pensez a votre taxi bien même avant d\'etre arrivé à votre destination.'
                },
                {
                    id: 'slide3',
                    picture: '<div class="tutorialicon"><i class="fa fa-bed"></i></div>',
                    text: 'Des hotels/motels qui vous attentent suivant vos critereres et desponible uniquement pour vous.'
                },
                {
                    id: 'slide4',
                    picture: '<div class="tutorialicon"><i class="fa fa-train"></i></div>',
                    text: 'Effectuer toutes vos transactions dans un cadre securisé. nous utilisons la sécurité via le PKI.'
                },
                {
                    id: 'slide5',
                    picture: '<div class="tutorialicon"><i class="fa fa-cutlery"></i></div>',
                    text: 'Effectuer toutes vos transactions dans un cadre securisé. nous utilisons la sécurité via le PKI.'
                },
                {
                    id: 'slide6',
                    picture: '<div class="tutorialicon"><i class="fa fa-moon-o"></i></div>',
                    text: 'Effectuer toutes vos transactions dans un cadre securisé. nous utilisons la sécurité via le PKI.'
                },
                {
                    id: 'slide6',
                    picture: '<div class="tutorialicon"><i class="fa fa-lock"></i></div>',
                    text: 'Effectuer toutes vos transactions dans un cadre securisé. nous utilisons la sécurité via le PKI.'
                },
                {
                    id: 'slide6',
                    picture: '<div class="tutorialicon"><i class="fa fa-map-marker"></i></div>',
                    text: 'Effectuer toutes vos transactions dans un cadre securisé. nous utilisons la sécurité via le PKI.'
                },
                {
                    id: 'slide7',
                    picture: '<div class="tutorialicon"><i class="fa fa-rocket"></i></div>',
                    text: 'Thanks for reading! Enjoy this app or go to <a class="tutorial-previous-slide" href="#">previous slide</a>.<br><br><a class="tutorial-close-btn" href="#">Démarrer</a>'
                }

            ];

            welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);

            $$(document).on('click', '.tutorial-close-btn', function () {
                welcomescreen.close();
            });

            $$('.tutorial-open-btn').click(function () {
                welcomescreen.open();
            });

            $$(document).on('click', '.tutorial-next-link', function (e) {
                welcomescreen.next();
            });

            $$(document).on('click', '.tutorial-previous-slide', function (e) {
                welcomescreen.previous();
            });

        }());

    };
    localStorage.setItem('start','true');
}
else {
    //$$(page.container).find('.depart').text(localStorage.depart);
    location.href = 'index/index.html';
}
