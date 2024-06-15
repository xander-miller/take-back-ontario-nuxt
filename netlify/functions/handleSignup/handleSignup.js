const neo4j = require('neo4j-driver');
require('dotenv').config();

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

exports.handler = async function (event, context) {
    const session = driver.session();

    try {
        const data = JSON.parse(event.body);

        const username = data.Username;
        const clientId = data.ClientId;
        const userAttributes = data.UserAttributes;

        const email = userAttributes.find(attr => attr.Name === 'email').Value;
        const referralCode = userAttributes.find(attr => attr.Name === 'custom:referral_code').Value;

        // Check if referral code exists
        const referralResult = await session.run(
            'MATCH (referrer:User) WHERE $referralCode IN referrer.referralCodes RETURN referrer',
            { referralCode }
        );

        if (referralResult.records.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Referral code not found' }),
            };
        }

        const referrer = referralResult.records[0].get('referrer');

        // Create new user and connect with referrer
        const createUserQuery = `
            MATCH (referrer:User) WHERE $referralCode IN referrer.referralCodes
            CREATE (newUser:User {
                name: $username,
                email: $email,
                id: $clientId,
                referralCodes: [],
                joined: datetime()
            })
            CREATE (referrer)-[:REFERS {referralCode: $referralCode, notes: '', dateOfReferral: datetime(), lastContact: datetime(), preferredContactMethod: ''}]->(newUser)
            CREATE (referrer)-[:FRIENDS {becameFriends: datetime()}]->(newUser)
            CREATE (newUser)-[:FRIENDS {becameFriends: datetime()}]->(referrer)
            RETURN newUser
        `;

        const createUserResult = await session.run(createUserQuery, {
            username,
            email,
            clientId,
            referralCode,
        });

        const newUser = createUserResult.records[0].get('newUser');

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'User created successfully',
                user: newUser.properties,
            }),
        };
    } catch (error) {
        console.error('Error creating user:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while creating the user' }),
        };
    } finally {
        await session.close();
    }
};
