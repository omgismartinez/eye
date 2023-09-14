import { type userPrivateMetadataSchema } from '@/lib/validations/auth'
import { type z } from 'zod'

declare global {
  interface UserPrivateMetadata extends z.infer<typeof userPrivateMetadataSchema> {}
}
