import Ankonnect from '../../index';

test('should fail with FAILED reason', async () => {
    const ank = new Ankonnect();
    expect(await ank.Api.createApiKey({
        login: 'test',
        password: 'test',
        long_life_token: false
    })).toThrow();
});

test('should fail', async () => {
    const ank = new Ankonnect();
    expect(await ank.Api.createToken({
        game: 18,
    }, '123')).toThrow();
});