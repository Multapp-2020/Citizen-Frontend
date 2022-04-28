// funcion a la que se le mete un error que da firebase y devuelve algo entendible
export const traducirError = (error) => {
    switch (error) {
        case "":
            return "";
        // errores de login
        case "auth/wrong-password":
            return "La contraseña es incorrecta";
        case "auth/user-not-found":
            return "El correo electrónico no está cargado en nuestros sistemas";
        case "auth/invalid-email":
            return "El correo electrónico no es válido";
        case "auth/user-disabled":
            return "Su cuenta fue bloqueada. Contacte con un administrador";
        // errores de authentication
        case "auth/email-already-exists":
            return "Ya existe un usuario con el correo electrónico ingresado";
        case "auth/phone-number-already-exists":
            return "Ya existe un usuario con el número de teléfono ingresado";
        case "auth/invalid-phone-number":
            return "El número de teléfono no tiene el formato indicado";
        case "auth/user-disabled":
            return "Usted se encuentra desactivado del sistema. Contacte su administrador.";
        default:
            return "Ocurrió un error. Intente nuevamente";
    }
}