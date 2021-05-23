import MilSignReqInterface from "./milSignReq.interface";
import SelectedToolTypes from "./selectedToolTypes.enum";

export default interface MilSignResInterface extends MilSignReqInterface {
  svgSrc: string;
}