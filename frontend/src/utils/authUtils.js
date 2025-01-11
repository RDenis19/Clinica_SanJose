import { jwtDecode } from 'jwt-decode';


export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const { exp } = jwtDecode(token); // Decodifica el token
        const now = Math.floor(Date.now() / 1000);
        return exp < now; // Verifica si está expirado
    } catch (err) {
        console.error('Error decoding token:', err);
        return true; // Si ocurre un error, asumimos que está expirado
    }
};

export const checkTokenAndRedirect = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    try {
      const decoded = jwtDecode(token); // Usa jwtDecode correctamente aquí
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return false;
    }
  };
  ;
