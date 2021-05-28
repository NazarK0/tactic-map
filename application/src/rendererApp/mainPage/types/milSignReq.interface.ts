import SelectedToolTypes from "./selectedToolTypes.enum";

export default interface MilSignReqInterface {
  usgId: number;
  signId: number;
  url: string;
  type: SelectedToolTypes;
}