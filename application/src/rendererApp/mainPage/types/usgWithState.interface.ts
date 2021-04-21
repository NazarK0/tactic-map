import USG_Interface from "../../shared/types/usg.interface";
import SelectedMilSignInterface from './selectedMilSign.interface';

export default interface USG_WithStateInterface extends USG_Interface {
  isSelected: boolean;
  selectedSign: SelectedMilSignInterface | null;
}