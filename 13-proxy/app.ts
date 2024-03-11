enum HTTPMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
}
type HeaderType = Record<string, string>;
interface IRequestOption {
	headers?: HeaderType;
	method?: HTTPMethods;
	body?: BodyInit;
}

interface IRequestBuilder {
	options: IRequestOption;
	url: string;

	addHeaders(headers: object): void;
	setMethod(method: string): void;
	setBody(body: object): void;
	exec(): Promise<Response>;
}

class RequestBuilder implements IRequestBuilder {
	options: IRequestOption = {};

	constructor(public url: string) {}
	addHeaders(headers: HeaderType): this {
		this.options.headers = headers;
		return this;
	}

	setMethod(method: HTTPMethods): this {
		this.options.method = method;
		return this;
	}

	setBody(body: object): this {
		this.options.body = typeof body === 'string' ? body : JSON.stringify(body);
		return this;
	}

	exec(): Promise<Response> {
		return fetch(this.url, this.options);
	}
}

class APIProxy implements IRequestBuilder {
	private requestBuilder: RequestBuilder;
	options: IRequestOption = {};
	url: string;

	constructor(private id: number) {
		this.url = `https://dummyjson.com/products/${id}`;
		this.requestBuilder = new RequestBuilder(this.url);
	}
	addHeaders(headers: HeaderType): this {
		this.requestBuilder.addHeaders(headers);
		return this;
	}

	setMethod(method: HTTPMethods): this {
		this.requestBuilder.setMethod(method);
		return this;
	}
	setBody(body: object): this {
		this.requestBuilder.setBody(body);
		return this;
	}
	async exec(): Promise<Response> {
		if (this.id < 10) {
			return this.requestBuilder.exec();
		} else {
			throw new Error('ID продукта должен быть меньше 10');
		}
	}
}

const fetchRequest = async (productId: number) => {
	try {
		const proxy = new APIProxy(productId).setMethod(HTTPMethods.GET).addHeaders({ 'Content-Type': 'application/json' });
		const request = proxy.exec();
		const response = await request;
		const data = await response.json();
		console.log(data);
	} catch (e) {
		if (e instanceof Error) {
			console.log(e);
		}
	}
};

fetchRequest(5);
fetchRequest(15);
