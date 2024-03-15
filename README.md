# Take Back Ontario Nuxt

## Stack
* [Nuxt 3](https://nuxt.com/docs/getting-started/introduction)
* [Vue 3 with composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
* [Netfliy - including Cloud Functions](https://docs.netlify.com/cli/get-started/)
* [Neo4j Graph Database](https://neo4j.com/)
* [Optional GraphQL](https://graphql.org/)
* [Decap CMS for content management in git](https://decapcms.org/)
## Setup

make sure you have netlify cli installed globally
```Bash
npm install netlify-cli -g
```
[Get the MDC - Markdown Components VScode extension](https://marketplace.visualstudio.com/items?itemName=Nuxt.mdc)
[Get the Nuxt Assistant Chrome extension](https://chromewebstore.google.com/detail/nuxt-assistant/nebkdnlhchcbbjpgfmhifafhfjipphgi)
[Get the Tailwind VScode extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

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