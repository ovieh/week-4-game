'use strict';
var count = 1;
var enemiesDefeated = 0; //I couldn't figure out a way to the the game dynamically, so I copped out and used a counterg

function Character(name, hp, ap, cap) {
    this.characterName = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = cap;
}

var obi = new Character("Obi Wan-Kinobi", 105, 10, 15);
var luke = new Character("Luke Skywalker", 90, 12, 18);
var sidius = new Character("Darth Sidius", 110, 10, 15);
var maul = new Character("Darth Maul", 108, 10, 12);

function Game() {
    this.player = "";
    this.defender = "";
}

var game = new Game();

function restart() {
    $("#restart").show();
    $("#restart").click(function () {
        location.reload();
    });
}

$("#restart").hide();

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
        enemiesDefeated++;
    });

    $(document).on("click", "#attack", function () {

        if (game.defender.healthPoints > 0 && game.player.healthPoints > 0 && enemiesDefeated !== 3) {
            battle();
            if (game.player.healthPoints <= 0) {
                $("#game-data").text("You have been defeated!");
                restart();
            } else if (game.defender.healthPoints <= 0) {
                $(".defender").detach();
                $("#game-data").text("You have defeated " + game.defender.characterName +
                    " , choose another player to attack!");
            }
        } else {
            console.log("you won");
            $(".defender").hide();
            $("#game-data").html("You you defeated all your enemies, press restart to play again");
            restart();
        }
    });
});

