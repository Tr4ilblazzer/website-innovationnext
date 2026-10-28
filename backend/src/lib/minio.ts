import * as Minio from 'minio'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const minioClient: Minio.Client = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || '',
  port: Number(process.env.MINIO_PORT || 443),
  useSSL: process.env.MINIO_USESSL === 'true',
  accessKey: process.env.MINIO_ACCESSKEY || '',
  secretKey: process.env.MINIO_SECRETKEY || '',
  region: process.env.MINIO_REGION,
})

const BUCKET = process.env.MINIO_BUCKET_NAME || 'hrmsbackend'

export function buildCvKey(vacancyId: string, originalName: string): string {
  const safeName = path
    .parse(originalName)
    .name.replace(/[^a-zA-Z0-9]/g, '')
  return `cvs/${vacancyId}/${Date.now()}-${uuidv4()}-${safeName}${path.extname(originalName).toLowerCase()}`
}

export async function uploadCvBuffer(buffer: Buffer, cvKey: string, mimeType: string): Promise<string> {
  await minioClient.putObject(BUCKET, cvKey, buffer, -1, { contentType: mimeType })
  return cvKey
}

export function getCvPresignedUrl(cvKey: string, expirySeconds = 86400): Promise<string> {
  return minioClient.presignedGetObject(BUCKET, cvKey, expirySeconds)
}
