export default function button(text, className, callback) {
	const button = document.createElement("button");
	button.innerText = text;
	button.classList.add(className);
	button.addEventListener("click", callback);
	return button;
}
