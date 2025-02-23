import express from 'express';
import sequelize from './config/database';
import UserModel from './models/UserModel';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Projeto 05 TechAcademy');
})

    
// async = valor de retorno é uma promise
app.get('/users', async (req, res) => {
    try {
        const usersFindAll = await UserModel.findAll();
        res.json(usersFindAll); //Melhor usar res.json() em vez de res.send()
    } catch(error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno ao buscar usuários' })
    }
});


// async database
sequelize.sync({ alter: true})
    .then(() => {
        console.log('database foi sincronizada com sucesso');
    })
    .catch(() => {
        console.log('falha ao tentar sincronizar database');
    });


// esse sempre por ultimo
app.listen(PORT, () =>{
    console.log(`Serrver is running on port ${PORT}`);
});