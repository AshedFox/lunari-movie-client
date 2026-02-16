'use server';

import { uploadImage } from './server';

export async function uploadImageAction(file: File) {
  return await uploadImage(file);
}
