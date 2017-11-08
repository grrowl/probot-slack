# probot-slack

An extension which connects [probot](https://github.com/probot/probot) to [Slack](https://api.slack.com/slack-apps)

* Connects to the the Slack [Real Time Messaging](https://api.slack.com/rtm) and [Web APIs](https://api.slack.com/web)
* Triggers probot events, like `on('slack.message')`
* Now you can use Slack to power your Probot

## Setup

You'll need a Slack App set up and conneted to your team to retrieve the Bot User OAuth Access Token, available in [your app's](https://api.slack.com/apps/) "OAuth & Permissions" section.

Copy `.env.example` to `.env` and fill it out.

```
# Run the bot
npm start
```

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this plugin.
