import { validateJwt } from '../validateJwt.js';
import { getNeo4jSession } from '../getNeo4jSession.js';

export const handler = async (event) => {
  let decodedJwt = null;

  // Validate and decode the JWT - pass function event.
  try {
    decodedJwt = await validateJwt(event);
    if (!decodedJwt || !decodedJwt.sub) {
      throw new Error('No user ID found in JWT');
    }
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized', error }),
    };
  }

  const cognitoId = decodedJwt.sub;

  // If neo4j connection fails, return a 500 internal server error.
  const session = await getNeo4jSession();
  if (!session) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to connect to Neo4j' }),
    };
  }

  try {
    console.log(`Fetching network data for ID: ${cognitoId}`);
    const result = await session.run(
      `
      MATCH (u:User {id: $cognitoId})
      OPTIONAL MATCH (u)-[:FRIENDS]-(f:User)
      OPTIONAL MATCH (u)-[:REFERS]->(r:User)
      OPTIONAL MATCH (r2:User)-[:REFERS]->(u)
      OPTIONAL MATCH (u)-[:REFERS*1..2]->(r3:User)
      OPTIONAL MATCH (u)-[:FRIENDS]-(f2:User)-[:FRIENDS]-(f3:User)
      RETURN DISTINCT u, f, r, r2, r3, f2, f3
      `,
      { cognitoId }
    );

    const nodes = new Map();
    const relationships = [];

    result.records.forEach(record => {
      const user = record.get('u').properties;
      nodes.set(user.id, { data: { id: user.id, ...user } });

      ['f', 'r', 'r2', 'r3', 'f2', 'f3'].forEach(key => {
        const node = record.get(key);
        if (node) {
          const nodeProps = node.properties;
          if (!nodes.has(nodeProps.id)) {
            nodes.set(nodeProps.id, { data: { id: nodeProps.id, ...nodeProps } });
          }
        }
      });

      const relationshipsToAdd = [
        { source: user.id, target: record.get('f')?.properties?.id, type: 'FRIENDS' },
        { source: user.id, target: record.get('r')?.properties?.id, type: 'REFERS' },
        { source: record.get('r2')?.properties?.id, target: user.id, type: 'REFERS' },
        { source: user.id, target: record.get('r3')?.properties?.id, type: 'REFERS' },
        { source: user.id, target: record.get('f2')?.properties?.id, type: 'FRIENDS' },
        { source: record.get('f2')?.properties?.id, target: record.get('f3')?.properties?.id, type: 'FRIENDS' },
      ];

      relationshipsToAdd.forEach(rel => {
        if (rel.source && rel.target && !relationships.some(existingRel =>
            existingRel.data.source === rel.source && existingRel.data.target === rel.target && existingRel.data.type === rel.type)) {
          relationships.push({ data: { source: rel.source, target: rel.target, type: rel.type } });
        }
      });
    });

    // Apply visibility rules
    const userFriends = new Set();
    result.records.forEach(record => {
      if (record.get('f')) {
        userFriends.add(record.get('f').properties.id);
      }
      if (record.get('f2')) {
        userFriends.add(record.get('f2').properties.id);
      }
      if (record.get('f3')) {
        userFriends.add(record.get('f3').properties.id);
      }
    });

    nodes.forEach((value, key) => {
      if (key !== cognitoId && !userFriends.has(key)) {
        value.data = { id: key };
      }
    });

    const response = {
      nodes: Array.from(nodes.values()),
      edges: relationships
    };

    console.log('Fetched network data from neo4j:', response);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Error fetching network data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    await session.close();
  }
};
