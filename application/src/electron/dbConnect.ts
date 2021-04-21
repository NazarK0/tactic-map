import modelsInit from './models';
import { Sequelize } from 'sequelize';

// const dbConnect = new Sequelize({
//     dialect: 'sqlite',
//     storage: '../../test.db'
//   });

// export function testConnection() {
//   try {
//     dbConnect.authenticate()
//       .then(() => {
//         console.log('Connection has been established successfully.');
//       });
//   } catch (error) {
//       console.error('Unable to connect to the database:', error);
//   }
// }

// export function syncModels() {
//   dbConnect.sync({ force: true })
//     .then(() => console.log('db models synchronization complete.'));
// }

// export function disconnect() {
//   dbConnect.close()
//     .then(() => console.log('db connection closed.'));
// }
  

export default class DbConnect {
  private seqelize: Sequelize;

  constructor(pahtToDb: string) {
    this.seqelize = new Sequelize({
      dialect: 'sqlite',
      storage: pahtToDb
    });
  }

  get instance() {
    return this.seqelize;
  }

  testConnection() {
    try {
      this.seqelize.authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
  }

  initModels() {
    modelsInit(this.seqelize);
  }

  syncModels() {
    this.seqelize.sync({ alter: true })
      .then(() => console.log('db models synchronization complete.'));
  }

  disconnect() {
    this.seqelize.close()
      .then(() => console.log('db connection closed.'));
  }

}