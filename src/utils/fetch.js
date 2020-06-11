const fetchAirtable = (method, table, request) => {
	return fetch("/.netlify/functions/airtable?table=" + table, {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(request),
	}).then((response) => response.json());
};

export default fetchAirtable;
