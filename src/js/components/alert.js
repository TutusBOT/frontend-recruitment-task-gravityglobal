import modal from "./Modal";
import fetchData from "../helpers/fetchData";
import createElement from "../helpers/createElement.js";

/**
 * Creates and appends alert element with counter and table including users data
 * @param {string} title alert title
 * @param {HTMLElement} openButton button that should open this alert
 * @param {string} counterKey localstorage keyname for storing count value
 * @returns {HTMLElement} alert element
 */

export default function renderAlert(
	title,
	openButton,
	counterKey = "alertCounter"
) {
	let count = getCount(counterKey);

	const table = createElement("table", { class: "alert__table loading" });
	const tableWrapper = createElement("div", { class: "alert__table-wrapper" }, [
		table,
	]);

	const alertTitle = createElement(
		"h2",
		{ class: "alert__title", id: "alert-title" },
		[title]
	);

	const closeButton = createElement("button", { class: "alert__close-button" });
	closeButton.addEventListener("click", () => {
		Alert.style.display = "none";
		openButton.focus();
	});
	const alertCounter = createElement(
		"strong",
		{ class: "alert__text--semibold" },
		[`${count} ${count === 1 ? "time" : "times"}`]
	);
	const alertText = createElement("p", { class: "alert__text" }, [
		"You have clicked",
		alertCounter,
		"related button.",
	]);

	const resetButton = createElement(
		"button",
		{ class: "button button--reset" },
		["Reset"]
	);
	resetButton.addEventListener("click", () => {
		localStorage.setItem(counterKey, "0");
		count = 0;
		resetButton.style.display = "none";
		alertCounter.textContent = "0 times";
		alertText.innerHTML = "";
		alertText.append("You have clicked ", alertCounter, " to related button.");
	});
	const alertContent = createElement("div", { class: "alert__content" }, [
		alertTitle,
		closeButton,
		tableWrapper,
		alertText,
		resetButton,
	]);
	const Alert = modal(
		openButton,
		{ "aria-labelledby": "alert-title" },
		alertContent
	);
	Alert.classList.add("alert");
	document.body.appendChild(Alert);
	openButton.addEventListener("click", () => {
		Alert.style.display = "grid";
		closeButton.focus();
		count++;
		localStorage.setItem(counterKey, count);
		alertCounter.textContent = `${count} ${count === 1 ? "time" : "times"}`;
		alertText.innerHTML = `You have clicked ${alertCounter.outerHTML} to related button.`;
		if (count > 5) {
			resetButton.style.display = "block";
		}
		getUsers(table);
	});
	return Alert;
}

async function getUsers(table) {
	const users = await fetchData("https://jsonplaceholder.typicode.com/users");
	if (users) {
		table.innerHTML = "";
		const thead = createElement("thead", {}, [
			createElement(
				"tr",
				{},
				["Imię", "E-mail", "Adres", "Telefon", "Firma"].map((el) =>
					createElement(el)
				)
			),
		]);
		const tbody = createElement(
			"tbody",
			{},
			users.map(
				({ name, address: { city, street, suite }, email, company, phone }) =>
					createElement("tr", {}, [
						createElement("td", {}, [name]),
						createElement("td", {}, [email]),
						createElement("td", {}, [`${city} ${street} ${suite}`]),
						createElement("td", {}, [phone]),
						createElement("td", {}, [company.name]),
					])
			)
		);
		table.append(thead, tbody);
		table.classList.remove("loading");
	}
}

function getCount(counterKey) {
	if (localStorage.getItem(counterKey)) {
		return parseInt(localStorage.getItem(counterKey));
	}
	return 0;
}
