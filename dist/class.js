"use strict";
const urlParams = new URLSearchParams(window.location.search);
const className = urlParams.get("class");
fetch(`data/${className}.json`)
    .then((r) => r.json())
    .then((data) => {
    const header = document.getElementById("class-header");
    const classContainer = document.getElementById("class-container");
    header.innerHTML = `<h2><span>${className}</span>
			класс</h2><div>Классный руководитель:<br><span>${data.leader}</span></div>`;
    classContainer.querySelectorAll(".bubble").forEach((button) => {
        var _a, _b;
        const table = (_a = button.nextElementSibling) === null || _a === void 0 ? void 0 : _a.firstElementChild;
        if (!table)
            return;
        let tableStirng = `<thead><th>№</th><th>Время</th><th>Урок</th><th>Кабинет</th></thead><tbody>`;
        (_b = data.rasp[button.innerText]) === null || _b === void 0 ? void 0 : _b.forEach((rasp) => {
            var _a, _b, _c, _d;
            tableStirng += `<tr>
						<td>${(_a = rasp.index) !== null && _a !== void 0 ? _a : ""}</td>
						<td>${(_b = rasp.time) !== null && _b !== void 0 ? _b : ""}</td>
						<td>${(_c = rasp.subject) !== null && _c !== void 0 ? _c : ""}</td>
						<td>${(_d = rasp.cab) !== null && _d !== void 0 ? _d : ""}</td>
					</tr>`;
        });
        tableStirng += "</tbody>";
        table.innerHTML = tableStirng;
        button.addEventListener("click", () => {
            var _a, _b;
            button.classList.toggle("active");
            (_a = table.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("active");
            (_b = button.parentElement) === null || _b === void 0 ? void 0 : _b.classList.toggle("active");
        });
    });
});
