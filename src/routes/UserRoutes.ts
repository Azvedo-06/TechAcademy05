import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();
    
// Rota para criar um novo usuário
//router.post('/users' + UserController.createUser);
router.get('/users', (req, res) =>{
    res.json(UserController.createUser)
})

// Rota para pegar todos usuários
router.get('/users', (req, res) => {
    res.json(UserController.findAll)
});

// Rota para obter um usuário por ID
router.get('/users/:id', (req, res) => {
    res.json(UserController.findById)
});

// Rota para deletar usuário por ID
router.delete('/users/:id', (req, res) => {
    res.json(UserController.delete)
});

// Rota para atualizar usuário por Id
router.patch('/users/:id', (req, res) => {
    res.json(UserController.update)
});



export default router;