import ToolGroupInterface from "src/rendererApp/shared/types/toolGroup.interface";
import MilSignResInterface from "./milSignRes.interface";

export default interface ToolGroupWithStateInterface extends ToolGroupInterface {
  isSelected: boolean;
  selectedTool: MilSignResInterface | null;
}