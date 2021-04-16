# Social care recording

Next-gen case recording for social care in Hackney.

## 🧱 How it's built

<img src="https://github.com/LBHackney-IT/social-care-recording/blob/main/public/blueprint.png?raw=true" width="450px" alt="" />

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

This tool takes the standard case recording workflow and makes it more flexible, to better fit the ways social workers actually operate:

- **As a social worker**, I need to record information about a person
- **As a social worker**, I need to see a summary of the person I'm recording information about
- **As a social worker**, I need to record information in an order that suits the material I have available
- **As a social worker**, I need to record information over multiple sessions without losing my work
- **As a social worker**, I need to submit information a manager to review
- **As a manager**, I need to iterate and update the forms and protocols we use to collect information

## 🛣 Roadmap

### Now

- **Autosave** when idle for more than 5 seconds
- **Prefill** from core person data
- **Submit** to the case viewer api
- Refactor APIs for better semantics
- Error handling (redirect to 404 properly)
- Protected routes (make sure everything checks for ression and redirect to /sign-in if not)
- Staging site
- Write a script to convert a CSV into form config
- Add more flexible field types (date? repeater?)

### Next

- Write cypress tests
- If form has one step, skip the task list

### Later

- Keep a proper version history for auditing
- Replace "unfinished submissions" table with something more general-purpose
- Integrate with Contentful for form config
- Group recording
- Handle file uploading
