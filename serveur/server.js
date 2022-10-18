import { createServer, request } from "http";
import { readStream } from "./readStream.js";




let server = createServer(async (request, response) => {
	if (request.method == "OPTIONS") {
		response.writeHead(200, { "Access-Control-Allow-Origin": "*" });
		} else {
		response.writeHead(200, {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "text/html; charset=utf-8"
		});
	}
}
	);

let req = request({
	host: "localhost",
	port: 8500,
	path: "/foo.html",
	method: "POST",
	headers: { Accept: "text/html" }
},	async (response) => {
	console.log("Le serveur a répondu avec le code : ", response.statusCode);
	let body = await readStream(response);
	console.log("Le serveur a répondu avec le code : ", body);
		}
	);
req.write("Hello World!")
req.end();

server.listen(8500); // start !
console.log("Serveur lancé.");