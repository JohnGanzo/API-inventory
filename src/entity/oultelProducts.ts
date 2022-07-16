import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class SalidaProductos{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    codProducto:string;

    @Column({nullable:true})
    descripcion:string;

    @Column()
    userId:number;
    
    @Column()
    @CreateDateColumn()
    createdAt:Date;
}