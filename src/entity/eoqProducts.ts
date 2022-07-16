import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class LoteOptimo{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    codProducto:string;

    @Column()
    descripcion:string;

    @Column()
    optimo:number;

    @Column()
    saldo:number;
    
    @Column()
    estado:number;
    
    @Column()
    userId:number;

    @Column()
    image:string;

    @Column()
    @CreateDateColumn()
    createAt: Date;
}