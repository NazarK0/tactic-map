import USG_Interface from "../../shared/types/usg.interface";
import MilSignReqInterface from './milSignReq.interface';

export default interface USG_WithStateInterface extends USG_Interface {
  isSelected: boolean;
  selectedSign: MilSignReqInterface | null;
}