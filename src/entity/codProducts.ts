import { Entity, PrimaryColumn, Column, Unique } from "typeorm";

 @Entity()
 @Unique(['codProducto'])

 export class Descripcion {
    
    @PrimaryColumn()
    codProducto:string;

    @Column()
    descripcion:string;

    @Column()
    image:string;

    @Column({nullable:true})
    undEmpaque:number;

    @Column({nullable:true})
    codEmpaque:string;
 }