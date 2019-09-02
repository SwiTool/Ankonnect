import url from 'url';
import UserAgent from './lib/UserAgent';
import Api from './lib/models/Api';

export type AnkonnectOptions = {
	baseUrl?: string;
	userAgent?: string;
	lang?: string;
	proxy?: url.URL | string | null;
}

export type AnkonnectDefOptions = {
	baseUrl: string;
	userAgent: string;
	lang: string;
	proxy: url.URL | null;
}

export default class Ankonnect {
	private options: AnkonnectDefOptions = {
		baseUrl: 'https://haapi.ankama.com',
		userAgent: UserAgent.getRandomUserAgent(),
		lang: 'fr',
		proxy: null,
	};
	public Api: Api;
	
	public constructor(options: AnkonnectOptions) {
		this.options = {...this.options, ...options}; // TODO fix ?
		this.options.proxy = this.initProxy();
		this.Api = new Api(this.options);
	}
	
	private initProxy(): url.URL | null {
		let proxy = null;
		if (typeof this.options.proxy === 'string') {
			proxy = new url.URL(this.options.proxy)
		} else if (this.options.proxy instanceof url.URL) {
			proxy = this.options.proxy;
		}
		return proxy;
	}
}