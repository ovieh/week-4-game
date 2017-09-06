'use strict';

function character(name, hp, ap, cap) {
    this.characterName = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = cap;
}

var obi = new character("Obi Wan-Kinobi", 120, 15, 20);
var luke = new character("Luke Skywalker", 100, 12, 25);
var sidius = new character("Darth Sidius", 150, 25, 10);
var darth = new character("Darth Maul", 180, 23, 8);

function Game() {
    this.player = "";
    this.defender = "";
}

var game = new Game();

function battle(attacker, defender) {
    console.log(attacker.attackPower);
}

$(function () {
    $(".player").one("click", function () {
        //$(this).siblings().hide();
        $(".player").off("click");
        $(this).siblings().addClass("available-players").removeClass("player");
        $(this).appendTo("#player-choice");
        $("#picks").appendTo("#available");

        switch ($(this).attr("id")) {
            case "obi":
                game.player = obi;
                break;
            case "luke":
                game.player = luke;
                break;
            case "sidius":
                game.player = sidius;
                break;
            case "darth":
                game.player = darth;
                break;
        }
    });

    $(document).on("click", ".available-players", function () {
        $(this).addClass("defender").removeClass("available-players");
        $(this).appendTo("#defender-area");

        switch ($(this).attr("id")) {
            case "obi":
                game.defender = obi;
                break;
            case "luke":
                game.defender = luke;
                break;
            case "sidius":
                game.defender = sidius;
                break;
            case "darth":
                game.defender = darth;
                break;
        }
    });

    $(document).on("click", "#attack", function () {
        console.log(game.player.attackPower);
    });

});