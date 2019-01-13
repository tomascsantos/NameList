import 'whatwg-fetch';

class HttpService {
    getProducts = () => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3004/rushie/list')
                .then(res => {
                    resolve(res.json());
            })
        });
        return promise;
    }
}

export default HttpService;