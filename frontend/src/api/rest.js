import { authRequest } from './auth'

const ping = () => {
  const extraParameters = {params: {"id": "PONG" }}
  return authRequest.get('/api/ping/',extraParameters)
    .then(response=>{
      return Promise.resolve(response.data)
    }).catch((error)=> {
      return Promise.reject(error)
    });
}


export { ping }
