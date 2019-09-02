import Ankonnect from './index';
import url from 'url';

test('should construct without options', () => {
	const ank = new Ankonnect();
	const options = ank.getOptions();
	expect(options.baseUrl).toBe('https://haapi.ankama.com/json/Ankama/v2');
	expect(options.lang).toBe('fr');
	expect(options.proxy).toBe(null);
})

test('should construct with options', () => {
	const ank = new Ankonnect({
		baseUrl: 'http://custom.com',
		lang: 'pt',
		userAgent: 'test'
	});
	const options = ank.getOptions();
	expect(options.baseUrl).toBe('http://custom.com');
	expect(options.lang).toBe('pt');
	expect(options.userAgent).toBe('test');
	expect(options.proxy).toBe(null);
})

test('should construct with proxy', () => {
	const ank = new Ankonnect({
		proxy: 'http://test:test@1.1.1.1:80'
	});
	const options = ank.getOptions();
	const _url = new url.URL('http://test:test@1.1.1.1:80')
	expect(options.proxy).toStrictEqual(_url);
})