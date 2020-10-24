let http = require('http')
let url = require('url')
let fs = require('fs')
let db = 'db.json'
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));


http.createServer(async (req, res) => {
     await sleep(3000)
     let {code, data} = handleRequest(req)
     
     res.writeHead(code, {"Content-Type": "application/json"})	
     res.write(data)
     res.end()
}).listen(3000)


function handleRequest(req) {
	
	//get post data
	let input = []
	req.on('data', chunk => input.push(chunk))
	req.on('end', () => {
		input = Buffer.concat(input).toString();
		if (input) console.log(JSON.parse(input));
		
	})

	//end

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


