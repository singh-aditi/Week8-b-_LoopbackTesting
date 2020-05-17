import {Client, expect} from '@loopback/testlab';
import {TestApplication} from '../..';
import {setupApplication} from "./test-helper";


describe('EmployeeControllerController', () => {
  let app: TestApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  })

  it('invokes get Employees', async () => {
    const res = await client
      .get('/list-emp')
      .expect(200)
  })

  it('invokes post employees with empty data', async () => {
    const reqData = {}
    const res = await client
      .post('/list-emp')
      .send(reqData)
      .expect(422)

    expect(res).to.have.property('error');
  })

  it('invokes post employees with correct data', async () => {
    const reqData = {

      firstName: 'Aditi',
      middleName: ' ',
      lastName: 'Singh',
      email: 'a@a.com',
      phoneNo: '1234567890',
      role_id: 1,
      address: 'drftg',
      customerId: 1,
      roleId: 1
    }
    const res = await client
      .post('/list-emp')
      .send(reqData)
      .expect(200)
  })
  it('invokes post users with incorrect data', async () => {
    const reqData = {
      firstName: 'Aditi',
      middleName: ' ',
      lastName: 'Singh',
      email: 'a@a.com',
      phoneNo: '12345678',
      role_id: 1,
      address: 'drftg',
      customerId: 1,
      roleId: 1
    }
    const res = await client
      .post('/list-emp')
      .send(reqData)
      .expect(422)
  })
})
