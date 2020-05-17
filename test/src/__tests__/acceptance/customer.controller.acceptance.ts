import {Client, expect} from "@loopback/testlab";
import {TestApplication} from '../..';
import {setupApplication} from './test-helper';

describe('CustomerControllerController', () => {
  let app: TestApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes Post Customers with empty data', async () => {
    const reqData = {
      name: 'flipkart',
      address: 'www.flipkart.com',
      description: 'tfvhbj'
    }
    const res = await client
      .post('/list-cust')
      .send(reqData)
      .expect(422)

    expect(res).to.have.property('error')
  });

  it('invokes post Customer with wrong or incomplete data', async () => {
    const reqData = {
      name: "flipart",
      description: 'drfg'
    }
    const res = await client
      .post('/list-cust')
      .send(reqData)
      .expect(422)

    expect(res).to.have.property('error')
  });
  it('invokes get customers', async () => {
    const res = await client
      .get('list-cust')
      .expect(200)
  })

});
