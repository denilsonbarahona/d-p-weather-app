export function setViewportSize($container){
    const viewPortBlockSize = getViewport();
    $container.style.blockSize = `${viewPortBlockSize}px`;
}

export function getViewport() {
    return window.innerHeight;
}

export function onViewportResize(callback){
    window.addEventListener("resize",callback);
}

export function offViewportResize(callback){
    window.removeEventListener("resize",callback);
}

export function ViewportSize($container) {
    setViewportSize($container);
    
    onViewportResize(()=>setViewportSize($container));
}
