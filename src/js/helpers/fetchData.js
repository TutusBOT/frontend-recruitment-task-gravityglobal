export default async function fetchData(endpoint) {
	try {
		const response = await fetch(endpoint);
		if (!response.ok) throw new Error(response.statusText);
		return await response.json();
	} catch (err) {
		throw new Error(err);
	}
}
