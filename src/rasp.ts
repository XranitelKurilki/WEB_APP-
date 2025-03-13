const raspContainer = <HTMLDivElement>document.getElementById("class-container");
const classes = [
	"5А",
 	"5Б",
  	"5В",
   	"5Г",
    "5К",
	"5Е",
	"6А",
	"6Б",
	"6Г",
	"6Д",
	"6К",
	"7А",
	"7Б",
	"7В",
	"7Г",
	"7К",
	"8А",
	"8Г",
	"8Д",
	"8К",
	"8П",
	"8ИТ",
	"9Б",
	"9В",
	"9Г",
	"9К",
	"9ИТ",
	"10Г",
	"10ИТ",
	"11Г",
	"11ИТ",
			];

if (raspContainer) {
	classes.forEach((className) => {
		raspContainer.innerHTML += `<a class="bubble class" href="class.html?class=${className}">${className}</a>`;
	});
}
