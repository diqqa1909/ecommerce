import axiosClient from "../axios";

export function getUser({commit}){
    return axiosClient.get('/user')
        .then(response=>{
            commit('setUser', response.data);
            return response;
        })
}

export async function login({ commit }, data) {
    const response = await axiosClient.post('/login', data);
    commit('setUser', response.data.user);
    commit('setToken', response.data.token);
    return response.data;
}

export function logout({commit}){
    return axiosClient.post('/logout')
        .then((response)=>{
            commit('setToken', null)

            return response;
        })
}

export function getProducts({commit}, {url=null, search='', perPage=10, sort_field, sort_direction} = {}){
    commit('setProducts', [true]);
    url = url || '/products';
    return axiosClient.get(url, {
        params: {
            search,
            per_page: perPage,
            sort_field,
            sort_direction
        }
    })
        .then(response=>{
            commit('setProducts', [false, response.data]);
        })
        .catch(()=>{
            commit('setProducts', [false]); 
        })
}

export function getProduct({}, id){
    return axiosClient.get(`/products/${id}`)
}

export function createProduct({commit}, product) {
    console.log('🔄 createProduct called with:', product);
    
    if (product.image instanceof File) {
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('image', product.image);
        formData.append('description', product.description || '');
        formData.append('price', product.price.toString());

        console.log('📦 FormData contents:');
        for (let [key, value] of formData.entries()) {
            console.log(`  ${key}:`, value, `(type: ${typeof value})`);
        }

        return axiosClient.post('/products', formData, {
            transformRequest: [(data, headers) => {
                delete headers['Content-Type'];
                return data;
            }]
        })
    }
    
    return axiosClient.post('/products', product);
}

export function updateProduct({commit}, product){
    const id = product.id
    if (product.image instanceof File) {
        const form = new FormData();
        form.append('id', product.id);
        form.append('title', product.title);
        form.append('image', product.image);
        form.append('description', product.description);
        form.append('price', product.price);
        form.append('_method', 'PUT');
        product = form;
    }else{
        product._method = 'PUT'
    }
    return axiosClient.post(`/products/${id}`, product)
}

export function deleteProduct({commit}, id){
    return axiosClient.delete(`/products/${id}`)
}