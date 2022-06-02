function createPopup(button, popup, counter, closeButton) {
	let count = 0;
	button.addEventListener("click", () => {
		count++;
		counter.innerText = `${count} times`;
		if (count > 5) {
			const popupResetButton = document.createElement("button");
		}
		popup.style.display = "grid";
	});
	popup.addEventListener("click", (e) => {
		// popup.style.display = "none";
	});
	closeButton.addEventListener("click", (e) => {
		popup.style.display = "none";
	});
}
