const {default: makeWASocket, delay, DisconnectReason, fetchLatestBaileysVersion, makeInMemoryStore, useSingleFileAuthState} = require('@adiwajshing/baileys')
const P = require('pino')

const store = makeInMemoryStore({ logger: P().child({ level: 'debug', stream: 'store' }) })

store.readFromFile('./store.json')

setInterval(() => {
    store.writeToFile('./store.json')
}, 10000)

const {state, saveState} = useSingleFileAuthState('./auth.json')

const start = async () => {
	try{
		const {version, isLasted} = await fetchLatestBaileysVersion()

		const wa = makeWASocket({
			version,
			logger: P({ level: 'silent' }),
			printQRInTerminal: true,
			auth: state,
		})
		store.bind(wa.ev)
		//wa.ev.on('chats.set', item => console.log(`recv ${item.chats.length} chats (is latest: ${item.isLatest})`))
		//wa.ev.on('messages.set', item => console.log(`recv ${item.messages.length} messages (is latest: ${item.isLatest})`))
		//wa.ev.on('contacts.set', item => console.log(`recv ${item.contacts.length} contacts`))
		//wa.ev.on('messages.upsert', async m => {})
		//wa.ev.on('messages.update', m => console.log(m))
		//wa.ev.on('message-receipt.update', m => console.log(m))
		//wa.ev.on('presence.update', m => console.log(m))
		//wa.ev.on('chats.update', m => console.log(m))
		//wa.ev.on('contacts.upsert', m => console.log(m))

		wa.ev.on('connection.update', (update) => {
			const { connection, lastDisconnect } = update
			if(connection === 'close') {
				// reconnect if not logged out
				if((lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut) {
					start()
				} else {
					console.log('Connection closed. You are logged out.')
				}
			}

			console.log('connection update', update)
		})
		// listen for when the auth credentials is updated
		wa.ev.on('creds.update', saveState)
		return wa
	} catch (e){
		console.log(e)
	}
}

module.exports = start





