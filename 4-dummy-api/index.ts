enum Gender {
	Male = 'male',
	Female = 'female',
}
enum HairType {
	Strands = 'Strands',
	Wavy = 'Wavy',
	VeryCurly = 'Very curly',
	Straight = 'Straight',
	Curly = 'Curly',
}
enum Color {
	Black = 'Black',
	Brown = 'Brown',
	Blond = 'Blond',
	Gray = 'Gray',
	Amber = 'Amber',
	Blue = 'Blue',
	Chestnut = 'Chestnut',
	Green = 'Green',
	Auburn = 'Auburn',
}
enum IBloodGroup {
	O_NEG = 'O-',
	O_POS = 'O+',
	A_NEG = 'A-',
	A_POS = 'A+',
	B_NEG = 'B-',
	B_POS = 'B+',
	AB_NEG = 'AB-',
	AB_POS = 'AB+',
}
interface IHair {
	color: Color;
	type: HairType;
}
interface ICoordinates {
	lat: number;
	lng: number;
}
interface IAddress {
	address: string;
	city: string;
	coordinates: ICoordinates;
	postalCode: string;
	state: string;
}
interface ICompany {
	address: IAddress;
	department: string;
	name: string;
	title: string;
}
interface IBank {
	cardExpire: string;
	cardNumber: string;
	cardType: string;
	currency: string;
	iban: string;
}
interface ICrypto {
	coin: string;
	wallet: string;
	network: string;
}
interface IUser {
	id: number;
	firstName: string;
	maidenName: string;
	age: number;
	gender: Gender;
	email: string;
	phone: string;
	username: string;
	password: string;
	birthDate: string;
	image: string;
	bloodGroup: IBloodGroup;
	height: number;
	weight: number;
	eyeColor: Color;
	hair: IHair;
	domain: string;
	ip: string;
	address: IAddress;
	postalCode: string;
	state: string;
	macAddress: string;
	university: string;
	bank: IBank;
	company: ICompany;
	ein: string;
	ssn: string;
	userAgent: string;
	crypto: ICrypto;
}

interface IResponse {
	users: IUser[];
	total: number;
	skip: number;
	limit: number;
}

const url = 'https://dummyjson.com/users';
const getData = async (url: string): Promise<IResponse | null> => {
	try {
		const res = await fetch(url);
		if (res.ok) {
			return res.json();
		} else {
			throw new Error(`ERROR Status: ${res.status}
			ERROR Message: ${res.statusText}`);
		}
	} catch (e) {
		if (e instanceof Error) {
			console.error(e.message);
		}
	}
	return null;
};
(async () => {
	const data = await getData(url);
	console.log(data);
})();
