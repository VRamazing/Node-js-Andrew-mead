const fs = require("fs");
fs.writeFileSync(
    'notes.txt',
    'hi node js'
)

fs.appendFileSync(
    'notes.txt',
    'lets go'
)

