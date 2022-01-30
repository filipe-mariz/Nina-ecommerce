import test from 'japa';
import { JSDOM } from 'jsdom';
import supertest from 'supertest';
import User from 'App/Models/User';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User', () => {
    test('ensure home page works', async assert => {
        const { text } = await supertest(BASE_URL).get('/user:user_id?').expect(200)
        const { document } = new JSDOM(text).window
        const title = document.querySelector('.title')
    
        assert.exists(title)
        assert.equal(title!.textContent!.trim(), 'It Works!')
    })

    test.group('Create user', () => {
        test('with correct data', async assert => {
            const data = {
                name: 'Filipe Mariz',
                email: 'filipe@gmail.com',
                password: '1234',
                rg: '10210059',
                cpf: '12612449406',
                number: '81988439946',
                instagram: '@filipe__mariz',
                is_admin: false,
                company_id: '1'
            };

            const user = await User.create(data);
            assert.isTrue(user)
        })
    })
})