const axios = require("axios")


async function Seachimage(query , page = 1) {
    const response = await axios.get("https://api.unsplash.com/search/photos",
        {
             params: {
                    query: query,
                    page: page,
                    per_page: 20
                },
               timeout: 10000,
               headers: {
                    Authorization: `Client-ID ${process.env.unsplash_access}`
                }
        }
    )

    return response.data
}


module.exports = Seachimage;