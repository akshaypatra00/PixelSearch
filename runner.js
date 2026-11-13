const app = require("./app")
const connectdb = require("./Model/connecter")

async function startServer() {
    try {
        await connectdb()

        app.listen(3000, () => {
            console.log("the port is running in 3000")
        })
    } catch (error) {
        console.error("Failed to connect to the database:", error.message)
        process.exit(1)
    }
}

startServer()