export interface UserModel {
    user_id: number
    user_name:string
    email:string
    password: string
    creation_date: Date
    photo: string
    occupation_area: string
}

export interface Photo {
    img: string
    value: string
}
