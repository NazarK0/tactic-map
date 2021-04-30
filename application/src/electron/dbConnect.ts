import { Sequelize } from 'sequelize';
import dsgModelInit from './entities/dsg/dsg.model';
import dsgSignModelsInit from './entities/dsg/dsgSign.model';
import usgModelInit from './entities/usg/usg.model';
import ModelsInterface from 'types/models.interface';

export default class DbConnect {
  private seqelize!: Sequelize;
  models: ModelsInterface;

  constructor(pahtToDb: string) {
    this.seqelize = new Sequelize({
      dialect: 'sqlite',
      storage: pahtToDb
    });

    this.models = {
      dsgSign: null,
      defaultSignGroup: null,
      userSignGroup: null
  };

    this.initModels();
    this.syncModels();
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

  private initModels() {
    this.models.dsgSign = dsgSignModelsInit(this.seqelize);
    this.models.defaultSignGroup = dsgModelInit(this.seqelize);
    this.models.userSignGroup = usgModelInit(this.seqelize);

    this.models.defaultSignGroup.hasMany(this.models.dsgSign, { onDelete: 'cascade', foreignKey: 'dsgFK' });
    this.models.userSignGroup.hasMany(this.models.dsgSign, { onDelete: 'set null', foreignKey: 'usgFK' });
    this.models.dsgSign.belongsTo(this.models.defaultSignGroup, { as: 'defaultSigns', foreignKey: 'dsgFK' });
    this.models.dsgSign.belongsTo(this.models.userSignGroup, { as: 'userSigns', foreignKey: 'usgFK' });
  }

  private syncModels() {
    this.seqelize.sync({ alter: true })
      .then(() => console.log('db models synchronization complete.'));
  }

  disconnect() {
    this.seqelize.close()
      .then(() => console.log('db connection closed.'));
  }
}