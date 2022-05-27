//Save cron schedule to database
const saveCronSchedule = (req, res) => {
    const { instance_id, message, time } = req.body;

    //Schedule message
    const cron = new CronJob(time, () => {
        //Send message
        sendMessage(instance_id, message);
    });
    cron.start();
    res.send({
        status: "success",
        message: "Message scheduled"
    });
}

//Create loop to init cron schedule
const initCronSchedule = (req, res) => {
    const { instance_id } = req.body;

    //Get all scheduled messages
    const cron = new CronJob('* * * * * *', () => {
        //Get all scheduled messages
        getScheduledMessages(instance_id);
    });
    cron.start();
    res.send({
        status: "success",
        message: "Cron scheduled"
    });
}

const getScheduledMessages = (instance_id) => {
    //Get all scheduled messages
    const cron = new CronJob('* * * * * *', () => {
        //Get all scheduled messages
        getScheduledMessages(instance_id);
    });
    cron.start();
}




















