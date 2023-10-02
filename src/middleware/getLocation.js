const getLocation = async (ip) => {

    fetch('https://geolocation-db.com/json/')
        .then(response => response.json())
        .then(data => {
            return data = {
                ip: data.IPv4,
                country: data.country_name,
                lat: data.latitude,
                lon: data.longitude
            }
        })
        .catch(error => console.log(error))
}

export default getLocation;

// const url = 'https://ip-geo-location.p.rapidapi.com/ip/23.123.12.11?format=json';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '7cfb4f6d7aa5f82368bac52962ffe9dbac1612c6',
// 		'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
// 	}
// };

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }