import Ankonnect from '../../index';

test('should fail with 601', async () => {
    const ank = new Ankonnect();
    try {
        await ank.Api.createApiKey({
            login: 'test',
            password: 'test',
            long_life_token: false
        });
    } catch (e) {
        console.log(e);
    }
})