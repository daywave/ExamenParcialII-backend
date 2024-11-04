const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ correoElectronico, password }) {
        try {
            console.log("1. Iniciando login con correo:", correoElectronico);
            
            const user = await this.userRepository.getUserByEmail(correoElectronico);
            console.log("2. Datos raw del usuario:", user);
            
            // Verificación detallada de la estructura
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            console.log("3. Propiedades del usuario:", {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                correo_electronico: user.correo_electronico,
                tiene_password: !!user.password
            });

            // Verifica explícitamente cada propiedad requerida
            if (!user.id_usuario) {
                console.error("Falta id_usuario en el objeto usuario:", user);
                throw new Error('Error en la estructura de datos del usuario: falta id_usuario');
            }

            if (!user.password) {
                console.error("Falta password en el objeto usuario:", user);
                throw new Error('Error en la estructura de datos del usuario: falta password');
            }

            // Verifica la contraseña
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log("4. Resultado de la validación de contraseña:", isPasswordValid);

            if (!isPasswordValid) {
                throw new Error('Contraseña incorrecta');
            }

            // Genera el token
            const token = jwt.sign(
                { 
                    userId: user.id_usuario,
                    email: user.correo_electronico 
                },
                'your_secret_key',
                { expiresIn: '1h' }
            );

            // Estructura de respuesta
            const response = {
                user: {
                    id_usuario: user.id_usuario,
                    nombre: user.nombre,
                    correo_electronico: user.correo_electronico,
                    telefono: user.telefono,
                    direccion: user.direccion
                },
                token
            };

            console.log("5. Respuesta final:", response);
            return response;

        } catch (error) {
            console.error("Error en LoginUserUseCase:", error);
            throw error;
        }
    }
}



module.exports = LoginUserUseCase;
