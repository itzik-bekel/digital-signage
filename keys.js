const boxen = require('boxen')
const dotenv = process.env.ENVIRON !== 'HEROKU' ? require('dotenv').config() : { parsed: {} }

if (dotenv.error) {
  console.error(
    `Welcome to digital-signage!\n
You have not configured your installation yet, please run the setup utility by executing:\n` +
      boxen('$   npm run setup', { padding: 1, margin: 1, borderStyle: 'double' })
  )
  process.exit()
}

const PORT = process.env.PORT || dotenv.parsed.PORT || 3001
const ENVIRON = process.env.ENVIRON || dotenv.parsed.ENVIRON || 'DEV'
const MONGODB_URI =
  process.env.MONGODB_URI || dotenv.parsed.MONGODB_URI || 'mongodb://localhost/display'
const SESSION_SECRET = process.env.SESSION_SECRET || dotenv.parsed.SESSION_SECRET
const HOST_URL = process.env.SERVER_HOST || dotenv.parsed.SERVER_HOST || 'http://localhost:3000/'

// Azure Storage configuration
const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME || dotenv.parsed.AZURE_STORAGE_ACCOUNT_NAME
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME || dotenv.parsed.AZURE_STORAGE_CONTAINER_NAME
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || dotenv.parsed.AZURE_STORAGE_CONNECTION_STRING

module.exports = {
  ENVIRON,
  PORT,
  MONGODB_URI,
  SESSION_SECRET,
  HOST_URL,
  AZURE_STORAGE_ACCOUNT_NAME,
  AZURE_STORAGE_CONTAINER_NAME,
  AZURE_STORAGE_CONNECTION_STRING
}
