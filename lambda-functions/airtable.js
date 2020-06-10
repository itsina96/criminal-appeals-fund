const Airtable = require("airtable");

// Airtable.configure({
// 	endpointUrl: "https://api.airtable.com",
// 	apiKey: process.env.AIRTABLE_KEY,
// });
exports.handler = async (request, context) => {
	const { AIRTABLE_KEY } = process.env;
	const table = request.queryStringParameters.table; //e.g. "Applications%20for%20funding"
	const requestBody = JSON.parse(request.body); // what we sent from front end
	const base = new Airtable({
		apiKey: AIRTABLE_KEY, // secret on Netlify
	}).base("app7xH8ItDsTvcPhg"); // database

	let data = [];
	await base(table)
		.create(requestBody)
		.then((records) => {
			records.forEach((record) => data.push(record.fields)); // could be multiple records e.g. live applications
		})
		.catch(console.error);

	return {
		statusCode: 201, // conditional
		body: JSON.stringify({
			message:
				"The response data has been successfully added to " + table + " table.",
			response: data, // needs to be modified before sending
		}),
	};
};