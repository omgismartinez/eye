import { NextResponse } from 'next/server'
import { HfInference } from '@huggingface/inference'

// Create a new Hugging Face Inference instance
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST (req: Request) {
  // Extract the `image` from the body of the request
  const data = await req.formData()
  const file = data.get('image') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Initialize a image-classification using the Hugging Face Inference SDK
  const response = await Hf.imageClassification({
    model: 'researchers/google-vbp2-dr400-valid',
    data: buffer
  })

  // Check for errors
  if (!response) {
    return NextResponse.json({ error: 'No response from Hugging Face' }, { status: 500 })
  }

  return NextResponse.json(response)
}
