const CreateUserUseCase = require('../../../domain/useCases/user/CreateUserUseCase');
const LoginUserUseCase = require('../../../domain/useCases/user/LoginUserUseCase');
//const MySQLUserRepository = require('../../infrastructure/repositories/MySQLUserRepository');
const MySQLUserRepository = require('../../../infrastructure/repositories/MySQLUserRepository');


const userRepository = new MySQLUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

class UserController {
    async signUp(req, res) {
        try {
            const { nombre, correoElectronico, telefono, password, direccion } = req.body;
            const user = await createUserUseCase.execute({ nombre, correoElectronico, telefono, password, direccion });
            res.status(201).json({ message: 'Usuario registrado con éxito', user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { correoElectronico, password } = req.body;
            const { user, token } = await loginUserUseCase.execute({ correoElectronico, password });
            res.status(200).json({ message: 'Inicio de sesión exitoso', user, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UserController();