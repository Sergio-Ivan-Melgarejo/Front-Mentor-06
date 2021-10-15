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
    for(let element in hours1){
        hours1[element].textContent = data[element].timeframes["daily"].current + "hrs";

        hours2[element].innerHTML = "Last Day - " + data[element].timeframes["daily"].previous + "hrs"
    }
}

const weeks = async ()=>{
    let data = await dataJson();
    for(let element in hours1){
        hours1[element].textContent = data[element].timeframes["weekly"].current + "hrs";

        hours2[element].innerHTML = "Last Week - " + data[element].timeframes["weekly"].previous + "hrs"
    }
}

const months = async ()=>{
    let data = await dataJson();
    for(let element in hours1){
        hours1[element].textContent = data[element].timeframes["monthly"].current + "hrs";

        hours2[element].innerHTML = "Last Month - " + data[element].timeframes["monthly"].previous + "hrs"
    }
}

//JSON
const dataJson = async ()=>{
    let dataFetch = await fetch("data.json");
    let dataJson = await dataFetch.json();
    return dataJson;
}

//event
all.addEventListener("click", activate);

addEventListener("DOMContentLoaded",()=>{
    days();
    daily.classList.add("active-2");
})