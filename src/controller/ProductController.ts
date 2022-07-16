import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Descripcion, LoteOptimo, SalidaProductos } from '../entity';
import { validate } from "class-validator";

export class ProductsController{
    static newDescription = async (req:Request, res:Response) => {
        const { codProducto, descripcion, undEmpaque, codEmpaque, image } = req.body;

        const product = new Descripcion();

        if(undEmpaque == null){
            let undEmpaque = null;
        }else if (codEmpaque == null ){
            let codEmpaque = null;
        }else if ( image == null){
            let image = null;
        }

        product.codProducto = codProducto;
        product.descripcion = descripcion;
        product.undEmpaque = undEmpaque;
        product.codEmpaque = codEmpaque;
        product.image = image;

        // Validate
        const validationOpt = { validationError:{target:false, value:false}};
        const errors = await validate(product, validationOpt);

        if(errors.length > 0 ){
            return res.status(400).json(errors)
        }

        const descripcionRepository = getRepository(Descripcion);
        await descripcionRepository.save(product);
    
        res.send('Product Created');
    }

    static newEOQ = async (req:Request, res:Response) => {
        const { codProducto, descripcion, optimo, saldo, estado, userId, image } = req.body;

        const newEoqUser = new LoteOptimo();
        newEoqUser.codProducto = codProducto;
        newEoqUser.descripcion = descripcion;
        newEoqUser.optimo = optimo;
        newEoqUser.saldo = saldo;
        newEoqUser.estado = estado;
        newEoqUser.userId = userId;
        newEoqUser.image = image;

        // Validate
        const validationOpt = { validationError:{target:false, value:false}}
        const errors = await validate(newEoqUser, validationOpt);

        if(errors.length > 0 ){
            return res.status(400).json(errors);
        }

        const newEoqRepository = getRepository(LoteOptimo);
        await newEoqRepository.save(newEoqUser);

        res.send('New EOQ created');
    }

    static newSaldo = async (req:Request, res:Response) => {
        const userId = res.locals.jwtPayload.userId;
        console.log(userId);

        const desProduct = req.body;
        const barcode: string = desProduct.codProducto
        console.log(barcode);

        const userRepository = getRepository(LoteOptimo);

        let codProductos;

        try {
            codProductos = await userRepository
            .createQueryBuilder()
            .update(LoteOptimo)
            .set({
                saldo:() => "saldo -1"
            })
            .where("codProducto = :codb", {codb:barcode})
            .andWhere("userId = :userIds", {userIds: userId})
            .execute();

            const newData = await userRepository
            .createQueryBuilder()
            .select()
            .where("codProducto = :codb", {codb:barcode})
            .andWhere("userId = :userIds", {userIds: userId})
            .getOneOrFail()

            const codeProduct = newData.codProducto;
            const descripcionProducto = newData.descripcion;
            const userIdOutet = newData.userId;
            const imageProduct = newData.image;
            const newSaldo = newData.saldo;

            const RegistroSalida = getRepository(SalidaProductos)
            .createQueryBuilder()
            .insert()
            .into(SalidaProductos)
            .values([
                { codProducto: codeProduct, descripcion: descripcionProducto, userId: userIdOutet }
            ])
            .execute();

            const envioDatos = {
                codeProduct,
                descripcionProducto,
                imageProduct,
                newSaldo
            }

            return res.json(envioDatos)
        } catch (e) {
            const usreIdGet = res.locals.jwtPayload
            const userId = usreIdGet.userId

            const desProduct = req.body
            const barcode:string = desProduct.codProducto

            const RegistroSalida = getRepository(SalidaProductos)
            .createQueryBuilder()
            .insert()
            .into(SalidaProductos)
            .values([
                { codProducto: barcode, userId: userId }
            ])
            .execute();


            const envioDatos = {
                barcode
            }

            return res.json(envioDatos)
        }
    }
}















export default ProductsController;