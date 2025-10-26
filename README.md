# Warm Intro — Discord Bot

Warm Intro is a small Discord bot that helps **entrepreneurs easily connect** with other members of their community who share similar goals or skills.

## Features (MVP)

### 1. Quick Member Profile

When someone joins or types `/intro`, the bot asks:

> 👋 Hey! Could you tell me in one sentence:
>
> - What you do
> - What you're looking for (or offering)

It saves that info to a local JSON or SQLite database:

```json
{
  "username": "RickJojo",
  "bio": "Building a SaaS B2C app",
  "looking_for": "user onboarding feedback"
}
```

### 2. Smart Search

Members can search naturally with:

```
/find "SaaS"
```

The bot replies:

> 🔍 Found 2 members mentioning "SaaS":
> @Alice — “Working on a SaaS for freelancers”
> @Ben — “Looking to automate billing”

Then offers a button:

> Want me to introduce you to @Alice?

### 3. Warm Introduction

If accepted, the bot creates a private DM or temporary channel:

> 👋 Hey @RickJojo, meet @Alice — you both mentioned SaaS. Take it from here 😄

## Tech Stack

- TypeScript

- Discord.js v14

- Node.js
