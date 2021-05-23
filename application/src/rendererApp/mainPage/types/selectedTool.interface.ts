import MilSignReqInterface from "./milSignReq.interface";
import MilSignResInterface from "./milSignRes.interface";
import SelectedToolTypes from "./selectedToolTypes.enum";

export default interface SelectedToolInterface {
    tool: MilSignResInterface;
    type: SelectedToolTypes;
}