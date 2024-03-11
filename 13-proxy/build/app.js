"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var HTTPMethods;
(function (HTTPMethods) {
    HTTPMethods["GET"] = "GET";
    HTTPMethods["POST"] = "POST";
    HTTPMethods["PUT"] = "PUT";
    HTTPMethods["DELETE"] = "DELETE";
    HTTPMethods["PATCH"] = "PATCH";
})(HTTPMethods || (HTTPMethods = {}));
class RequestBuilder {
    constructor(url) {
        this.url = url;
        this.options = {};
    }
    addHeaders(headers) {
        this.options.headers = headers;
        return this;
    }
    setMethod(method) {
        this.options.method = method;
        return this;
    }
    setBody(body) {
        this.options.body = typeof body === 'string' ? body : JSON.stringify(body);
        return this;
    }
    exec() {
        return fetch(this.url, this.options);
    }
}
class APIProxy {
    constructor(id) {
        this.id = id;
        this.options = {};
        this.url = `https://dummyjson.com/products/${id}`;
        this.requestBuilder = new RequestBuilder(this.url);
    }
    addHeaders(headers) {
        this.requestBuilder.addHeaders(headers);
        return this;
    }
    setMethod(method) {
        this.requestBuilder.setMethod(method);
        return this;
    }
    setBody(body) {
        this.requestBuilder.setBody(body);
        return this;
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id < 10) {
                return this.requestBuilder.exec();
            }
            else {
                throw new Error('ID продукта должен быть меньше 10');
            }
        });
    }
}
const fetchRequest = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proxy = new APIProxy(productId).setMethod(HTTPMethods.GET).addHeaders({ 'Content-Type': 'application/json' });
        const request = proxy.exec();
        const response = yield request;
        const data = yield response.json();
        console.log(data);
    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e);
        }
    }
});
fetchRequest(5);
fetchRequest(15);
