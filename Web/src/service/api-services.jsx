import axios from "axios";

const service = axios.create(

  {
    withCredentials: true,
    baseURL : import.meta.env.REACT_APP_BASE_API_URL || 'http://localhost:3000/v1'
  }

);

service.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response.status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("user");
      window.location.assign("/login");
    } else {
      return Promise.reject(error);
    }
  }
);
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
  return service.get(`/group/${groupId}/lists`)
}

export function getListDetails(listId){
  return service.get(`/list/${listId}`)
}

export function deleteList(listId) {
  return service.delete(`/list/${listId}`);
}

export function createList(groupId , listData) {
  return service.post(`/group/${groupId}/lists`, listData);
}

export function updateList(listId, listData) {
  return service.patch(`/list/${listId}`, listData);
}

//Products
export function createProduct(listId, productData) {
  return service.post(`/list/${listId}/products`, productData);
}

export function updateProduct(listId, productId, productData) {
  return service.patch(`/list/${listId}/products/${productId}`, productData);
}

export function deleteProduct(listId, productId) {
  return service.delete(`/list/${listId}/products/${productId}`);
}

//store
export function getStores(){
  return service.get("/stores")
}

export function createStore(storeData){
  return service.post("/stores", storeData)
}

export function updateStore(storeId, storeData) {
  return service.patch(`/stores/${storeId}`, storeData);
}

export function deleteStore(storeId) {  
  return service.delete(`/stores/${storeId}`);
}

