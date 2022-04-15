const express = require('express')
const chalk = require('chalk')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.post('/addUser', async (req, res) => {
    console.log(req.body)
    const group = req.body.group
    const user = req.body.user
    let userId = user.includes('@s.whatsapp.net') ? user : user + '@s.whatsapp.net'
    let groupId = group.includes('@g.us') ? group : group + '@g.us'
    
    try{
        console.log(chalk.blue('Group: ') + chalk.green(group) + chalk.blue(' User: ') + chalk.green(user))
        await wa.groupParticipantsUpdate(groupId, [userId], 'add')
        res.status(200).json({
            user: userId,
            group: groupId,
            status: 'success'
        })
    } catch(error) {
        //console.log(error)
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