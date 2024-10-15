const API_URL = process.env.API_URL || 'http://localhost:8000'
const IPFS_API_URL = process.env.IPFS_API_URL || 'https://ipfs.filebase.io/ipfs'

export const env = {
  API_URL,
  IPFS_API_URL,
}
