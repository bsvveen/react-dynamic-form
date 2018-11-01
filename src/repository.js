
var baseUrl = "http://localhost:63597/api/";

const privateMethods = {

    Fetch(url, method, data) {
        return new Promise((resolve, reject) => {
            url = privateMethods.GetBaseUrl() + url;
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
    },

    GetBaseUrl() {
        var host = window.location.host;

        if (host.indexOf("localhost") >= 0)
            return baseUrl;

        return "Api/";
    }
}

export class Repository {    

    PostZorgAanvraag = (Aanvraag) => {
        return privateMethods.Fetch.call(this, 'Aanvraag/CreateAanvraag', 'POST', Aanvraag);
    }

    GetClientInfo = (ClientId) => {
        return privateMethods.Fetch.call(this, 'Client/GetClientInfo?ClientGlobalId=' + ClientId, 'GET');
    }

    GetHuisArtsInfo = ({ AgbCodeHuisarts, AgbCodePraktijk }) => {
        return privateMethods.Fetch.call(this, 'Vektis/GetVektisInfo?AgbCodeZorgVerlener=' + AgbCodeHuisarts + '&AgbCodePraktijk=' + AgbCodePraktijk, 'GET');
    }

    GetMedewerkerInfo = (MedewerkerId) => {
        return privateMethods.Fetch.call(this, 'Medewerker/GetMedewerkerInfo?MedewerkerGlobalId=' + MedewerkerId, 'GET');
    }

    GetTeamsByClient = (ClientId) => {
        return privateMethods.Fetch.call(this, 'Team/GetTeamsByClient?ClientGlobalId=' + ClientId, 'GET');
    }

    GetDienstenInfo = (ClientId) => {
        return privateMethods.Fetch.call(this, 'Aanvraag/GetDienstenInfo?OnlyIngepland=true&ClientGlobalId=' + ClientId, 'GET');
    }
}

export let repository = new Repository();