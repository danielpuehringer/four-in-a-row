import Model from "./model.js";
import GridView from "./gridView.js";
import ButtonView from "./buttonView.js";
import SliderView from "./sliderView.js";

function _onKeyDown(e) {
	let columnIndex = String.fromCharCode(e.keyCode) - 1;
	if (model.isInsertTokenPossibleAt(columnIndex)) {
		model.insertTokenAt(columnIndex);
	}
}

function _onGameOver(e) {
	//$("#output").html(model.toString().replace(/\n/g, "<br>") + `Game over. Player ${e.currentPlayer} wins.`);
	$(window).off("keypress.connectFour", _onKeyDown);
}

function _renderBoard(e) {
	//$("#output").html(model.toString().replace(/\n/g, "<br>"));
}

let model = new Model();
let gridView = new GridView(model, $("#gridView"));
let buttonView =  new ButtonView(model, $("#buttonView"));
let sliderView = new SliderView(model, $("#sliderView"));
$(model).on(model.EVENTS.INIT_COMPLETE, _initGame);
$(model).on(model.EVENTS.INIT_COMPLETE, _initGridView);
$(model).on(model.EVENTS.INIT_COMPLETE, _initButtonView);
model.init();
gridView.init();
buttonView.init();
sliderView.init();

function _initGame() {
	$(window).on("keypress.connectFour", _onKeyDown);
	$(model).on(model.EVENTS.INSERT_TOKEN, _renderBoard);
	$(model).on(model.EVENTS.GAME_OVER, _onGameOver);

	_renderBoard();
}

/**
 * setting the listeners for the grid view
 * @private
 */
function _initGridView(){
	$(model).on(model.EVENTS.INSERT_TOKEN, _renderGraphicGrid);
	$(model).on(model.EVENTS.GAME_OVER, _showGameOverState);
    $(buttonView).on(buttonView.EVENTS.RESTART, _restartGame);
}

/**
 * setting the listeners for the button view
 * @private
 */
function _initButtonView() {
	$(model).on(model.EVENTS.INSERT_TOKEN, _showButtonViewState);
	$(model).on(model.EVENTS.GAME_OVER, _showButtonViewGameOver);
}

function _showButtonViewState(e){
	buttonView.showState(e);
}

function _showButtonViewGameOver(e){
	buttonView.showGameOver(e);
}

function _renderGraphicGrid(e){
	gridView._renderGraphicGrid(e);
}

function _showGameOverState(e){
	gridView.deleteHandlers();
	gridView._showGameOverState(e);
}

/**
 * resetting the values of the game for a fresh restart
 * @private
 */
function _restartGame(){
    $(window).off("keypress.connectFour");
    buttonView.deleteHandlers();
	sliderView.deleteHandlers();
    gridView.emptySVG();
    model.currentPlayer = 1;
    location.reload();
    model.init();
    gridView.init();
    buttonView.init();
    sliderView.init();
}




