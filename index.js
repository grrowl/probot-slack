const RtmClient = require('@slack/client').RtmClient
const WebClient = require('@slack/client').WebClient
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS
const RTM_EVENTS = require('@slack/client').RTM_EVENTS

const BOT_TOKEN = process.env.SLACK_BOT_TOKEN || ''

module.exports = (robot) => {
  if (!BOT_TOKEN) {
    robot.log.error('SLACK_BOT_TOKEN missing, skipping Slack integration')
    return
  }

  robot.log.trace('Slack connecting...')

  // game start!
  const SlackAPI = new RtmClient(BOT_TOKEN)
  const SlackWebAPI = new WebClient(BOT_TOKEN)

  // The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
  SlackAPI.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    robot.log.trace('Slack successfully authenticated')
    // SlackAPI.dataStore is now available
  })

  // you need to wait for the client to fully connect before you can send messages
  SlackAPI.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
    robot.log.info('Slack connected')
  })

  // events
  SlackAPI.on(RTM_EVENTS.MESSAGE, (message) => {
    const event = {
      event: 'slack',
      payload: {
        action: 'message',
        message,
        sender: SlackAPI.dataStore.getUserById(message.user),
        slack: SlackAPI,
        slackWeb: SlackWebAPI,
      }
    }

    robot.receive(event)
  })

  // now connect
  SlackAPI.connect('https://slack.com/api/rtm.connect');
};
