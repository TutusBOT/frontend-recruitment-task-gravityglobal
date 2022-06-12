export default function createElement(tag, attrs = {}, children = []) {
	const el = document.createElement(tag);

	for (const [attr, value] of Object.entries(attrs)) {
		el.setAttribute(attr, value);
	}

	for (const child of children) {
		if (typeof child === "string") {
			el.textContent = child;
		} else el.appendChild(child);
	}

	return el;
}
