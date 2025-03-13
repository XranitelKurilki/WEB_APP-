const urlParams = new URLSearchParams(window.location.search);
const className = urlParams.get("class");
fetch(`data/${className}.json`)
	.then((r) => r.json())
	.then((data) => {
		const header = <HTMLDivElement>document.getElementById("class-header");
		const classContainer = <HTMLDivElement>document.getElementById("class-container");

		header.innerHTML = `<h2><span>${className}</span>
			класс</h2><div>Классный руководитель:<br><span>${data.leader}</span></div>`;

		classContainer.querySelectorAll(".bubble").forEach((button) => {
			const table = button.nextElementSibling?.firstElementChild;
			if (!table) return;

			let tableStirng = `<thead><th>№</th><th>Время</th><th>Урок</th><th>Кабинет</th></thead><tbody>`;
			data.rasp[(<HTMLDivElement>button).innerText]?.forEach(
				(rasp: { index: string; time: string; subject: string; cab: string }) => {
					tableStirng += `<tr>
						<td>${rasp.index ?? ""}</td>
						<td>${rasp.time ?? ""}</td>
						<td>${rasp.subject ?? ""}</td>
						<td>${rasp.cab ?? ""}</td>
					</tr>`;
				}
			);
			tableStirng += "</tbody>";
			table.innerHTML = tableStirng;

			button.addEventListener("click", () => {
				button.classList.toggle("active");
				table.parentElement?.classList.toggle("active");
				button.parentElement?.classList.toggle("active");
			});
		});
	});
