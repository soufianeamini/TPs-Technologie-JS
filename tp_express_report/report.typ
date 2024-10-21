#set par(justify: true)
#set text(16pt)

#place(
	top + center,
	float: true,
	text(1.4em, weight: "bold")[
		= ExpressJS Report
	]
)

#align(center, text(16pt)[
	#pad(top: 120pt, bottom: 60pt)[
		== Written by:
		- Soufiane Amini
	]
	#pad(y: 60pt)[
		== Under the supservision of:
		- Pr. Amal Ourdou
	]
])

#pagebreak()

#text(20pt)[
	#place(top + center, float: true)[== Summary]

	#place(center)[
		+ ExpressJS
		+ Middlewares
		+ Project Showcase
		+ Tests
	]
]

#pagebreak()

#align(center)[#text(20pt)[== ExpressJS]]

#figure(
	image("./Expressjs.png"),
	caption: [
	_ExpressJS_ logo
]
)

#set heading(numbering: "1")

= What is ExpressJS?

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications APIs.

ExpressJS allows us to create a simple webserver, add middlewares depending on our needs, as well as get and respond to requests to make a REST API.

= Middlewares

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

   - Execute any code.
   - Make changes to the request and the response objects.
   - End the request-response cycle.
   - Call the next middleware function in the stack.

Example 1: A json middleware that transforms the request body into a json object.
Example 2: A middleware that verifies that the request is made by an authorized person.

#pagebreak()

#set heading(numbering: "1.a")
= Project Showcase

== Directory Structure

```sh
.
├── dist
│   └── index.js
├── index.ts
├── package.json
├── package-lock.json
├── rest.http
└── tsconfig.json

2 directories, 6 files
```

The project contains a package.json file that contains the dependencies and dev dependencies, an index.ts file containing the server application, a tsconfig.json for setting options for the typescript compiler, a dist that contains the transpiled output of the typescript compiler, as well as a rest.http file for testing our server.

== Initializing a Node Project

To initialise a node project we run the command

```sh
npm init -y
```

Next, we set up the scripts to run the code in package.json. We use nodemon to automatically rerun the server whenever changes occur, to facilitate development:

```sh
npm run watch
```

== Install Express

Next, we install Express using the following command:
```sh
npm i express
```

We can also install types for express using the following command:

```sh
npm i --save-dev @types/express
```

== Set up Express

First we import express, and call the express function to create an express application.

#figure(caption: "Import express")[
```typescript
import express from "express"
const app = express()
const port = 3001
```
]

We will need to work with json in our requests, so we introduce a middleware that parses the body from the request and injects it into the `req.body` field.

#figure(caption: "Use express.json() middleware")[
```typescript
app.use(express.json())
```
]

Finally, we run the server by listening to the port we set earlier in the program:
#figure(caption: "Listening on port 3001")[
	```typescript
	app.listen(port, () => {
		console.log(`Item storage app listening on port ${port}`)
	})
	```
]

#pagebreak()

== Create POST endpoint
This will allows us to add an item to our items list.
#figure(caption: "Post Endpoint")[
```typescript
type Item = {
  id: number
  name: string
}

let items: Item[] = []

app.post("/", (req, res) => {
  console.log(req.body)
  items.push(req.body)
  res.send("Item has been created!")
})
```
]

== Create GET endpoint
This endpoint allows us to retrieve all items that are currently stored in the server.

#figure(caption: "Get Endpoint")[
	```typescript
	app.get("/", (req, res) => {
		res.send(items)
	})
	```
]

#pagebreak()

== Create GET endpoint by ID

This endpoint allows us to get a specific item by its id.

#figure(caption: "Get Endpoint by ID")[
	```typescript
	app.get("/:id", (req, res) => {
		const id = +req.params.id
		const item = items.find((i) => i.id === id)

		if (item) {
			res.send(item)
		} else {
			res.send(`Item with id: ${id} not found.`)
		}
	})
	```
]

== Create a PUT endpoint by ID

This endpoint allows us to update an item by its id.

#figure(caption: "Put Endpoint")[
	```typescript
	app.put("/:id", (req, res) => {
		const id = +req.params.id
		const item = items.find((i) => i.id === id)

		if (item) {
			item.name = req.body.name
			res.send("Item has been updated successfully!")
		} else {
			res.send(`Item with id: ${id} not found.`)
		}
	})

	```
]

#pagebreak()

== Create a DELETE endpoint

This endpoint allows us to delete an item by its id.
#figure(caption: "Delete Endpoint")[
	```typescript
	app.delete("/:id", (req,res) => {
		const id = +req.params.id
		const exists = items.some((i) => i.id === id)
		if (!exists) {
			res.send(`Item with id: ${id} does not exist.`)
		} else {
			items = items.filter(i => i.id !== id)
			res.send(`Item with id: ${id} has been deleted.`)
		}
	})
	```
]

#pagebreak()

== Testing Endpoints with a REST Client

In order to test our endpoints, we're going to use a REST Client similar to POSTMAN, using rest.nvim. In it, we can define a rest.http file that contains multiple different requests on different endpoints, that allows us to test our application.

#figure(caption: "Rest Client")[
	```http
	POST http://localhost:3001/
	Content-Type: application/json

	{
		"id": 1,
		"name": "Macbook"
	}

	###

	GET http://localhost:3001/

	###

	GET http://localhost:3001/1

	### 

	PUT http://localhost:3001/1
	Content-Type: application/json

	{
		"id": 1,
		"name": "Mactest"
	}

	### 

	DELETE http://localhost:3001/1
	```
]

#pagebreak()

== Test POST
#image("./../tp_express/2024-10-21-181942_hyprshot.png")

== Test GET
#image("./../tp_express/2024-10-21-182035_hyprshot.png")

#pagebreak()

== Test GET with ID
#image("./../tp_express/2024-10-21-182101_hyprshot.png")

== Test PUT
#image("./../tp_express/2024-10-21-182127_hyprshot.png")
#image("./../tp_express/2024-10-21-182149_hyprshot.png")

== Test DELETE

#image("./../tp_express/2024-10-21-182209_hyprshot.png")

