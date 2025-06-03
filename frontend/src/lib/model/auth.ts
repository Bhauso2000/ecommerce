
const auth = {
      getToken() {
        return window.localStorage.getItem('token');
      },
      setToken(token:string){
        localStorage.setItem('token',token)
      },
       destroy(){
        localStorage.removeItem('token')
      }
      
};

export default auth;
