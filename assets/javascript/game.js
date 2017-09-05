'use strict';

function character(hp, ap, cap) {
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = cap;
}

var obi = new character(120, 15, 20);
var luke = new character(100, 12, 25);
var sidius = new character(150, 25, 10);
var darth = new character(180, 23, 8);

$(function () {
    $(".player").one("click", function () {
        //$(this).siblings().hide();
        $(".player").off("click");
        $(this).siblings().addClass("available-players").removeClass("player");
        $(this).appendTo("#player-choice");
        $("#picks").appendTo("#available");
    });

    $(document).on("click", ".available-players", function () {
        $(this).addClass("defender").removeClass("available-players");
        $(this).appendTo("#defender-area");     
    });
});
