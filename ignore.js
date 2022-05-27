const { Router } = require("express");
const { route } = require("express/lib/application");
const webHooks = require("node-webhooks");


router.post('/webhook/add', async (req, res, next) => {
    

});

router.put('/webhook/modify', async (req, res, next) => {
    const { intance_id, webhook_url } = req.body;

    //Modify URL in DB
});

router.get('webhook/list', async (req, res, next) => {
    const id = req.query.instance_id;

    //List all URLS in DB
});

router.delete('/webhook/delete', async (req, res, next) => {
    const { intance_id, webhook_url } = req.body;
    
    //Delete URL in DB
});

route.post('/scheduleMessage', async (req, res, next) => {
    const { instance_id, message, time } = req.body;

    //Schedule message
})

route.put('/scheduleMessage/edit', async (req, res, next) => {
    const { instance_id, message, time } = req.body;

    //Edit scheduled message
})

route.get('/scheduleMessage/list', async (req, res, next) => {
    const instance_id = req.query.instance_id;
    //list scheduled messages
})

route.get('/scheduleMessage/listAll', async (req, res, next) => {
    const instance_id = req.query.instance_id;
    //List all messages
})

route.delete('/scheduleMessage/delete', async (req, res, next) => {
    const { instance_id, messageid, time } = req.body;
    //Delete scheduled message
})