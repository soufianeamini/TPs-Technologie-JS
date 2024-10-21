#set par(justify: true)
#set text(16pt)

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

#pagebreak()

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

	+ ExpressJS
	+ Middlewares
	+ Project Showcase
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

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. APIs.

ExpressJS allows us to create a simple webserver, add middlewares depending on our needs, as well as get and respond to requests to make a REST API.

= Middlewares

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

   - Execute any code.
   - Make changes to the request and the response objects.
   - End the request-response cycle.
   - Call the next middleware function in the stack.

In this TP, we're going to make a simple CRUD application that can add, retrieve, update and delete items.

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

