"use strict"

const all = document.querySelector(".container-grid");
//bta
const daily = document.querySelector(".header__day");
const weekly = document.querySelector(".header__week");
const monthly = document.querySelector(".header__month");
//hours
const hours1 = document.querySelectorAll(".flex__hour-1");
const hours2 = document.querySelectorAll(".flex__hour-2");

//function
function activate(e){
    let event = e.target;
    if(event == daily){ 
        days();
        event.classList.add("active-2");
        weekly.classList.remove("active-2");
        monthly.classList.remove("active-2");
    }
    else if (event == weekly) {
        weeks();
        event.classList.add("active-2");
        monthly.classList.remove("active-2");;
        daily.classList.remove("active-2");
    }
    else if (event == monthly) {
        months();
        event.classList.add("active-2");
        weekly.classList.remove("active-2");
        daily.classList.remove("active-2");
    }
    else if(event.classList.contains("box-flex")){
        event.classList.toggle("active");
    }
    else if (event.classList.contains("flex__activity")||
            event.classList.contains("flex__hour-1")||
            event.classList.contains("flex__hour-2")){
        event.parentNode.classList.toggle("active");
    }
    else if(event.classList.contains("flex__img")){
        alert("?")
    }
}

const days = async ()=>{
    let data = await dataJson();
    for(let i = 0; i < 6; i++){
        hours1[i].textContent = data[i].timeframes["daily"].current + "hrs";
        hours2[i].innerHTML = "Last Day - " + data[i].timeframes["daily"].previous + "hrs"
    }
}

const weeks = async ()=>{
    let data = await dataJson();    
    for(let i = 0; i < 6; i++){
        hours1[i].textContent = data[i].timeframes["weekly"].current + "hrs";
        hours2[i].innerHTML = "Last Week - " + data[i].timeframes["weekly"].previous + "hrs"
    }
}

const months = async ()=>{
    let data = await dataJson();
    for(let i = 0; i < 6; i++){
        let time = data[i]["timeframes"]["monthly"]["current"];
        hours1[i].textContent = time + "hrs";
        time = data[i].timeframes.monthly.previous;
        hours2[i].innerHTML = "Last Month - " + time + "hrs";
    }
}

//JSON
const dataJson = async ()=>{
    let dataFetch = await fetch("data.json");
    let dataJson = await dataFetch.text();
    return JSON.parse(dataJson);
}

//event
all.addEventListener("click", activate);

addEventListener("DOMContentLoaded",()=>{
    days();
    daily.classList.add("active-2");
})