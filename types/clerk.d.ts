import { type userPrivateMetadataSchema } from '@/lib/validations/auth'
import { type z } from 'zod'

declare module '@clerk/types' {
  interface User {
    privateMetadata?: z.infer<typeof userPrivateMetadataSchema>
  }
}
