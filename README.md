# probot-slack

An extension which connects [probot](https://github.com/probot/probot) to [Slack](https://api.slack.com/slack-apps)

* Connects to the the Slack [Real Time Messaging](https://api.slack.com/rtm) and [Web APIs](https://api.slack.com/web)
* Triggers probot events, like `on('slack.message')`
* Now you can use Slack to power your Probot

# Usage

All actions' contexts include `slack`, the
[RTMClient](https://slackapi.github.io/node-slack-sdk/reference/RTMClient),
and `slackWeb`, the
[WebAPIClient](https://slackapi.github.io/node-slack-sdk/reference/WebAPIClient).
[Read more about building bots using the Node Slack SDK](https://slackapi.github.io/node-slack-sdk/bots)

## Setup

You'll need a Slack App set up and conneted to your team to retrieve the Bot User OAuth Access Token, available in [your app's](https://api.slack.com/apps/) "OAuth & Permissions" section.

Start your own probot project with `SLACK_BOT_TOKEN` in your environment after
you've hooked Slack up to your bot:

```js
const Slack = require('probot-slack')

module.exports = (robot) => {
  Slack(robot)

  robot.on('slack.connect', ({ slack }) => {
    // slack.dataStore: <https://slackapi.github.io/node-slack-sdk/reference/SlackDataStore>
    const channel = slack.dataStore.getChannelByName('general')

    slack.message(':wave:', channel.id)
  })

  robot.on('slack.message', ({ payload, slack }) => {
    // if anyone says "hello robot" in a channel we're in,

    if (payload.message.text.match(/\Whello robot\W/)) {
      slack.message('Hello human!', message.channel)
    }
  })

  // For more information on building apps:
  // https://probot.github.io/docs/
}

```

[All events supported by the RTM client](https://api.slack.com/events)
are available.

# On its own

Out of the box, `probot-slack` connects to the Slack API but doesn't provide any additional functionality. It can be useful for testing your OAuth tokens, though:

Copy `.env.example` to `.env` and fill it out

```
source .env
# Run the bot with extra logging
SLACK_BOT_TOKEN="xoxb-123456789044-xxxxxxxxxxxxxxxxxxxxxxxx" LOG_LEVEL=trace npm start
```
e
See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this plugin.
