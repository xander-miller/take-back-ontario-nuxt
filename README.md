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
make sure you have netlify cli installed globally
```Bash
npm install netlify-cli -g
```
[Get the MDC - Markdown Components VScode extension](https://marketplace.visualstudio.com/items?itemName=Nuxt.mdc)

[Get the Nuxt Assistant Chrome extension](https://chromewebstore.google.com/detail/nuxt-assistant/nebkdnlhchcbbjpgfmhifafhfjipphgi)

[Get the Tailwind VScode extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
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