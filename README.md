# Yu-Gi-Oh Card Search Bot

Yugioh Card Search is a Discord bot designed to search for Yu-Gi-Oh playing cards. It utilizes the [Yugioh Pro Deck API](https://ygoprodeck.com/api-guide/). If you like this bot, make sure to support them. It wouldn't be possible without their generous API. Utilizes the new discord slash command paradigm to prevent bot from being deprecated.

## Installation Instructions

In order to make use of the bot, be an admin of your discord server and go to [this link](https://discord.com/api/oauth2/authorize?client_id=1017531721585008652&permissions=18432&scope=bot%20applications.commands) to invite the bot. After giving it the necessary permissions, you should be able to use the slash commands as expected.

## Commands

#### /search card: [card name]

Searches for a given card by inputted name. Returns the first match as an embed.

**Known Bug:** If the card text is exact, but another card shares the name but appears sooner in alphabetical order, the first named card will appear. (i.e. Red-eyes B. Dragon will return Malific Red-eyes B. Dragon)

#### /list card: [card name]

Searches for all card titles matching the string provided. Returns a list of all found cards.

## Issue Tracking

Feel free to use [GitHub Issue Tracking](https://github.com/nternamehere/yugioh-card-search-bot/issues) to provide bug reports and feature requests.

## Pull Requests

Pull requests are welcome, and encouraged, for fixing things missed or adding features you may think are beneficial for everyone. It's enforced in the settings, but please squash your PR commits into a single commit to keep the git log clean.