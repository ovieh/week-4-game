'use strict';
var count = 1;

function character(name, hp, ap, cap) {
    this.characterName = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = cap;
}

var obi = new character("Obi Wan-Kinobi", 120, 8, 15);
var luke = new character("Luke Skywalker", 100, 12, 25);
var sidius = new character("Darth Sidius", 150, 18, 10);
var maul = new character("Darth Maul", 180, 18, 20);
var jar_jar = new character("Jar Jar Binks", 0, 1, 2);

function Game() {
    this.player = "";
    this.defender = "";
}

var game = new Game();

function battle() {
    game.defender.healthPoints -= game.player.attackPower * count;
    $("#game-data").html("<div id='attacker'>" + "You attacked " + game.defender.characterName + " for " + game.player.attackPower * count + "</div>");

    game.player.healthPoints -= game.defender.counterAttackPower;
    $("#game-data").append("<div id='defender'>" + game.defender.characterName + " attacked you for " + game.defender.counterAttackPower + "</div>");

    count++;

    $(".player h6.hp").text(game.player.healthPoints);
    $(".defender h6.hp").text(game.defender.healthPoints);

}
//Choose Player
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
            case "maul":
                game.player = maul;
                break;
        }
    });
    //Choose Defender
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
            case "maul":
                game.defender = maul;
                break;
        }
    });

    $(document).on("click", "#attack", function () {

        if (game.defender.healthPoints > 0 && game.player.healthPoints > 0) {
            battle();
            if (game.player.healthPoints <= 0) {
                $("#game-data").text("You have been defeated!");
                // Remove other stuff here!
            } else if (game.defender.healthPoints <= 0) {
                $(".defender").detach();
                $("#game-data").text("You have defeated " + game.defender.characterName +
                    " , choose another player to attack!");
            }
            else if ($(".player-container").contents().length <=1 ) {
                console.log("You won");
            }
        }



    });

});