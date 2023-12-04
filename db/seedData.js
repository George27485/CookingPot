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

            CREATE TABLE ingredients (
                "ingredientId" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL
            );

            CREATE TABLE recipe_ingredients (
                "recipeId" INTEGER REFERENCES recipes("recipeId"),
                "ingredientId" INTEGER REFERENCES ingredients("ingredientId"),
                "quantity" VARCHAR(100),
                PRIMARY KEY ("recipeId", "ingredientId")
            );

            CREATE TABLE users (
                "userId" SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                is_admin BOOLEAN DEFAULT false NOT NULL
            );

            CREATE TABLE comments (
                "commentId" SERIAL PRIMARY KEY,
                text VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL,
                "userId" INTEGER REFERENCES users("userId"),
                "recipeId" INTEGER REFERENCES recipes("recipeId")
            );  
        `);
        console.log("Tables created successfully.");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

createTables();

