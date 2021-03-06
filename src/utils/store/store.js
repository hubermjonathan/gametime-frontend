import networker from '../networker/networker';
import API_URL from '../API_URL';

const headers = {
    'Content-Type': 'application/json'
}

export async function confirmTransaction(transaction_id) {
    const data = { 
        transaction_id: transaction_id,
    }
    const config = {
        method: 'post',
        url: `${API_URL}/confirmTransaction`,
        headers: headers,
        data: data
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}

export async function createSession(buyer_info, items, team_id) {
    const itemDetails = items.map((item) => {
        const temp = {};
        temp.item_id = item.item_id;
        temp.quantity = item.quantity;
        temp.label = item.type !== "" ? item.type : null;
        return temp;
    });
    const data = { 
        success_url: `${window.location.href.split("#")[0]}#/team/${team_id}/transaction/success/`,
        cancel_url: `${window.location.href.split("#")[0]}#/team/${team_id}/store`,
        team_id: team_id,
        email: buyer_info.email,
        buyer_address: buyer_info.address, 
        items: itemDetails
    }
    const config = {
        method: 'post',
        url: `${API_URL}/createCheckoutSession`,
        headers: headers,
        data: data
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        }
        return res.data.id;
    } catch (err) {
        return false;
    }
}

export async function fetchItems(setItems, id) {
    const config = {
        method: 'get',
        url: `${API_URL}/store/items/?teamid=${id}`,
        headers: headers
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        } 
        if(Array.isArray(res.data.store_items)){
            setItems(res.data.store_items);
        }
        return true;
    } catch (err) {
        return false;
    }

}

export async function purchaseItems(buyer_info, items, team_id) {
    const itemDetails = items.map((item) => {
        const temp = {};
        temp.item_id = item.item_id;
        temp.item_name = item.item_name;
        temp.quantity = item.quantity;
        temp.label = item.type;
        return temp;
    });
    const data = { 
        team_id: team_id,
        buyer_email: buyer_info.email,
        buyer_address: buyer_info.address, 
        items: itemDetails
    }
    const config = {
        method: 'post',
        url: `${API_URL}/store/order`,
        headers: headers,
        data: data
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}

export async function createItem(team_id, item, types, picture) {
    const data = {
        ...item,
        team_id: team_id,
        types: types.map((elm) => {
            return elm.label;
        }),
        picture: picture
    }
    const config = {
        method: 'post',
        url: `${API_URL}/store/create`,
        headers: headers,
        data: data
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}

export async function updateItem(team_id, item, types, picture, item_id) {
    const data = {
        ...item,
        team_id: team_id,
        item_id: item_id,
        types: types.map((elm) => {
            return elm.label;
        }),
        picture: picture
    }
    const config = {
        method: 'put',
        url: `${API_URL}/store/update`,
        headers: headers,
        data: data
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}


export async function deleteItem(team_id, item_id) {
    const data = {
        team_id: team_id,
        item_id: item_id
    }
    const config = {
        method: 'delete',
        url: `${API_URL}/store/delete`,
        headers: headers,
        data: data
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}

export async function orders(team_id){
    const data = {
        team_id: team_id,
    }
    const config = {
        method: 'post',
        url: `${API_URL}/store/status`,
        headers: headers,
        data: data
    }
    try {
        const res = await networker(config);
        if(res.status!==200){
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}
