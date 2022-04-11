async function post(userId, whatsappId, messageType, messageText, messageId, messageObject, messageMidia, onGroup, groupId, pushName, createdAt, updatedAt, description) {
    try {
        const api = process.env.API_URL
        const response = await axios.post(api, {
            userId: userId,
            whatsappId: whatsappId,
            messageType: messageType,
            messageText: messageText,
            messageId: messageId,
            messageObject: messageObject,
            messageMidia: messageMidia,
            onGroup: onGroup,
            groupId: groupId,
            pushName: pushName,
            createdAt: createdAt,
            updatedAt: updatedAt,
            description: description
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

