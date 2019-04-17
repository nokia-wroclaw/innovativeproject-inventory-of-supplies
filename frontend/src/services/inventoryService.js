import axios from 'axios';

export const getItems = ({pageNumber : page, itemsPerPage : page_size}={}) => {
    let params = {};
    if(page !== undefined) params.page = page;
    if(page_size !== undefined) params.page_size = page_size;

    return axios({
        method: 'get',
        url: '/api/supplies/',
        params : params
    });
}

export const searchItems = ({searchPhase : name = "", pageNumber: page, itemsPerPage: page_size}={}) => {
    let params = {};
    params.name = name;
    if(page !== undefined) params.page = page;
    if(page_size !== undefined) params.page_size = page_size;

    return axios({
        method: 'get',
        url: '/api/supplies/search',
        params : params
    });
}

export const insertItem = async (item) =>  {
    return axios({
        method: 'post',
        url: '/api/supplies/',
        data: item
    });
}

export const deleteItem = async (itemId) => {
    return axios({
        method: 'delete',
        url: `/api/supplies/${itemId}/`
    });
}

export const partialUpdateItem = (itemId, itemBody) => {
    return axios({
        method: 'patch',
        url: `/api/supplies/${itemId}/`,
        data: itemBody
    });
}