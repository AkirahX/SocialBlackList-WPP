const getMessageType = (m) => {
    const msg = m.message
    const type = Object.keys(msg)[0]
    return type
}
const getText = (m) => {
    let type = getMessageType(m)
    if(type === 'senderKeyDistributionMessage') {
        type = 1
    }
    //let text = m.messages[0].message[type].caption || m.messages[0].message[type].conversation || m.messages[0].message[type].text 
    return text
}
module.exports = { getMessageType, getText }

