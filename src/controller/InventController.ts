import { getRepository} from "typeorm";
import { Request, Response } from "express";
import { LoteOptimo } from "../entity";

export class InventController{
    static getInv = async (req: Request, res:Response) => {
        const userIdGet = res.locals.jwtPayload
        
        
        const invetUser: number = userIdGet.userId

        const invRepository = getRepository(LoteOptimo)
        let inventarioUserId = []

        try {
            inventarioUserId = await invRepository
            .createQueryBuilder()
            .select()
            .where("userId = :userIds", {userIds: invetUser})
            .getMany()

            return res.json(inventarioUserId)

        } catch (e) {
            return res.status(401).json('No hay registro de inventario')
        }
    }
}

export default InventController