'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useTheme } from 'next-themes'
import { type User } from '@clerk/nextjs/dist/types/server'
import { toast } from 'sonner'

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Por favor seleccione un tema.'
  })
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export function AppearanceForm ({ user }: { user: User | null }) {
  const { setTheme, resolvedTheme } = useTheme()
  const userTheme = user?.privateMetadata.theme

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: async () => {
      setTheme(userTheme ?? resolvedTheme as string)
      return {
        theme: userTheme ?? resolvedTheme as AppearanceFormValues['theme']
      }
    }
  })

  async function onSubmit (data: AppearanceFormValues, user: User | null) {
    const res = async () => {
      const res = await fetch('/api/user/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: data.theme, userId: user?.id })
      })

      if (res.ok) setTheme(data.theme)

      return res
    }

    toast.promise(res, {
      loading: 'Guardando...',
      success: '¡Tema guardado!',
      error: '¡Algo salió mal!'
    })
  }

  return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(async (data) => await onSubmit(data, user))} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='theme'
                    render={({ field }) => (
                        <FormItem className='space-y-1'>
                            <FormLabel>Tema</FormLabel>
                            <FormDescription>
                                Seleccione el tema para el panel de control.
                            </FormDescription>
                            <FormMessage />
                            <RadioGroup
                                onValueChange={(value: AppearanceFormValues['theme']) => field.onChange(value)}
                                defaultValue={field.value}
                                value={field.value}
                                className='grid max-w-md grid-cols-2 gap-8 pt-2'
                            >
                                <FormItem>
                                    <FormLabel className='
                                            [&:has([data-state=checked])>div]:border-_main
                                            dark:[&:has([data-state=checked])>div]:border-_white
                                            dark:[&:has([data-state=unchecked])>div]:border-_dark-gray
                                        '
                                    >
                                        <FormControl>
                                            <RadioGroupItem value='light' className='sr-only' />
                                        </FormControl>
                                        <div className='items-center rounded-md border-2 border-_gray-border p-1 hover:bg-_gray-select/40 dark:hover:bg-white/10 group'>
                                            <div className='space-y-2 rounded-sm bg-_gray-select p-2'>
                                                <div className='space-y-2 rounded-md bg-white p-2 shadow-sm group-hover:animate-pulse'>
                                                    <div className='h-2 w-[80px] rounded-lg bg-_gray-808080/40' />
                                                    <div className='h-2 w-[100px] rounded-lg bg-_gray-808080/40' />
                                                </div>
                                                <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm group-hover:animate-pulse'>
                                                    <div className='h-4 w-4 rounded-full bg-_gray-808080/40' />
                                                    <div className='h-2 w-[100px] rounded-lg bg-_gray-808080/40' />
                                                </div>
                                                <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm group-hover:animate-pulse'>
                                                    <div className='h-4 w-4 rounded-full bg-_gray-808080/40' />
                                                    <div className='h-2 w-[100px] rounded-lg bg-_gray-808080/40' />
                                                </div>
                                            </div>
                                        </div>
                                        <span className='block w-full p-2 text-center font-normal'>
                                            Claro
                                        </span>
                                    </FormLabel>
                                </FormItem>
                                <FormItem>
                                    <FormLabel className='
                                            [&:has([data-state=checked])>div]:border-_main
                                            dark:[&:has([data-state=checked])>div]:border-_white
                                            dark:[&:has([data-state=unchecked])>div]:border-_dark-gray
                                        '
                                    >
                                        <FormControl>
                                            <RadioGroupItem value='dark' className='sr-only' />
                                        </FormControl>
                                        <div className='items-center rounded-md border-2 border-_gray-border bg-popover p-1 hover:bg-_gray-select dark:hover:bg-_dark-gray/40 group'>
                                            <div className='space-y-2 rounded-sm bg-_dark-gray p-2'>
                                                <div className='space-y-2 rounded-md bg-_main p-2 shadow-sm group-hover:animate-pulse'>
                                                    <div className='h-2 w-[80px] rounded-lg bg-_gray-808080' />
                                                    <div className='h-2 w-[100px] rounded-lg bg-_gray-808080' />
                                                </div>
                                                <div className='flex items-center space-x-2 rounded-md bg-_main p-2 shadow-sm group-hover:animate-pulse'>
                                                    <div className='h-4 w-4 rounded-full bg-_gray-808080' />
                                                    <div className='h-2 w-[100px] rounded-lg bg-_gray-808080' />
                                                </div>
                                                <div className='flex items-center space-x-2 rounded-md bg-_main p-2 shadow-sm group-hover:animate-pulse'>
                                                    <div className='h-4 w-4 rounded-full bg-_gray-808080' />
                                                    <div className='h-2 w-[100px] rounded-lg bg-_gray-808080' />
                                                </div>
                                            </div>
                                        </div>
                                        <span className='block w-full p-2 text-center font-normal'>
                                            Oscuro
                                        </span>
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormItem>
                    )}
                />

                <Button type='submit'>Actualizar apariencia</Button>
            </form>
        </Form>
  )
}
