# Take Back Ontario Nuxt

## Stack
* [Nuxt 3](https://nuxt.com/docs/getting-started/introduction)
* [Vue 3 with composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
* [Netfliy - including Cloud Functions](https://docs.netlify.com/cli/get-started/)
* [Neo4j Graph Database](https://neo4j.com/)
* [Optional GraphQL](https://graphql.org/)
* [Decap CMS for content management in git](https://decapcms.org/)
* [AWS Amplify for Cognito authentication](https://docs.amplify.aws/javascript/start)
## Setup

### General 

[Get the MDC - Markdown Components VScode extension](https://marketplace.visualstudio.com/items?itemName=Nuxt.mdc)

[Get the Nuxt Assistant Chrome extension](https://chromewebstore.google.com/detail/nuxt-assistant/nebkdnlhchcbbjpgfmhifafhfjipphgi)

[Get the Tailwind VScode extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Component library
[Material Tailwind](https://www.material-tailwind.com/)

Material Tailwind has some optional components, like tabs, and optional funcitonality, like Google's ripple effect, that require JS scripts. These scripts should be loaded in /plugins/client-only-script.js because otherwise Nuxt tries to render them as part of SSR, and you get hydration errors, amongst other things.

### Netlify
make sure you have netlify cli installed globally
```Bash
npm install netlify-cli -g
```
Use `netlify link` to be able to access environment variables. You need access to the netlify project in order to do so.

### Docker
- Ensure you have [Docker](https://docs.docker.com/engine/install/) setup and running. NOTE: I have temporarily removed docker requirement because I'm developing straight on the Neo4j server. Will add a neo4j docker back in soon. - MH

### Amplify

1. Install the [amplify cli](https://docs.amplify.aws/javascript/start/getting-started/installation/)

2. Install the [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

3. Login to the aws console

4. Navigate to the [Security credentials for your account](https://us-east-1.console.aws.amazon.com/iam/home#/security_credentials?section=IAM_credentials)

5. Create an access key
  - it should be `CLI` (you must also check off the `i understand the above....`)
  - give it a description
  - keep this access key secret page open, you will need the secrets in the next step
  
6. run `aws configure`
  - copy the access key and secret access key into the  aws configure inputs.

7. Pull your configuration `amplify pull`
8. Select the profile you just created (likely just `default`) 
9. Select the `dev` amplify environment

9. The next time you run `npm run dev` the app will be using the `dev` environment to do auth

## Development 

make sure you have `nvm` installed and run `nvm use` inside the root directory. Needs node 20.9.0.

Before starting the dev server you must spin up the development neo4j server using docker-compose. - NOTE: See above regarding Docker - MH. TL;DR, not required at the moment.
```bash
# Keep this running in another terminal
docker-compose up
```


Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

### New sign up flow development

If you would like to develop the new sign up flow please add `NEW_SIGN_UP="true"` to your `.env` file.
You will need to restart `npm run dev` if it is already running.

## Neo4j

Neo4j queries should be run in netlify functions to avoid exposing the credentials to the front end.
