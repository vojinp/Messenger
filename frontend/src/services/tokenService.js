import jwt_decode from 'jwt-decode';

class TokenService {
    token;

    saveToken = (token) => {
        localStorage.setItem('token', JSON.stringify(token));
    }

    loadToken = () => {
        if (!this.token)
            this.token = JSON.parse(localStorage.getItem('token')); 
        return this.token;
    }

    isAuthenticated = () => {
        return !!this.loadToken();
    }

    getUsername = () => {
        return jwt_decode(this.loadToken()).username;
    }

    getId = () => {
        return jwt_decode(this.loadToken()).id;
    }
}

export default new TokenService();