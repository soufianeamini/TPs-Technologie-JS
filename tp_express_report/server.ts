import { file, serve } from "bun"
import fs from "fs"

serve({
  fetch(req, _server) {
    if (req.url == "http://localhost:3000/report") {
      console.log("serving file")
      return new Response(file("./hot-reload.html"))
    }
    const sfile = fs.statSync("report.pdf")
    return new Response(file("report.pdf"), {
      headers: {
        "last-modified": sfile.mtime.toString(),
      },
    })
  },
})
