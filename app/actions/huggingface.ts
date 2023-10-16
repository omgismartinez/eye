'use server'

import { type classificationSchema } from '@/lib/validations/diagnostic'
import {
  type Credentials,
  type ModelEntry,
  listModels
} from '@huggingface/hub'
import { HfInference } from '@huggingface/inference'
import { type z } from 'zod'

const credentials: Credentials = {
  accessToken: process.env.HUGGINGFACE_API_KEY as string
}

export async function startClassificationAction (
  input: z.infer<typeof classificationSchema>
) {
  // Create a new Hugging Face Inference instance
  const Hf = new HfInference(credentials.accessToken)

  const file = input.image.get('file') as unknown as File

  if (!file) throw new Error('Image is required.')

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Initialize a image-classification using the Hugging Face Inference SDK
  const classification = await Hf.imageClassification({
    model: input.model,
    data: buffer
  })

  // Check for errors
  if (!classification) {
    throw new Error('No classification from Hugging Face')
  }

  return classification
}

export async function getModelsAction () {
  const list: ModelEntry[] = []

  // List all the models owned by the researchers organization
  const models = listModels({
    search: { owner: 'researchers' },
    credentials
  })

  for await (const model of models) {
    list.push(model)
  }

  // Sort the models by the last updated
  list.sort((a, b) => {
    return (a.updatedAt < b.updatedAt ? 1 : -1)
  })

  return list
}
