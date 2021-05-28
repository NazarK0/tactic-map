import MilSignReqInterface from "./milSignReq.interface";
import SelectedToolTypes from "./selectedToolTypes.enum";

export default interface MilSignResInterface extends MilSignReqInterface {
  width: number;
  height: number;
}