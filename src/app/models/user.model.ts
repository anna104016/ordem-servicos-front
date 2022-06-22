export class UserModel {
    user_id: number
    user_name:string
    email:string
    password: string
    creation_date: Date
    photo: string
    occupation_area: string
}
export class ResUserResolve {
     user: UserModel
}

export class Photo {
    img: string
    value: string
}