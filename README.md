# Take Back Ontario Nuxt

## Stack
* [Nuxt 3](https://nuxt.com/docs/getting-started/introduction)
* [Vue 3 with composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
* [Netfliy - including Cloud Functions](https://docs.netlify.com/cli/get-started/)
* [Neo4j Graph Database](https://neo4j.com/)
* [Optional GraphQL](https://graphql.org/)
* [Decap CMS for content management in git](https://decapcms.org/)
## Setup

### General 
make sure you have netlify cli installed globally
```Bash
npm install netlify-cli -g
```
[Get the MDC - Markdown Components VScode extension](https://marketplace.visualstudio.com/items?itemName=Nuxt.mdc)
[Get the Nuxt Assistant Chrome extension](https://chromewebstore.google.com/detail/nuxt-assistant/nebkdnlhchcbbjpgfmhifafhfjipphgi)
[Get the Tailwind VScode extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
### Amplify

1. Install the [amplify cli](https://docs.amplify.aws/javascript/start/getting-started/installation/)

2. Follow the [amplify setup instruction](https://docs.amplify.aws/javascript/build-a-backend/auth/set-up-auth/)
  * Use the following settings:
    * Pick the `Manual` config
    * Pick the `User Sign-Up, Sign-In, connected with AWS IAM controls`
    * Pick the default friendly name
    * Pick the default identity pool name
    * Pick `No` for unauthenticated logins
    * Pick `No` for 3rd party auth providers
    * Pick the default name for the user pool
    * Select `Email` for how you want users to sign in
    * Select `No` for adding user pool groups
    * Select `No` for adding an admin queries API
    * Select `OPTIONAL (Individual users can use MFA)` 
    * Select only `Time-Based One-Time Password (TOTP)` 
    * Select the default authentication message
    * Select `Enabled (Requires per-user email entry at registration)` for the email base user registration/forgot password
    * Select the default email verification subject
    * Select the default email verification message 
    * Select the default password policy
    * Select `Email`for the required sign up attributes
    * Select the default refresh token expiration
    * Select `N` for the user attributes this app can read and write
    * Don't select any extra capabilities
    * Select `No` to using an OAuth flow
    * Select `No` for lambda triggers in cognito

3. You can the run `amplify push`
4. The next time you run `npm run dev` you should be able to use your auth flow












## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```
How to call the neo4j db with graphql

```javascript
const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer } = require("apollo-server");

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const server = new ApolloServer({
    schema: neoSchema.schema,
    context: ({ req }) => ({ req }),
});

server.listen().then(({ url }) => {
    console.log(`GraphQL server ready at ${url}`);
});

```