const api = "http://localhost:5000/"; // adresse l'api avec le port
export async function fetchData(body, method, route) {
    const response = await fetch(api + route, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": api,
        },
        body: body,
    });
    return response.json();
}
export async function fetchDataConnected(body, method, route) {
    return await fetch(api + route, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": api,
            Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
        body: body,
    });
}
export async function fetchDataGet(route) {
    const response = await fetch(api + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": " application/json",
            "Access-Control-Allow-Origin": api,
            Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
    });
    return response.json();
}
