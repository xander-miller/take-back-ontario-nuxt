import neo4j from 'neo4j-driver';

export const getNeo4jSession = async () => {
  try {
    const driver = neo4j.driver(
      process.env.NEO4J_URI,
      neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
    );
    return driver.session();
  } catch (e) {
    console.error('Error getting Neo4j session', e);
    return null;
  }
}
