export default class ButtonView{
    constructor(model, $parentElem){
        this.model = model;
        this.$parentElem = $parentElem;
        this.EVENTS = {
            RESTART : "restart"
        };//the restart event gets fired if the reset button gets clicked
    }

    /**
     * initializing the view, adding click handlers
     */
    init(){
        $(this.$parentElem).find(".infoField").removeClass("alert-warning");
        $(this.$parentElem).find(".infoField").addClass("alert-danger");
        $(this.$parentElem).find(".infoField").text("Spieler Nr. 1 ist an der Reihe");
        $(this.$parentElem).find("button").on('click', () => {
            $(this).triggerHandler(this.EVENTS.RESTART);
        });
    }

    /**
     * shows, which player is next by changing classes of info field
     * @param e is given as model, so we get the data from the model
     */
    showState(e){
        let nextPlayer = 3-(e.currentPlayer);
        if(nextPlayer == 1){
            //red
            $(this.$parentElem).find(".infoField").removeClass("alert-warning");
            $(this.$parentElem).find(".infoField").addClass("alert-danger");
        }else{
            //yellow
            $(this.$parentElem).find(".infoField").removeClass("alert-danger");
            $(this.$parentElem).find(".infoField").addClass("alert-warning");

        }
        $(this.$parentElem).find(".infoField").text("Spieler Nr. " + nextPlayer + " ist an der Reihe");
    }

    /**
     * removes the necessary classes to display, that the game is over
     * @param e has the data of the model
     */
    showGameOver(e){
        $(this.$parentElem).find(".infoField").removeClass("alert-danger");
        $(this.$parentElem).find(".infoField").removeClass("alert-warning");
        $(this.$parentElem).find(".infoField").addClass("alert-success");
        $(this.$parentElem).find(".infoField").html("<b>Game over!</b>Spieler Nr. " + e.currentPlayer + " hat gewonnen!");
    }


    deleteHandlers() {
        $(this.$parentElem).find("button").off('click');
    }
}