import modal from "./modal";
import button from "./button";
import fetchData from "../helpers/fetchData";

export default alert = (title, openButton, counterKey = "alertCounter") => {
	let count = getCount(counterKey);

	const alert = modal();
	alert.classList.add("alert");

	const alertContent = document.createElement("div");
	alertContent.classList.add("alert__content");
	alert.appendChild(alertContent);

	const tableWrapper = document.createElement("div");
	tableWrapper.classList.add("alert__table-wrapper");
	const table = document.createElement("table");
	table.classList.add("alert__table", "loading");
	tableWrapper.appendChild(table);

	const alertTitle = document.createElement("h2");
	alertTitle.innerText = title;
	alertTitle.classList.add("alert__title");

	const closeButton = button("", "alert__close-button", () => {
		alert.style.display = "none";
	});

	const alertText = document.createElement("p");
	alertText.classList.add("alert__text");
	const alertCounter = document.createElement("strong");
	alertCounter.classList.add("alert__text--semibold");
	alertCounter.innerText = `${count} ${count === 1 ? "time" : "times"}`;
	alertText.innerHTML = `You have clicked ${alertCounter.outerHTML} related button.`;

	const resetButton = button("Reset", "button", () => {
		localStorage[counterKey] = 0;
		resetButton.style.display = "none";
		alertCounter.innerText = "0 times";
		alertText.innerHTML = `You have clicked ${alertCounter.outerHTML} to related button.`;
	});
	resetButton.classList.add("button--reset");
	alertContent.append(
		alertTitle,
		closeButton,
		tableWrapper,
		alertText,
		resetButton
	);
	document.body.appendChild(alert);
	openButton.addEventListener("click", () => {
		alert.style.display = "grid";
		count++;
		localStorage[counterKey] = count;
		alertCounter.innerText = `${count} ${count === 1 ? "time" : "times"}`;
		alertText.innerHTML = `You have clicked ${alertCounter.outerHTML} to related button.`;
		if (count > 5) {
			resetButton.style.display = "block";
		}
		getUsers(table);
	});
	return alert;
};

async function getUsers(table) {
	const users = await fetchData("https://jsonplaceholder.typicode.com/users");
	if (users) {
		table.innerHTML =
			"<tr><th>Imię</th><th>E-mail</th><th>Adres</th><th>Telefon</th><th>Firma</th></tr>";
		users.forEach(({ name, address, email, company, phone }) => {
			const tr = document.createElement("tr");
			const tdName = document.createElement("td");
			tdName.innerText = name;
			const tdEmail = document.createElement("td");
			tdEmail.innerText = email;
			const tdAddress = document.createElement("td");
			tdAddress.innerText = `${address.city} ${address.street} ${address.suite}`;
			const tdPhone = document.createElement("td");
			tdPhone.innerText = phone;
			const tdCompany = document.createElement("td");
			tdCompany.innerText = company.name;
			tr.append(tdName, tdEmail, tdAddress, tdPhone, tdCompany);
			table.appendChild(tr);
		});
		table.classList.remove("loading");
	}
}

function getCount(counterKey) {
	let count = 0;
	if (localStorage[counterKey]) {
		count = parseInt(localStorage[counterKey]);
	}
	return count;
}
