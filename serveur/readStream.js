export function readStream(stream, limit = Infinity) {
return new Promise((resolve, reject) => {
let data = [];
let length = 0;
stream.on("error", reject);
stream.on("data", (chunk) => {
data.push(chunk);
length += chunk.length;
if (data.length > limit) { reject(new Error("Too many data to process.")); }
});
stream.on("end", () => resolve([].concat(...data).toString()));
});
}