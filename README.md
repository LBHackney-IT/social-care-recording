# Social care recording

Next-gen case recording for social care in Hackney.

## 🧱 How it's built

It's a Next.js app that depends heavily on the [social care case viewer API](https://github.com/LBHackney-IT/social-care-case-viewer-api).

It has its own PostgreSQL database and internal API to keep track of unfinished form submissions and version history.

It also makes use of:

- [Hackney Design System](https://github.com/LBHackney-IT/lbh-frontend) for styling the frontend
- [LBH-Google-auth](https://github.com/LBHackney-IT/LBH-Google-auth) for authenticating users with their Hackney Google accounts

## 💻 Getting started

### Prerequisites

You need node, npm and a local PostgreSQL database running.

You also need a [complete `.env` file](#-configuration).

### 1. Update your hosts file

In order for authentication cookie to work, you need to run the app on a domain ending in `hackney.gov.uk`.

[Update your hosts file](https://duckduckgo.com/?t=ffab&q=update+hosts+file&ia=web) with the line:

```
127.0.0.1    dev.hackney.gov.uk
```

On a Mac, the hosts file is at `/etc/hosts`.

### 2. Prepare the database

You can apply the schema to a fresh database, and add example data with:

```
npm run db:schema:load
npm run db:seed
```

### 3. Running it

```
npm install
npm run dev
```

The app should then be on [dev.hackney.gov.uk:3000](http://dev.hackney.gov.uk:3000).

You should be able to log in with a Google account ending in `hackney.gov.uk`.

## 🧪 Testing

You can run the Jest unit tests with `npm test`.

Cypress end-to-end tests can be run with `npm run cypress`, provided a local server is already running.

Check types with `npm run typecheck`.

## 🧬 Configuration

It needs a few configuration variables to work.

You can supply these with a `.env` file locally. Run `cp .env.sample .env` to make a fresh one.

## 🌍 Running it on the web

It's suitable for anywhere you'd deploy a Next.js app, including Heroku, Vercel, Netlify and AWS.

[More in the Next.js docs](https://nextjs.org/docs/deployment).

## 🙋‍♀️ User needs

- **As a social worker**, I need to record information about a person
- **As a social worker**, I need to see a summary of the person I'm recording information about
- **As a social worker**, I need to record information in an order that suits the material I have available
- **As a social worker**, I need to record information over multiple sessions without losing my work
- **As a social worker**, I need to submit information a manager to review
- **As a manager**, I need to iterate and update the forms and protocols we use to collect information

## 🛣 Roadmap

### Now

- ~restore a step's saved data from the database~ (DONE)
- submit a finished submission to the case viewer api
- write a script to convert a csv into form config
- add more flexible field types (date? repeater?)
- better error handling in the api (especially 404s)

### Next

- autosave when idle for more than 5 seconds
- prefills from person data
- write cypress tests
- 404 page (which users are sent to when looking for a step or submission that doesn't exist)
- if form has one step, skip the task list

### Later

- keep a proper version history for auditing
- replace "unfinished submissions" table with something more general-purpose
- integrate with contentful for form config
