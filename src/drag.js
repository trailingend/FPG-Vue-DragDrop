import Draggabilly from 'draggabilly';
import $ from 'jquery';

export default class Drag {
    constructor(elemSelector, dropCtnrSelector, dropSelector, saveCallback) {
        this.dragItems = $(elemSelector);
        this.draggabillyInstances = []
        this.dragItems.each((index, item)=>{
            this.draggabillyInstances.push(new Draggabilly(item));
        });
        this.dropCtnr = $(dropCtnrSelector);
        this.dropItems = $(dropSelector);
        this.saveCallback = saveCallback;
        this.init();
        this.addEventListener();
    }
    init() {
        this.dragItems.each((index, item)=> {
            item.classList.add('drag-listner-added');
        });
    }
    addEventListener(){
        this.draggabillyInstances.forEach((instance, index)=>{
            instance.on('dragStart', this.handleDragStart.bind(this));
            instance.on('dragMove', this.handleDragMove.bind(this));
            instance.on('dragEnd', this.handleDragEnd.bind(this));
        })
    }
    handleDragStart(event){
        const selectedDiv = event.target.parentNode;
        selectedDiv.style.zIndex = 60;
        // open the saving rack
        this.dropCtnr.addClass('show');
    }
    handleDragMove(){

    }
    handleDragEnd(event){
        const selectedDiv = event.target.parentNode;
        selectedDiv.style.left = 0 + 'px';
		selectedDiv.style.top = 0 + 'px';
        selectedDiv.style.zIndex = 10;
        this.dropCtnr.removeClass('show');
        
        this.saveCallback(selectedDiv);
    }
}
