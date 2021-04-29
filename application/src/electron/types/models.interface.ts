import { Model, ModelDefined } from "sequelize/types";
import DSG_Attributes from "./dsg.attributes";
import DSG_CreationAttributes from "./dsgCreation.attributes";
import DSG_SignAttributes from "./dsgSign.attributes";
import DSG_SignCreationAttributes from "./dsgSignCreation.attributes";
import USG_Attributes from "./usg.attributes";
import USG_CreationAttributes from "./usgCreation.attributes";

export default interface ModelsInterface {
    userSignGroup: ModelDefined<USG_Attributes, USG_CreationAttributes>,
    defaultSignGroup:  ModelDefined<DSG_Attributes, DSG_CreationAttributes>,
    dsgSign: ModelDefined<DSG_SignAttributes, DSG_SignCreationAttributes>
}