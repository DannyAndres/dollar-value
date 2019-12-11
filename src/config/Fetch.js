const debug = true;

export default async (call,body) => {
  const API_KEY = '9c84db4d447c80c74961a72245371245cb7ac15f'
  const BASE_URL = 'http://api.sbif.cl/api-sbifv3/recursos_api/'+call+'?apikey='+API_KEY+'&formato=json&callback=despliegue'
  const response = await fetch(BASE_URL, {
    method: body ? 'POST' : 'GET',
    headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
    body: JSON.stringify(body)
  }).then((response) => {
    return response.json();
  }).catch((error) => {
    if(debug) {
      throw error.message
    }
    return [];
  });
  return response
}