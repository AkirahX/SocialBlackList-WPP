//get api status
const axios = require('axios')
const getStatus = async () => {
    try {
        const api = process.env.API_URL
        const response = await axios.get(api);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

module.exports = getStatus