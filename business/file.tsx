import { Buffer } from 'buffer'
import base85 from '@alttiri/base85'
import { md5, sha256, sha3 } from 'hash-wasm'

import { c } from '@/util/ClientHost'

// Enable global Buffer polyfill:
if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer
}

export interface RegisterFileT {
  name: string
  file: File
  type: string
  autoSign: boolean
  publicSign: boolean
}

export interface FileDataT {
  referenceId: string
  transactionId: string
}

export interface FileRegistrationResponseT {
  success: boolean
  fileData?: FileDataT
  message: string
}

export async function registerFile(
  rf: RegisterFileT
): Promise<FileRegistrationResponseT> {
  let a = { success: false } as FileRegistrationResponseT

  const submissionResponse = await c({
    path: '/ledger-management/api/user/file',
    method: 'POST',
    body: {
      name: rf.name,
      // TODO: Evaluate when maintain data in text/plain format
      data: await convertFileToAscii85(rf.file),
      format: 'ascii85',
      mime_type: rf.type,
      public: rf.publicSign,
      md5: await fileMD5Sum(rf.file),
      sha2_256: await fileSHA2Sum256(rf.file),
      sha3_256: await fileSHA3Sum256(rf.file),
    },
  })

  // TODO: Continue implementation after proper user management routines are
  // Implemented, so the user can sign its file.
  console.log('Document registration response: ', submissionResponse)

  return a
}

function loadFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // When the file loads, get the binary data
    reader.onload = function (event) {
      const arrayBuffer = event.target?.result as ArrayBuffer
      // TODO: What happens when result is null or undefined? It needs to be evaluated.
      resolve(arrayBuffer)
    }

    reader.onerror = function (error) {
      reject(error)
    }

    // Read the file object as a raw binary buffer
    reader.readAsArrayBuffer(file)
  })
}

async function convertFileToAscii85(file: File): Promise<string> {
  try {
    const arrayBuffer = await loadFile(file)
    let uint8Array = new Uint8Array(arrayBuffer)
    const encodedData = base85.encode(Buffer.from(uint8Array), 'ascii85')
    const decodedAscii85 = base85.decode(encodedData, 'ascii85')
    // Remove unnecessary wrappers ('<~', '~>') and return
    return encodedData.replace(/^<~/, '').replace(/~>$/, '')
  } catch {
    return ''
  }
}

async function fileMD5Sum(file: File): Promise<string> {
  try {
    const arrayBuffer = await loadFile(file)
    const uint8Array = new Uint8Array(arrayBuffer)
    return await md5(uint8Array)
  } catch {
    return ''
  }
}

async function fileSHA2Sum256(file: File): Promise<string> {
  try {
    const arrayBuffer = await loadFile(file)
    const uint8Array = new Uint8Array(arrayBuffer)
    return await sha256(uint8Array)
  } catch {
    return ''
  }
}

async function fileSHA3Sum256(file: File): Promise<string> {
  try {
    const arrayBuffer = await loadFile(file)
    const uint8Array = new Uint8Array(arrayBuffer)
    return await sha3(uint8Array, 256)
  } catch {
    return ''
  }
}

/**
 * Maps common file extensions to their standard web MIME types.
 * @param {string} filenameOrExtension - The full filename or extension (e.g., 'document.docx' or '.docx').
 * @returns {string} The corresponding MIME type, or 'application/octet-stream' as a fallback.
 */
export function getMimeType(filenameOrExtension: string): string {
  // Extract extension, remove leading dot, and convert to lowercase
  let extension = filenameOrExtension.split('.').pop()

  if (extension) {
    extension = extension.trim().toLowerCase()
  } else {
    extension = ''
  }

  const mimeMap: Record<string, string> = {
    // Core Documents
    html: 'text/html',
    htm: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    mjs: 'text/javascript',
    json: 'application/json',
    webmanifest: 'application/manifest+json',
    xhtml: 'application/xhtml+xml',
    xml: 'application/xml',

    // Images
    apng: 'image/apng',
    avif: 'image/avif',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    ico: 'image/x-icon',

    // Audio & Video
    mp4: 'video/mp4',
    webm: 'video/webm', // Handles both audio/video contexts via standard fallback
    ogv: 'video/ogg',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    oga: 'audio/ogg',
    aac: 'audio/aac',

    // Fonts
    woff: 'font/woff',
    woff2: 'font/woff2',
    ttf: 'font/ttf',
    otf: 'font/otf',

    // Office Documents
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    rtf: 'application/rtf',

    // OpenDocument
    odt: 'application/vnd.oasis.opendocument.text',
    ods: 'application/vnd.oasis.opendocument.spreadsheet',
    odp: 'application/vnd.oasis.opendocument.presentation',
    odg: 'application/vnd.oasis.opendocument.graphics',

    // E-Books
    epub: 'application/epub+zip',
    mobi: 'application/x-mobipocket-ebook',
    azw3: 'application/vnd.amazon.mobi8-ebook',
    cbz: 'application/x-cbz',

    // Structured Data
    csv: 'text/csv',
    ics: 'text/calendar',
    yaml: 'application/yaml',
    yml: 'application/yaml',
    jsonld: 'application/ld+json',

    // Source Code
    txt: 'text/plain',
    md: 'text/markdown',
    sh: 'application/x-sh',
    php: 'application/php',

    // Archives
    zip: 'application/zip',
    '7z': 'application/x-7z-compressed',
    tar: 'application/x-tar',
    rar: 'application/vnd.rar',
  }

  // Return mapped type or binary fallback stream if unrecognized
  return mimeMap[extension] || 'application/octet-stream'
}

// Example Usage:
// console.log(getMimeType('report.docx')); -> 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
// console.log(getMimeType('.png'));        -> 'image/png'
// console.log(getMimeType('unknown.xyz'));  -> 'application/octet-stream'
