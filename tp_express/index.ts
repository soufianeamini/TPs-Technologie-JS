import express from "express"
const app = express()
const port = 3001

type Item = {
  id: number
  name: string
}

let items: Item[] = []

app.use(express.json())

app.post("/", (req, res) => {
  console.log(req.body)
  items.push(req.body)
  res.send("Item has been created!")
})

app.get("/:id", (req, res) => {
  const id = +req.params.id
  const item = items.find((i) => i.id === id)

  if (item) {
    res.send(item)
  } else {
    res.send(`Item with id: ${id} not found.`)
  }
})

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

app.get("/", (req, res) => {
  res.send(items)
})

app.listen(port, () => {
  console.log(`Item storage app listening on port ${port}`)
})
