import fetchData from "../helpers/fetchData";

export default function create(
	popup,
	counter,
	openButton,
	closeButton,
	resetButton,
	counterKey = "popupCounter"
) {
	console.log(localStorage[counterKey]);
	let count = 0;
	if (localStorage.getItem(counterKey)) {
		count = parseInt(localStorage.getItem(counterKey));
	}
	openButton.addEventListener("click", async () => {
		popup.style.display = "grid";
		count++;
		localStorage.setItem(counterKey, count);
		counter.innerText = `${count} times`;
		if (count > 5) {
			resetButton.style.display = "block";
		}
		const users = await fetchData("https://jsonplaceholder.typicode.com/users");
		if (users) {
			const table = document.querySelector(".module__table");
			// const tableArray = users.map((user) => {
			// 	const { name, address, email, company, phone } = user;
			// 	table.innerHTML += `<tr><td>${name}</td><td>${email}</td><td>${address.city} ${address.street} ${address.suite}</td><td>${phone}</td><td>${company.name}</td></tr>`;
			// 	return [name, email, address, phone, company.name];
			// });
			// const usersTable = users.reduce((prev, curr) => {
			// 	const { name, address, email, company, phone } = curr;
			// 	return (
			// 		prev +
			// 		`<tr><td>${name}</td><td>${email}</td><td>${address.city} ${address.street} ${address.suite}</td><td>${phone}</td><td>${company.name}</td></tr>`
			// 	);
			// }, "<tr><th>Imię</th><th>E-mail</th><th>Adres</th><th>Telefon</th><th>Firma</th></tr>");
			table.innerHTML =
				"<tr><th>Imię</th><th>E-mail</th><th>Adres</th><th>Telefon</th><th>Firma</th></tr>";
			users.forEach(({ name, address, email, company, phone }) => {
				const tr = document.createElement("tr");
				const tdName = document.createElement("td");
				tdName.innerText = name;
				tr.appendChild(tdName);
				const tdEmail = document.createElement("td");
				tdEmail.innerText = email;
				tr.appendChild(tdEmail);
				const tdAddress = document.createElement("td");
				tdAddress.innerText = `${address.city} ${address.street} ${address.suite}`;
				tr.appendChild(tdAddress);
				const tdPhone = document.createElement("td");
				tdPhone.innerText = phone;
				tr.appendChild(tdPhone);
				const tdCompany = document.createElement("td");
				tdCompany.innerText = company.name;
				tr.appendChild(tdCompany);
				table.appendChild(tr);
			});
			table.classList.remove("loading");
		}
	});
	closeButton.addEventListener("click", (e) => {
		popup.style.display = "none";
	});
	resetButton.addEventListener("click", () => {
		count = 0;
		localStorage.setItem(counterKey, count);
		counter.innerText = `${count} times`;
		resetButton.style.display = "none";
	});
	document.addEventListener("click", (e) => {
		if (e.target === popup) {
			popup.style.display = "none";
		}
	});
}

// async function getData() {
// 	try {
// 		const req = fetch("https://jsonplaceholder.typicode.com/users");
// 		const res = await req;
// 		if (!res.ok) {
// 			return console.error("fail");
// 		}
// 		return res.json();
// 	} catch {
// 		return console.error("fail");
// 	}
// }
