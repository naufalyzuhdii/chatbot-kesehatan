const express = require('express');
const { BotFrameworkAdapter, MemoryStorage, ConversationState } = require('botBuilder');
const fs = require('fs');

const app = express();

const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPasswod: process.env.MICROSOFT_APP_PASSWORD
});

const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);

const data = JSON.parse(fs.readFileSync('data.json', utf8));

app.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        const conversation = conversationState.get(context);
        if (context.activity.type === 'message') {
            const useMessage = context.activity.text.toLowerCase();

            let reply = data.responses[userMessage] || data.default_response;

            await context.sendActivity(reply);
        }
        await conversationState.saveChanges(context);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running in port ${port}');
})