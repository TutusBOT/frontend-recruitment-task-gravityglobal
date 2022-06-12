/**
 * Creates a DOM element
 * @param {string} tag Element tag
 * @param {object} attrs Element attributes
 * @param {(string | HTMLElement)[]} children Element children or text content
 * @returns {HTMLElement} HTMLElement
 */

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
