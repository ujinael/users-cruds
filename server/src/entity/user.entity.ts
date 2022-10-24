import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    surname?: string

    @Column()
    name?: string

    @Column()
    patronymic?:string

    @Column({name:"birth_date"})
    birthDate?:Date

    @Column({default:"test@test.ru"})
    email?:string

    @Column({default:"89241231122"})
    phone?:string

    @Column({name:"profile_image",nullable:true})
    profileImage?:string
}