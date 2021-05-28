import { Model, ModelDefined } from "sequelize/types";
import DSG_Attributes from "./dsg.attributes";
import DSG_CreationAttributes from "./dsgCreation.attributes";
import ToolAttributes from "./tool.attributes";
import DSG_SignAttributes from "./tool.attributes";
import ToolCreationAttributes from "./toolCreation.attributes";
import DSG_SignCreationAttributes from "./toolCreation.attributes";
import USG_Attributes from "./usg.attributes";
import USG_CreationAttributes from "./usgCreation.attributes";

export default interface ModelsInterface {
    userSignGroup: ModelDefined<USG_Attributes, USG_CreationAttributes>,
    defaultSignGroup:  ModelDefined<DSG_Attributes, DSG_CreationAttributes>,
    tool: ModelDefined<ToolAttributes, ToolCreationAttributes>
}