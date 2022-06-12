import createElement from "../helpers/createElement";

export default function Modal(attr = {}, child = []) {
	const modal = createElement("div", { class: "modal", ...attr }, [child]);
	document.addEventListener("click", (e) => {
		if (e.target === modal) {
			modal.style.display = "none";
		}
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			modal.style.display = "none";
		}
	});
	return modal;
}
