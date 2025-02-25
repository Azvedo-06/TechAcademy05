import User from "../models/UserModel";
import {Request, Response}  from "express";
import bcrypt from "bcrypt";


class UserController {
    // criar usuario
    static async createUser(req:Request, res:Response) {
        try {
            const {name, email, password, cpf} = req.body;

            // Verificar se todos os campos necessários foram fornecidos
            if (!name || !email || !password) {
                return res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios!" });
            }

            // validar se o email já existe um usuario com o mesmo email 
            const existingUser = await User.findOne({where: {email}});
            if (existingUser) {
                return res.status(400).json({massage: "Email já cadastrado." });
            } 

            // criptografia de senha 
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                cpf,
            });

            return res.status(201).json({message: "Usuário criado com sucesso!", user: newUser });
        } 
        catch (error) {
            console.error("Erro ao criar usuário:", error);
            return res.status(500).json({error: "Erro ao criar usuário"})
        }
    }
    // obter todos os usuários
    static async findAll(req: Request, res: Response) {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            return res.status(500).json({error: "Erro ao buscar usuários"});
        }
    }
    // obter usuários por id
    static async findById(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            // Procura o usuário pelo ID
            const user = await User.findByPk(userId);

            if(!user) {
                return res.status(404).json({message: "Usuário não encontrado"})
            }
            return res.status(201).json(user);
        } catch (error) {
            console.error("Erro ao buscar usuário", error);
            return res.status(500).json({error: "Erro ao buscar usuário"});
        }
    }
    // deletar usuário
    static async delete(req: Request, res: Response) {
        try {
            const userId = req.params.id
            const user = await User.destroy({ where:{id:userId} });

            if(user === 0) {
                return res.status(404).json({message: "Usuário não encontrado"});
            }
            return res.status(201).json(user);
        } catch (error) {
            console.error("Erro ao deletar usuário", error);
            return res.status(500).json({error : "Erro ao tentar deletar usuário"})
        }
    }
    // atualizar usuário
    static async update(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const {name, email, password, cpf} = req.body;

            // Procura o usuário pelo ID
            const user = await User.findByPk(userId);

            if (!user) {
                // Se o usuário não for encontrado
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            // Atualiza os campos do usuário (apenas os que foram enviados no corpo)
            user.name = name || user.name;
            user.email = email || user.email;
            user.password = password ? await bcrypt.hash(password, 10) : user.password;
            user.cpf = cpf || user.cpf;

            // Salva as mudanças no banco de dados
            await user.save();

            return res.status(200).json({ message: "Usuário atualizado com sucesso", user });
        } catch (error) {
            console.error("Erro ao atualizar usuário", error);
            return res.status(500).json({ error: "Erro ao tentar atualizar o usuário" });
        }  
    }
}


export default UserController;