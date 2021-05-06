import SelectedMilSignInterface from "./selectedMilSign.interface";
import SelectedToolTypes from "./selectedToolTypes.enum";

export default interface SelectedToolInterface {
    tool: SelectedMilSignInterface;
    type: SelectedToolTypes;
}