const express = require('express')
const chamberRouter = require('./routes/chamber.routes')
const prisonerRouter = require('./routes/prisoner.routes')

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json())

app.use('/api', chamberRouter)
app.use('/api', prisonerRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


