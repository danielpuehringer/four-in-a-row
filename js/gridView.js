export default class GridView{

    constructor(model, $parentElem){
        this.model = model;
        this.$parentElem = $parentElem;
        this.width = $(this.$parentElem).find("svg").width();
        this.height = $(this.$parentElem).find("svg").height();
        this.rows = this.model.numRows;
        this.columns = this.model.numColumns;
        this.radiusPerCircle = (this.width/this.columns/2)-2.5;
        this.widthPerCircle = (this.width/this.columns/2);
    }

    /**
     * initializing the view by printing an empty grid
     */
    init(){
        this._printEmptyGrid();
    }

    /**
     * flushes the content of the svg when a restart happens
     */
    emptySVG(){
        $(this.$parentElem).find("svg").empty();
    }

    /**
     * prints an empty grid with white circles
     * @private
     */
    _printEmptyGrid(){
        var svg = this.$parentElem.find("svg");
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        newElement.setAttribute("class", "blue");
        newElement.setAttribute("width",this.width);
        newElement.setAttribute("height", this.height);
        svg.append(newElement);
        let cx = 0;
        let cy = 0;
        for(let i = 0; i < this.columns; i++){
            cy = 0;
            for(let j = 0; j < this.rows; j++){
                this._printSingleCircle("white", cx+this.widthPerCircle, cy+this.widthPerCircle, this.radiusPerCircle);
                cy+=100;
            }
            cx+=100;
        }
    }

    deleteHandlers(){
        $(this.$parentElem).off("click");
    }

    /**
     * gets called when a user throws in a token and calculates the data needed for _insertTokanAt
     * @param e
     * @private
     */
    _renderGraphicGrid(e){
        console.log(e);
        let currentPlayer = e.currentPlayer;
        let columnIndex = e.columnIndex;
        let rowIndex = e.rowIndex;
        let colorClass = "red";
        if(currentPlayer == 2){
            colorClass = "yellow";
        }
        let cx = 2.5;
        let cy = 2.5;
        cx += (columnIndex*100)+this.radiusPerCircle;
        cy += (((this.height/100)-rowIndex)*100)-this.radiusPerCircle-2.5;
        this._insertTokenAt(colorClass, cx, cy, this.radiusPerCircle);
    }

    /**
     * marks all winning stones by making them pulse
     * @param e
     * @private
     */
    _showGameOverState(e){
        let winningPlayer = e.currentPlayer;
        let winningTokens = e.tokens;
        $(this.$parentElem).find(".overlay-red").removeClass("overlay");
        $(this.$parentElem).find(".overlay-yellow").removeClass("overlay");
        for(let i=0; i < winningTokens.length; i++){//iterates through the winning stones which are given by e (data of the model)
            let y = winningTokens[i].rowIndex;
            let x = winningTokens[i].columnIndex;
            let cx = 2.5 + (x*100)+this.radiusPerCircle;
            let cy = -2.5+(((this.height/100)-y)*100)-this.radiusPerCircle;
            if(winningPlayer == 1){
                this._printSingleCircle("overlay-red", cx, cy, this.radiusPerCircle);
            }else{
                this._printSingleCircle("overlay-yellow", cx, cy, this.radiusPerCircle);
            }
        }
    }

    /**
     * prints a single circle at a certain position with a given class (white, yellow or red)
     * @param colorClass
     * @param cx
     * @param cy
     * @param r
     * @private
     */
    _printSingleCircle(colorClass, cx, cy, r){
        var svg = this.$parentElem.find("svg");
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        newElement.setAttribute("class", colorClass);
        newElement.setAttribute("cx", cx);
        newElement.setAttribute("cy",cy);
        newElement.setAttribute("r", r);
        svg.append(newElement);
    }

    /**
     * inserts the token in the grid whith an animation
     * @param colorClass
     * @param cx
     * @param cy
     * @param r
     * @private
     */
    _insertTokenAt(colorClass, cx, cy, r){
        var helpCy = 0;
        var svg = this.$parentElem.find("svg");
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        let pixelSpeed = 15;
        newElement.setAttribute("class", colorClass);
        newElement.setAttribute("cx", cx);
        newElement.setAttribute("cy",helpCy);
        newElement.setAttribute("r", r);
        svg.append(newElement);
        let intervalId = setInterval(function(){
            helpCy+=pixelSpeed;
            newElement.setAttribute("transform", "translate("+0+", "+helpCy+")");
            if(helpCy+pixelSpeed>cy){
                let difference = ((helpCy+pixelSpeed)-cy)+2.5;
                newElement.setAttribute("transform", "translate("+0+", "+(helpCy+difference)+")");
                helpCy+=pixelSpeed;
                newElement.setAttribute("transform", "translate("+0+", "+(helpCy-difference)+")");
                clearInterval(intervalId);
            }
        }, 1000/50)
    }
}