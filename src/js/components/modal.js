export default function modal() {
	const modal = document.createElement("div");
	modal.classList.add("modal");
	document.addEventListener("click", (e) => {
		if (e.target === modal) {
			modal.style.display = "none";
		}
	});
	return modal;
}
