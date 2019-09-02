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
		baseUrl: 'https://haapi.ankama.com/json/Ankama/v2',
		userAgent: UserAgent.getRandomUserAgent(),
		lang: 'fr',
		proxy: null,
	};
	public Api: Api;
	
	public constructor(options?: AnkonnectOptions) {
		const opts = {
			baseUrl: options && options.baseUrl ? options.baseUrl : this.options.baseUrl,
			userAgent: options && options.userAgent ? options.userAgent : this.options.userAgent,
			lang: options && options.lang ? options.lang : this.options.lang,
			proxy: this.initProxy(options ? options.proxy : null),
		}
		this.options = opts;
		this.Api = new Api(this.options);
	}
	
	private initProxy(proxy: any): url.URL | null {
		if (typeof proxy === 'string') {
			return new url.URL(proxy)
		} else if (proxy instanceof url.URL) {
			return proxy;
		}
		return null;
	}

	public getOptions(): AnkonnectDefOptions {
		return this.options;
	}
}