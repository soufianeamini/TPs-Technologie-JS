import { file, serve } from "bun"
import fs from "fs"

serve({
  fetch(_req, _server) {
    const sfile = fs.statSync("report.pdf")
    return new Response(file("report.pdf"), {
      headers: {
        "Access-Control-Allow-Origin": "*",
				"last-modified": sfile.mtime.toString()
      },
    })
  },
})
