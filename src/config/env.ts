const APP_PREFIX = process.env.APP_PREFIX || 'how-admin'

const API_URL = process.env.API_URL || 'http://localhost:8000'
const IPFS_API_URL = process.env.IPFS_API_URL || 'https://ipfs.filebase.io/ipfs'

export const env = {
  APP_PREFIX,
  API_URL,
  IPFS_API_URL,
}
