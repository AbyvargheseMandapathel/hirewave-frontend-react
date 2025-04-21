// Token utility functions to ensure consistent token handling across the app

// Store token in all available storage mechanisms
export const storeToken = (token) => {
    if (!token) return false;
    
    try {
        // Store in localStorage (primary)
        localStorage.setItem('token', token);
        
        // Store in sessionStorage (backup)
        sessionStorage.setItem('token', token);
        
        // Store in cookie (additional backup)
        document.cookie = `token=${token}; path=/; max-age=86400`;
        
        // Set in axios headers
        import('axios').then(axios => {
            axios.default.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        });
        
        return true;
    } catch (error) {
        console.error('Error storing token:', error);
        return false;
    }
};

// Get token from any available storage
export const getToken = () => {
    try {
        // Try localStorage first
        let token = localStorage.getItem('accessToken');
        if (token) {
            // Ensure axios headers are set
            import('axios').then(axios => {
                axios.default.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            });
            return token;
        }
        
        // Try sessionStorage next
        token = sessionStorage.getItem('token');
        if (token) {
            // Move to localStorage for future use
            localStorage.setItem('token', token);
            // Ensure axios headers are set
            import('axios').then(axios => {
                axios.default.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            });
            return token;
        }
        
        // Try cookies as last resort
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
        if (tokenCookie) {
            token = tokenCookie.split('=')[1];
            // Move to localStorage for future use
            localStorage.setItem('token', token);
            // Ensure axios headers are set
            import('axios').then(axios => {
                axios.default.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            });
            return token;
        }
        
        return null;
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

// Clear token from all storage mechanisms
export const clearToken = () => {
    try {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        
        import('axios').then(axios => {
            delete axios.default.defaults.headers.common['Authorization'];
        });
        
        return true;
    } catch (error) {
        console.error('Error clearing token:', error);
        return false;
    }
};

// Check if token exists in any storage
export const hasToken = () => {
    return !!getToken();
};

