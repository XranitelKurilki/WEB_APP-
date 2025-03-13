const calendarElement = <HTMLDivElement>document.getElementById("calendar");
fetch("data/events.json")
	.then((r) => r.json())
	.then((data) => {
		data.forEach((event: { date: string; events: string[] }) => {
			const eventElement = document.createElement("div");
			eventElement.classList.add("event", "bubble");
			eventElement.innerHTML = `<div class="date">${event.date}</div>`;

			event.events.forEach((event) => {
				eventElement.innerHTML += `<li class="name">${event}</li>`;
			});
			calendarElement.appendChild(eventElement);
		});
	});
