require('dotenv').config()
require('./config/wpp')
require('./src/server')
const start = require('./src/wpp')
const getStatus = require('./src/status')
const {getMessageType, getText} = require('./src/messageVerify')
const chalk = require('chalk')
const {check} = require('./src/get')
const { jidDecode } = require('@adiwajshing/baileys')
const webHooks = require('node-webhooks')

const decodeId = (id) => {
    if(!id) return id
    if(/:\d+@/gi.test(id)) {
        let decode = jidDecode(id) || {}
        return decode.user && decode.server && decode.user + '@' + decode.server || id
    } else return id 
}


//create array of emojis erro and sucess
const registerHooks = () => {
    return new webHooks({
        db: {
            'callback_hook': ['https://eoe9g6kd2j9w7je.m.pipedream.net']
        }
    });
}

const init = async () => {
    global.wa = await start()
    wa.ev.on('group-participants.update', async (update) => {
        try{
            let id = update.id
            let participants = update.participants
            let action = update.action
            console.log(chalk.blue('ID: ') + chalk.green(id) + chalk.blue(' Participants: ') + chalk.green(participants) + chalk.blue(' Action:') + chalk.green(action))
            if(action === 'add') {
                if(participants[0].startsWith('92') || participants[0].startsWith('91') || participants[0].startsWith('93')){
                    await wa.groupParticipantsUpdate(id, [participants[0]], 'remove')
                    console.log(chalk.red('Removed: ') + chalk.green(participants))
                    //await wa.sendMessage(id, {text: `Sorry @${participants[0].split('@')[0]}, you are not allowed to join this group.`, mentions: [participants[0]]})
                    return
                }
                const chk = await check(participants[0])
                if(chk.exists) {
                    let text = `_The user ${chk.whatsappId} is on the Social Black List_

_Description: ${chk.description}_`
                    try{
                        await wa.groupParticipantsUpdate(id, [participants[0]], 'remove')
                        console.log(chalk.red('Removed: ') + chalk.green(participants[0]))
                    } catch(error) {
                        await wa.sendMessage(id, {text: '_It was not possible to remove the user because this instance must be the administrator of the group._'})
                        console.log(error)
                    }
                    await wa.sendMessage(id, {text: text})
                } else {
                    console.log(chalk.blue('User not on the Social Black List'))
                }
            }
        } catch (e) {
            console.log(e)
        }
        
    })
}

init()
