const axios = require('axios');
const chalk = require('chalk')

async function check(whatsappId){
    try {
        const api = process.env.API_URL
        const response = await axios.get(api + '?whatsappId=' + whatsappId);
        //console.log(response.data);
        if(response.data.length > 0) {
            let res = {
                exists: true,
                userId: response.data[0].userId,
                whatsappId: response.data[0].whatsappId,
                messageType: response.data[0].messageType,
                messageText: response.data[0].messageText,
                messageId: response.data[0].messageId,
                messageObject: response.data[0].messageObject,
                messageMidia: response.data[0].messageMidia,
                onGroup: response.data[0].onGroup,
                groupId: response.data[0].groupId,
                pushName: response.data[0].pushNames,
                createdAt: response.data[0].createdAt,
                updatedAt: response.data[0].updatedAt,
                description: response.data[0].description
            }
            return res
        } else {
            let res = {
                exists: false
            }
            return res
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { check }