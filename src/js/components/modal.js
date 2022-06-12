import createElement from "../helpers/createElement";

/**
 * Creates modal element
 * @param {HTMLElement} prevFocusedElement Previously focused element
 * @param {object} attr Modal attributes
 * @param {HTMLElement} child Modal child
 * @returns {HTMLElement} Modal Element
 */

export default function Modal(prevFocusedElement, attr = {}, child = []) {
	const modal = createElement(
		"div",
		{ class: "modal", role: "dialog", ...attr },
		[child]
	);
	document.addEventListener("click", (e) => {
		if (e.target === modal) {
			modal.style.display = "none";
			prevFocusedElement.focus();
		}
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			modal.style.display = "none";
			prevFocusedElement.focus();
		}
	});
	return modal;
}
