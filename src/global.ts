function updateHeader(timerElement: HTMLDivElement, classNumElement: HTMLDivElement) {
	const date = new Date();
	const now = date.getHours() * 100 + date.getMinutes();
	const timerParts = timerElement.children;
	const classNumParts = classNumElement.children;

	const timeTable = date.getDay() === 1 ? "mon" : date.getDay() === 6 ? "sat" : "def";

	// скрыть таймер если время до 8:00 или 18:40
	if (
		now < 800 ||
		now >=
			{
				mon: 1850,
				def: 1845,
				sat: 1840,
			}[timeTable]
	) {
		timerElement.hidden = true;
		classNumElement.hidden = true;
		return;
	}
	timerElement.hidden = false;
	classNumElement.hidden = false;

	const { num, isBreak, time } = getClassState(now, timeTable);
	const index = num - (timeTable === "mon" ? 1 : 0);

	let timeLeft = time - now;
	if (timeLeft > 40) timeLeft -= 40;

	timerParts[1].innerHTML = isBreak ? "перемены" : "урока";
	timerParts[3].innerHTML = timeLeft.toString();
	timerParts[4].innerHTML =
		timeLeft > 10 && timeLeft < 20
			? "минут"
			: timeLeft % 10 === 1
			? "минута"
			: (timeLeft - 1) % 10 < 4
			? "минуты"
			: "минут";

	classNumParts[0].innerHTML = (((index - 1) % 7) + 1).toString();
	classNumParts[1].innerHTML = isBreak ? "Перемена" : "Урок";
	classNumParts[3].innerHTML = index < 7 ? "1" : "2";
}

function getClassState(time: number, timeTable: "def" | "mon" | "sat") {
	const classTimes = {
		mon: [800, 835, 925, 1025, 1125, 1225, 1315, 1400, 1440, 1540, 1630, 1720, 1810, 9999], // Понедельник
		def: [800, 850, 950, 1050, 1150, 1240, 1330, 1430, 1530, 1625, 1715, 1805, 9999], // Вт-Пт
		sat: [800, 850, 940, 1030, 1120, 1210, 1300, 1350, 1440, 1530, 1620, 1710, 1800, 9999], // Суббота
	}[timeTable];
	const breakTimes = {
		mon: [830, 915, 1005, 1105, 1205, 1305, 1355, 1420, 1520, 1620, 1710, 1800, 1850, 9999],
		def: [840, 930, 1030, 1130, 1230, 1320, 1420, 1510, 1610, 1705, 1755, 1845, 9999],
		sat: [840, 930, 1020, 1110, 1200, 1250, 1340, 1430, 1520, 1610, 1700, 1750, 1840, 9999],
	}[timeTable];

	let closestClassTime = { index: 0, time: 0 };
	for (let i = 0; i < classTimes.length; i++) {
		if (time - classTimes[i] < 0) {
			closestClassTime = { index: --i, time: classTimes[i] };
			break;
		}
	}

	let closestBreakTime = { index: 0, time: 0 };
	for (let i = 0; i < breakTimes.length; i++) {
		if (time - breakTimes[i] < 0) {
			closestBreakTime = { index: --i, time: breakTimes[i] };
			break;
		}
	}

	if (closestClassTime.time < closestBreakTime.time) {
		return {
			num: closestBreakTime.index + 1,
			isBreak: true,
			time: classTimes[closestClassTime.index + 1],
		};
	} else {
		return {
			num: closestClassTime.index + 1,
			isBreak: false,
			time: breakTimes[closestBreakTime.index + 1],
		};
	}
}

const timer = <HTMLDivElement>document.getElementById("timer");
const class_num = <HTMLDivElement>document.getElementById("class-num");
if (timer && class_num) {
	updateHeader(timer, class_num);
	setTimeout(() => {
		updateHeader(timer, class_num);
		setInterval(updateHeader, 1000, timer, class_num);
	}, 60000 - new Date().getSeconds() * 1000);
}
