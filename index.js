require('dotenv').config()
require('./config/wpp')
const start = require('./src/wpp')
const getStatus = require('./src/status')
const {getMessageType, getText} = require('./src/messageVerify')
const chalk = require('chalk')
const {check} = require('./src/get')
const express = require('express')

const app = express()

//create a server

const init = async () => {
    const wa = await start()
    wa.ev.on('group-participants.update', async (update) => {
        try{
            let id = update.id
            let participants = update.participants
            let action = update.action
            console.log(chalk.blue('ID: ') + chalk.green(id) + chalk.blue(' Participants: ') + chalk.green(participants) + chalk.blue(' Action:') + chalk.green(action))
            if(action === 'add') {
                const chk = await check(participants[0])
                if(chk.exists) {
                    let text = `_The user ${chk.whatsappId} is on the Social Black List_

    _Description: ${chk.description}_`
                    try{
                        await wa.groupParticipantsUpdate(id, [participants[0]], 'remove')
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
    app.post('/addUser', async (req, res) => {
        try{
            const group = req.body.group
            const user = req.body.user
            const userId = user.includes('@s.whatsapp.net') ? user : user + '@s.whatsapp.net'
            const groupId = group.includes('@g.us') ? group : group + '@g.us'
            console.log(chalk.blue('Group: ') + chalk.green(group) + chalk.blue(' User: ') + chalk.green(user))
            await wa.groupParticipantsUpdate(groupId, [userId], 'add')
            res.status(200).json({
                user: userId,
                group: groupId,
                status: 'success'
            })
        } catch(error) {
            res.status(500).json({
                user: userId,
                group: groupId,
                status: 'error',
                error: error
            })
        }

        
    })
    app.listen(process.env.PORT, () => {
        console.log(chalk.green(`Server running on port ${process.env.PORT}`))
    })
    
}

init()