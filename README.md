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

- ~~**Autosave** a valid form submission when the user is idle for more than 5 seconds~~ (DONE)
- ~~**Prefill** from core person data~~ (DONE)
- ~~Protected routes (make sure everything checks for session and redirect to /sign-in if not)~~ (DONE)
- ~~Error handling (redirect to 404 properly)~~ (DONE)
- ~~APIs should validate against the same schemas as the UI~~ (DONE)
- ~~Refactor APIs to be submission-centric~~ (DONE)
- ~~Improve autosave so it doesn't submit after initial form mount~~ (DONE)
- ~~Refactor forms to use formik status messages~~ (DONE)
- ~~Refactor APIs to use a common helper to handle 401s and 500s~~ (DONE)
- ~~ Add repeater field~~ (DONE)
- ~~Implement specific form for case notes~~ (DONE)
- ~~**Submit** to the case viewer api~~ (DONE)

1. Hitting the "continue" button on a step should return to the task list page if the form submitted successfully
2. Write a script to convert a CSV into form config
3. fix bug where changing a field type to checkbox/repeater from something else (and _maybe_ vice versa) _after_ a submission has been started caused the intitial values to become invalid (because it expects to be able to map over the values)
4. add autosave support to case notes
5. add tests for `GroupRecordingWidget`

### Next

- Write cypress tests
- Staging site
- Add date field type
- Make file upload field available in flexible schemas (add support in `generateFlexibleSchema` and figure out how to handle in autosave, etc)

### Later

- Keep a proper version history for auditing
- Replace "unfinished submissions" table with something more general-purpose
- Integrate with Contentful for form config
- Group recording
- Handle file uploading

### UR findings

- ~~"add a person" -> "link another person"~~ (DONE)
- prefill from previous versions of a form, rather than just core person data
- search by name or contact detail, not just id
- actions need to be fleshed out
- show allocated teams/workers in green person widget
- fix cross-browser display issue on grouped person widget
