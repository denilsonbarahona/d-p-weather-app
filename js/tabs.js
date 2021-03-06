import {handleSetSelectedClick} from './utils/period-time.js';

const $tabContainer = document.querySelector("#tabs");
const $tabList = $tabContainer.querySelectorAll(".tab");

const today = new Date();
let weekday = today.getDay();

const week = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
];

function nextDay(day){
    if(day === 6) return 0
    return day +1;
}

$tabList.forEach(($tab, index)=>{
    $tab.addEventListener("click",handleSelectedTabClick);
    
    if(index === 0) {
        $tab.textContent = "Hoy";
        weekday = nextDay(weekday);
        return false;    
    }

    if(index === 1) {
        $tab.textContent = "Mañana";
        weekday = nextDay(weekday);
        return false;    
    }

    $tab.textContent = week[weekday];
    weekday = nextDay(weekday);
});

function handleSelectedTabClick(event) {
    const $tabSelected = event.target;
    const $tabActive = document.querySelector('.tab[aria-selected="true"]');
    $tabActive.removeAttribute("aria-selected");
    $tabSelected.setAttribute("aria-selected", true);
    
    const id = $tabSelected.id;
    const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`);
    const $tabPanelSelected = document.querySelector(`.tabPanel:not([hidden])`);

    const selectedPanelId = id.split("-")[1];
    handleSetSelectedClick(`weather-section-${selectedPanelId}-0`)
    $tabPanel.hidden = false;
    $tabPanelSelected.hidden = true;
}


