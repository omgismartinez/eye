'use server'

import { HfInference } from '@huggingface/inference'

export async function startClassificationAction (
  input: FormData
) {
  // Create a new Hugging Face Inference instance
  const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

  const file = input.get('file') as unknown as File

  if (!file) throw new Error('Image is required.')

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Initialize a image-classification using the Hugging Face Inference SDK
  const classification = await Hf.imageClassification({
    model: 'researchers/google-vbp2-dr400-cropped',
    data: buffer
  })

  // Check for errors
  if (!classification) {
    throw new Error('No classification from Hugging Face')
  }

  return classification
}
