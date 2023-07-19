import { Button } from '@/components/ui/button'
import { ImageIcon } from 'lucide-react'

export default function NewForm() {
    return (
        <form>
            <div className='flex flex-col gap-10'>
                <div className='border border-_gray-border' />
                <label htmlFor='upload'>
                    <div className={`
                                flex
                                flex-col
                                items-center
                                justify-center
                                gap-5
                                h-80
                                bg-_gray-F9F9F9
                                hover:bg-_gray-select
                                cursor-pointer
                                border-2
                                border-dashed
                                border-_gray-808080
                                rounded-lg
                                p-4
                                relative
                            `}
                    >
                        <ImageIcon size={28} />
                        <div className='flex flex-col items-center gap-3'>
                            <h1 className='font-bold text-base'>Subir Media</h1>
                            <p className='text-xs text-_gray-808080'>
                                Las imágenes deben tener menos de <strong>2 MB</strong> de tamaño.
                            </p>
                            <Button type='button' className='px-10 rounded-xl pointer-events-none'>
                                Subir
                            </Button>
                        </div>
                        <input type='file' id='upload' className='sr-only bottom-20' required />
                    </div>
                </label>
                <div className='border border-_gray-border' />
            </div>
            <div>
                <h1 className='text-base font-bold text-center my-4'>Datos del paciente</h1>
                <div className='flex flex-col gap-3'>
                    <div className='grid grid-cols-3 grid-rows-3 gap-3'>
                        <div className='flex flex-col gap-2 col-span-2'>
                            <label htmlFor='nombre' className='text-xs font-medium'>Nombre</label>
                            <div className='px-5 py-3 bg-_gray-F9F9F9 rounded-lg'>
                                <input type='text' id='nombre' className='w-full bg-transparent outline-none text-sm font-semibold' placeholder='Paciente' autoComplete='off' required />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 col-span-1'>
                            <label htmlFor='prediccion' className='text-xs font-medium'>Prediccion</label>
                            <div className='px-5 py-3 bg-_main text-_white rounded-lg'>
                                <input type='text' id='prediccion' disabled className='w-full bg-transparent outline-none text-sm font-semibold' placeholder='Sin predicción' required />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 col-span-1'>
                            <label htmlFor='edad' className='text-xs font-medium'>Edad</label>
                            <div className='px-5 py-3 bg-_gray-F9F9F9 rounded-lg'>
                                <input type='number' id='edad' max={150} min={10} className='w-full bg-transparent outline-none text-sm font-semibold' placeholder='18' required />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 col-span-2 row-span-2'>
                            <label htmlFor='extra' className='text-xs font-medium'>Datos adicionales</label>
                            <div className='px-5 py-3 bg-_gray-F9F9F9 rounded-lg h-full'>
                                <textarea id='extra' rows={5} className='w-full bg-transparent outline-none text-sm font-semibold' placeholder='Escribe datos adicionales del paciente' required />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 col-span-1'>
                            <label htmlFor='sexo' className='text-xs font-medium'>Sexo</label>
                            <div className='px-5 py-3 bg-_gray-F9F9F9 rounded-lg'>
                                <select name='sexo' id='sexo' className='w-full bg-transparent outline-none text-sm font-semibold' required>
                                    <option value='masculino'>Masculino</option>
                                    <option value='femenino'>Femenino</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <Button>Predecir</Button>
                </div>
            </div>
        </form>
    )
}