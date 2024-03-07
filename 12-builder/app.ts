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
const fetchRequest = async () => {
	try {
		const request = new RequestBuilder('https://dummyjson.com/users')
			.setMethod(HTTPMethods.GET)
			.addHeaders({ 'Content-Type': 'application/json' })
			.exec();
		const response = await request;
		const data = await response.json();
		console.log(data);
	} catch (e) {
		if (e instanceof Error) {
			console.log(e.message);
		}
	}
};

fetchRequest();
