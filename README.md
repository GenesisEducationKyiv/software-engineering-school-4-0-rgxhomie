# Genesis Academy Case

Welcome to my case application! 
This project is built using the [Nest.js](https://nestjs.com/) framework for Genesis Academy SE School 4.0.
Technology stack used in this project are:
    - Node.js with Nest.js as a backend framework 
    - Typescript
    - PostgreSQL
    - Prisma ORM

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Features](#features)

## Installation

To get started with this project, just clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
```

## Configuration

In order to start the application please, navigate to ```docker-compose.yml``` and set the Postgres environment variables to your liking:

```bash
environment:
      POSTGRES_DB: database_name
      POSTGRES_USER: user_name
      POSTGRES_PASSWORD: password
```

Then, create a .env file according to giver example. Note that if you want emails to be sent when scheduled, you will also need to insert your SMTP server credentials in this file:

```bash
# Prisma
DATABASE_URL="postgresql://${user_name}:${password}@${host}:${port}/${database}?schema=public"

# Mailer
SMTP_HOST="some.smtp-service.com"
SMTP_PORT="587"
SMTP_USER="user"
SMTP_PASSWORD="password"
```

When this is done, run:

```bash
docker-compose up --build -d
```

and wait for the app to start. When started, it will be avaialbe on a default port 3000.

## Features

### 1. Get Current Rate

You can trigger the `/api/rate` endpoint to get the current rate. The rate is cached for 5 minutes to optimize performance and reduce unnecessary calls to the rate provider.

**Endpoint:**

GET /api/rate

### 2. Subscribe to Rate Updates

You can trigger the /api/subscribe endpoint to subscribe an email address to daily rate updates. Subscribers will receive an email every day with the latest rate information.

**Endpoint:**

POST /api/subscribe

#### Request body

```json
{
  "email": "user@example.com"
}
```

### 2. Daily Email Updates

A cron job runs every day to send emails to all subscribed users with the latest rate information. This ensures that subscribers are always informed about the current rate.


# Thank you for your attention!