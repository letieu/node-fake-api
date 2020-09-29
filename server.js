let http = require('http')
let url = require('url')
let fs = require('fs')
let db = 'db.json'


http.createServer((req, res) => {
     
     let {code, data} = handleRequest(req)
     
     res.writeHead(code, {"Content-Type": "application/json"})	
     res.write(data)
     res.end()
}).listen(3000)



function handleRequest(req) {
	let query = url.parse(req.url, true)


	data = getData(query, req.method)
	data = JSON.stringify(data)

	return {
		code: 200,
		data: data
	}

}


function getData(query, method) {
	console.log(method)
	let raw = fs.readFileSync(db)
	let routes = JSON.parse(raw)
	let path = query.pathname
        console.log('________________________________________________')	
	if (! (path in routes[method])) {
		console.log(method,' -- ',path, ' --> ', 'fail')
		return "not found"
	}
	else console.log(method,' -- ',path,' ? ',query.search, ' --> ', 'ok')
	return routes[method][path]
}


