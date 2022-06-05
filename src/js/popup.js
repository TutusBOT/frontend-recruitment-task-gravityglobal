function createPopup(button, popup, counter, closeButton, resetButton) {
	let count = 0;
	if (localStorage.getItem("popupCounter")) {
		count = parseInt(localStorage.getItem("popupCounter"));
	}
	button.addEventListener("click", () => {
		count++;
		localStorage.setItem("popupCounter", count);
		counter.innerText = `${count} times`;
		if (count > 5) {
			resetButton.style.display = "block";
		}
		popup.style.display = "grid";
	});
	closeButton.addEventListener("click", (e) => {
		popup.style.display = "none";
	});
	resetButton.addEventListener("click", () => {
		count = 0;
		localStorage.setItem("popupCounter", count);
		counter.innerText = `${count} times`;
		resetButton.style.display = "none";
	});
}
