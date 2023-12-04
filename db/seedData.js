const client = require("./index");

async function createTables() {
    try {
        await client.query(`
            CREATE TABLE recipes (
                "recipeId" SERIAL PRIMARY KEY,
                "title" VARCHAR(255) NOT NULL,
                "publishDate" TEXT,
                "category" TEXT,
                "dishImg" TEXT
            );
            CREATE TABLE users(
                "userId" SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                is_admin BOOLEAN DEFAULT false NOT NULL
            );


            CREATE TABLE comments(
                "commentId" SERIAL PRIMARY KEY,
                text VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL,
                "userId" INTEGER REFERENCES users("userId"),
                "recipeId" INTEGER REFERENCES recipes ("recipeId")
            );  

        `);
        console.log("Table 'recipes' created successfully.");
    } catch (error) {
        console.error("Error creating table:", error);
    }
}

createTables();  
