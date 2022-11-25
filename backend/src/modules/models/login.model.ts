import { prisma } from "../../../prisma/client";
import { LoginTypes } from "./interfaces/LoginTypes";

export default class LoginModel {
    async login({ username }: LoginTypes) {        
        // Procura usuário
        const user = await prisma.user.findUnique({ where: { username } });

        return user;
    };
};