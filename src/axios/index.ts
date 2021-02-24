import axios from "axios";

export default axios.create({
	baseURL: "https://currencyscoop.p.rapidapi.com",
	headers: {
		"x-rapidapi-key": "c61b77622bmshdf719b6777e0c82p1f8073jsn19db7fb2708f",
		"x-rapidapi-host": "currencyscoop.p.rapidapi.com",
	},
});
