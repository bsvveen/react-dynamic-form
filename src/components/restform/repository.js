
const privateMethods = {

    Fetch(url, method, data) {
        return new Promise((resolve, reject) => {
            url = this.baseUrl + url;
            if (data !== undefined && method === 'GET')
                url = url + '?' + data;

            return fetch(url, {
                headers: new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Cache": "no-cache"
                }),
                credentials: 'include',
                method: method,
                body: JSON.stringify(data)
            }).then(privateMethods.parseJSON).then((response) => {
                if (response.ok)
                    return resolve(response.json);
                if (response.status === 400)
                    alert("Kan de server niet bereiken: 400 (Bad Request)");

                return reject(response.json);
            }).catch((err) => {
                alert(err);
            });
        })       
    },

    parseJSON(response) {
        return new Promise((resolve) => response.json()
            .then((json) => resolve({
                status: response.status,
                ok: response.ok,
                json,
        })));
    }    
}

export class Repository {    

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
      }

    Post = (model) => {
        return privateMethods.Fetch.call(this, '', 'POST', model);
    }

    Put = (model) => {
        return privateMethods.Fetch.call(this, '', 'PUT', model);
    }

    Get = (Id) => {
        return privateMethods.Fetch.call(this, 'getbyid?Id=' + Id, 'GET');
    }

    List = () => {
        return privateMethods.Fetch.call(this, 'listall', 'GET');
    }    
}

//export let repository = new Repository();
export default Repository;