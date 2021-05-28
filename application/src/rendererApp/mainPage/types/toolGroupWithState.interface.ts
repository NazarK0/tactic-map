import USG_Interface from "../../shared/types/usg.interface";
import MilSignResInterface from "./milSignRes.interface";

export default interface ToolGroupWithStateInterface extends USG_Interface {
  isSelected: boolean;
  selectedTool: MilSignResInterface | null;
}