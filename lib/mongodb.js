const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'ALIVE_IMG', value: 'https://ibb.co/wTdKn4J' },
    { key: 'ALIVE_MSG', value: '🌟 Hello! Im alive and buzzing! 🐝\n\nThis bot is exclusively built for the *HoneyPani* group. Group is led by 👑 *Noah Fernando*, and this bot is proudly maintained by 🤖 *KSasmitha*.\n\nAll systems are running smoothly. Lets keep the hive active and positive! 🍯💛' },
    { key: 'PREFIX', value: '!' },
];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
