const api = 'http://localhost:8080/'; // adresse l'api avec le port
export async function fetchData(body, method, route) {
  const response = await fetch(api + route, {
    method: method,
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: body
    });   
  return response.json();
}
export async function fetchDataConnected(body, method, route) {
  const response = await fetch(api + route, {
    method: method,
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('user')).token,
    },
    body: body
  });        
  return response.json();
}
export async function fetchDataGet(route){
  const response = await fetch(api + route, {
    method: 'GET',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
      'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('user')).token,
    }
  });;
return response.json();
}
