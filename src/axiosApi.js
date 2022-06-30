import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/api/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('userInfo') ? "Bearer " + JSON.parse(localStorage.getItem('userInfo')).access : null,
    }
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Prevent infinite loops early
        if (error.response.status === 401 && originalRequest.url === baseURL+'token/refresh/') {
            window.location = '/login/';
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401) 
            {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'))
                const refreshToken = userInfo.refresh;

                if (refreshToken){
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp);

                    if (tokenParts.exp > now) {
                        return axiosInstance
                        .post('/token/refresh/', {'refresh': refreshToken})
                        .then((response) => {
                            userInfo.access = response.data.access
                            userInfo.refresh = response.data.refresh
                            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
                            axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
            
                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                    }else{
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        localStorage.removeItem('userInfo')
                        window.location = '/login/';
                    }
                }else{
                    console.log("Refresh token not available.")
                    window.location = '/login/';
                }
        }
     
      // specific error handling done elsewhere
      return Promise.reject(error);
  }
);

export default axiosInstance