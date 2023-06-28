export type Status = 'no dr' | 'leve' | 'moderado' | 'severo' | 'proliferativo'

export type Diagnostic = {
    id: string
    patient: string
    prediction: 'no dr' | 'leve' | 'moderado' | 'severo' | 'proliferativo'
    date: string
    phone: string
    email: string
}

export type Patient = {
    id: string
    name: string
    prediction: Status
    image: string
    birthdate: Date
    phone: number
    email: string
    age: number
    sex: string
    address: string
    occupation: string
}