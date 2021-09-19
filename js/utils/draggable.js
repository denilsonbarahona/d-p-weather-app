const defaultConfig={
    open:true,
    debug:false,
    animable:true,
}

export default function draggable($element, config=defaultConfig){     
    if(!($element instanceof HTMLElement)) {
        return console.warn(`Elemento invalido se esperaba un HTMLElement y se recibio ${$element}`);
    }

    let isOpen = config.open;
    let isDraggabling = false;
    const elementRect = $element.getBoundingClientRect();
    const ELEMENT_BLOCK_SIZE = elementRect.height;
    const $market = $element.querySelector('[data-marker]');
    const MARKET_BLOCK_SIZE = $market.getBoundingClientRect().height;

    
    const VISIBLE_Y_OPEN = 0;
    const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKET_BLOCK_SIZE;
    let widgetPosition = VISIBLE_Y_OPEN;
    let startY = 0;
    isOpen ? open() : close();


    $market.addEventListener("click", handleClick);
    $market.addEventListener("pointerdown", handlePointerDown);
    $market.addEventListener("pointerup", handlePointerUp);
    $market.addEventListener("pointercancel", handlePointerCancel);
    $market.addEventListener("pointerout", handlePointerOut);
    $market.addEventListener("pointermove", handlePointerMove);


    if(config.animable) {
        setAnimation();
    }

    function handlePointerMove(event){ 
        drag(event); 
    }

    function handlePointerCancel(){
        dragEnd();
    }

    function handlePointerOut(){
        dragEnd();
    }

    function handlePointerUp(){
        dragEnd();
    }

    function handlePointerDown(event){ 
        startDrag(event); 
    }

    function handleClick(){ toggle(); }

    function pageY(event) {        
        return event.pageY || event.touches[0].pageY;
    }
    
    function dragEnd() {
        isDraggabling=false;
        bounce();
    }

    function startDrag(event){
        isDraggabling = true;        
        startY = pageY(event);
    }

    function toggle() {
        if(!isDraggabling){
            if(isOpen) {
                return close();
            }

            return open();
        }
    }

    function logger(message){
        if(config.debug){
            console.info(message)
        }
    }

    function open(){
        logger("Abrir Widget");
        isOpen = true;
        widgetPosition = VISIBLE_Y_OPEN;
        setWidgetPostion(widgetPosition);
    }

    function close() {
        logger("Cerrar Widget");
        isOpen = false;
        widgetPosition = HIDDEN_Y_POSITION;
        setWidgetPostion(widgetPosition);
    }
    
    function setWidgetPostion(value){
        $element.style.marginBottom = `-${value}px`;
    }

    function drag(event){
        const cursorY = pageY(event);        
        const movementY = cursorY - startY;
        widgetPosition = widgetPosition + movementY;
        startY = cursorY;
        if(widgetPosition > HIDDEN_Y_POSITION) return false;
        setWidgetPostion(widgetPosition);
    }

    function setAnimation(){
        $element.style.transition ="margin-bottom .3s";
    }

    function bounce(){
        if(widgetPosition < ELEMENT_BLOCK_SIZE /2) {
            return open();
        }
        return close();
    }
}
