export default class sliderView{
    constructor(model, $parentElement){
        this.model = model;
        this.$parentElement = $parentElement;
    }

    /**
     * initializing the slider view by setting the handlers
     */
    init(){
        $(this.$parentElement).find("#thumbSliderView").css("border-top-color", "#ED3316");
        $("#gridView").on("click", (e) =>{
            let column = (Math.ceil((e.pageX - $("svg").offset().left)/100)-1);
            if (this.model.isInsertTokenPossibleAt(column)) {
                this.model.insertTokenAt(column);
            }
        });

        $(window).on("mousemove", (e)=>{
            let marginLeft = (e.pageX - $("#sliderView").offset().left);
            if(this.model.currentPlayer == 1){
                $(this.$parentElement).find("#thumbSliderView").css("border-top-color", "#ED3316");
            }else{
                $(this.$parentElement).find("#thumbSliderView").css("border-top-color", "#EDD212");
            }
            if(marginLeft > 45 && marginLeft<645){
                $(this.$parentElement).find("#thumbSliderView").css("margin-left", marginLeft-45);
            }
        });
    }

    deleteHandlers(){
        $("#gridView").off("click");
        $(window).off("mousemove");
    }
}