import { c } from '@/util/ClientHost'

export interface RegisterFileT {
  name: string
  file: File
  autoSign: boolean
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

  return a
}
