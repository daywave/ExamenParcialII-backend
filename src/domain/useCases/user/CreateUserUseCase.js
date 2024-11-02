const bcrypt = require('bcrypt');
const User = require('../../entities/User');

class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ nombre, correoElectronico, telefono, password, direccion }) {
        console.log("Datos recibidos en CreateUserUseCase:", { nombre, correoElectronico, telefono, password, direccion});

        // Verifica si el usuario ya existe
        const existingUser = await this.userRepository.getUserByEmail(correoElectronico);
        if (existingUser) {
            throw new Error('El correo electrónico ya está registrado.');
        }

        // Encripta la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Contraseña encriptada:", hashedPassword);

        // Crea el usuario
        const user = await this.userRepository.createUser({
            nombre,
            correoElectronico,
            telefono,
            password: hashedPassword,
            direccion
        });

        console.log("Usuario creado:", user);
        return user;
    }
}

module.exports = CreateUserUseCase;
