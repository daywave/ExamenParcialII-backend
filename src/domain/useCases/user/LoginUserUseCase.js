const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ correoElectronico, password }) {
        // Verifica si el usuario existe usando el correo electrónico
        const user = await this.userRepository.getUserByEmail(correoElectronico);
        console.log("Usuario encontrado:", user);

        if (!user) {
            throw new Error('Credenciales incorrectas.');
        }

        // Verifica la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("¿La contraseña es válida?", isPasswordValid);

        if (!isPasswordValid) {
            throw new Error('Credenciales incorrectas.');
        }

        // Genera un token JWT
        const token = jwt.sign({ userId: user.id_usuario }, 'your_secret_key', { expiresIn: '1h' });

        return { user, token };
    }
}

module.exports = LoginUserUseCase;
