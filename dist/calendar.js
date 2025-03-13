"use strict";
const calendarElement = document.getElementById("calendar");
fetch("data/events.json")
    .then((r) => r.json())
    .then((data) => {
    data.forEach((event) => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("event", "bubble");
        eventElement.innerHTML = `<div class="date">${event.date}</div>`;
        event.events.forEach((event) => {
            eventElement.innerHTML += `<li class="name">${event}</li>`;
        });
        calendarElement.appendChild(eventElement);
    });
});
