const db = require('./db'); // your Neon connection setup

async function getUserById(googleid) {
    const result = await db.query('SELECT * FROM users WHERE googleid = $1', [googleid]);
    return result.rows[0]; // returns a single user object
}

async function createNewUser({ googleId, displayName, firstName, lastName, email }) {
    await db.query(
        'INSERT INTO users (googleid, displayname, firstname, lastname, email) VALUES ($1, $2, $3, $4, $5)',
        [googleId, displayName, firstName, lastName, email]
    );
}

module.exports = { getUserById, createNewUser };
