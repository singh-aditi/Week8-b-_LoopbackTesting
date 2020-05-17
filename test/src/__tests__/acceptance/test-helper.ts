import {Client, createRestAppClient, givenHttpServerConfig} from '@loopback/testlab';
import {TestApplication} from '../..';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new TestApplication({
    rest: restConfig, //type HTTPServer application; which creates a new http-server where you can define new port and host
  });

  await app.boot(); // justs boots the app with Bootstrap application

  app.bind('datasources.config.pgdb').to({
    name: 'pgdb',
    connector: 'memory', // in-memory db
  });
  //binds the datasource pgdb with
  await app.start();

  const client = createRestAppClient(app); // cretes a client which runs a RESTApplication instance i.e. app

  return {app, client};
}

export interface AppWithClient {
  app: TestApplication;
  client: Client;
}
