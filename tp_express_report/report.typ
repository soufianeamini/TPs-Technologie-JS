#set par(justify: true)
#set text(16pt)

= 3. Project Showcase

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

#set heading(numbering: "1.")

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

