const { BlobServiceClient } = require('@azure/storage-blob');
const { DefaultAzureCredential } = require('@azure/identity');
const Keys = require('../keys');

class BlobStorageService {
  constructor() {
    this.containerName = Keys.AZURE_STORAGE_CONTAINER_NAME || 'slideshows';
    this.accountName = Keys.AZURE_STORAGE_ACCOUNT_NAME;
    this.blobServiceClient = null;
    this.containerClient = null;
  }

  async initialize() {
    try {
      if (Keys.ENVIRON === 'PROD') {
        // Use Managed Identity in production (Azure Web App)
        const credential = new DefaultAzureCredential();
        const blobUrl = `https://${this.accountName}.blob.core.windows.net`;
        this.blobServiceClient = new BlobServiceClient(blobUrl, credential);
      } else {
        // Use connection string in development
        const connectionString = Keys.AZURE_STORAGE_CONNECTION_STRING;
        if (!connectionString) {
          throw new Error('Azure Storage connection string is required for local development');
        }
        this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      }

      // Get or create container
      this.containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      await this.containerClient.createIfNotExists({
        access: 'blob' // Allow public access to blobs
      });
    } catch (error) {
      console.error('Failed to initialize Azure Blob Storage:', error);
      throw error;
    }
  }

  async uploadFile(file, options = {}) {
    if (!this.containerClient) {
      await this.initialize();
    }

    const blobName = `${Date.now()}-${file.originalname}`;
    const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype
        },
        ...options
      });

      return {
        url: blockBlobClient.url,
        name: blobName
      };
    } catch (error) {
      console.error('Failed to upload file to Azure Blob Storage:', error);
      throw error;
    }
  }

  async deleteFile(blobName) {
    if (!this.containerClient) {
      await this.initialize();
    }

    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.delete();
    } catch (error) {
      console.error('Failed to delete file from Azure Blob Storage:', error);
      throw error;
    }
  }

  async generateSasUrl(blobName, expiresIn = 3600) {
    if (!this.containerClient) {
      await this.initialize();
    }

    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      
      // For production, we don't need SAS as blobs are public
      if (Keys.ENVIRON === 'PROD') {
        return blockBlobClient.url;
      }

      // Generate SAS for development environment
      const sasToken = await blockBlobClient.generateSasToken({
        permissions: 'r',
        expiresOn: new Date(new Date().valueOf() + expiresIn * 1000)
      });

      return `${blockBlobClient.url}?${sasToken}`;
    } catch (error) {
      console.error('Failed to generate SAS URL:', error);
      throw error;
    }
  }
}

// Export singleton instance
module.exports = new BlobStorageService();
