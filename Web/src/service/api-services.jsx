import axios from "axios";

const service = axios.create(

  {
    withCredentials: true,
    baseURL : import.meta.env.VITE_REACT_BASE_API_URL || ''
  }

);


service.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response.status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("user");
      window.location.assign("/login");
    } else if(error.response.status === 404 && error.response.data.message === "Lists not found"){
      return Promise.resolve([]);
    } else {
      // console.log("this is login error: ",error);
      return Promise.reject(error);
    }
  }
);

console.log(import.meta.env.VITE_REACT_BASE_API_URL);


//User
export function createUser(data){
  return service.post("/register", data)
}

export function login(data){
  return service.post("/login", data)
}

export function logoutApi(){
  return service.post("/logout")
}
//Groups
export function createGroup(data){
  return service.post("/groups", data)
}

export function getGroups(){
  return service.get("/groups")
}

export function updateGroup(groupId, groupData) {
  return service.patch(`/groups/${groupId}`, groupData);
}

export function deleteGroup(groupId) {
  return service.delete(`/groups/${groupId}`);
}

//Lists
export function getLists(groupId){
  //console.log("ESTE ES EL GROUP ID desde api-services: ", groupId)
  return service.get(`/group/${groupId}/lists`)
}

export function getListDetails(listId){
  //console.log("ESTE ES EL LIST ID desde api-services ListDetails: ", listId)
  return service.get(`/list/${listId}`)
}

export function deleteList(listId) {
  return service.delete(`/delete-list/${listId}`);
}

export function createList(groupId , listData) {
  return service.post(`/group/${groupId}/lists`, listData);
}

export function updateList(listId, listData) {
  console.log("ESTE ES EL Update LIST ID desde api-services : ", listId)
  return service.patch(`/list/${listId}`, listData);
}

//Products
export function createProduct(listId, productData) {
  return service.post(`/list/${listId}/products`, productData);
}

export function updateProduct(listId, productId, productData) {
  return service.patch(`/list/${listId}/products/${productId}`, productData);
}

export function deleteProduct(productId) {
  return service.delete(`/delete-product/${productId}`);
}

// store
// export function getStores(){
//   return service.get("/stores")
// }

// export function createStore( listId, storeData){
//   // console.log("ESTE ES EL LIST ID desde api-services createStore: ", listId)
//   return service.post(`/list/${listId}/stores", storeData`)
//   ///list/:listId/stores
// }

// export function updateStore(storeId, storeData) {
//   return service.patch(`/stores/${storeId}`, storeData);
// }

// export function deleteStore(storeId) {  
//   return service.delete(`/stores/${storeId}`);
// }


// export function getNearbyStores(lat, lng) {
//   return axios.get(`/stores/near?lat=${lat}&lng=${lng}`)
//     .then(response => response.data)
//     .catch(error => {
//       throw error;
//     });
// }


