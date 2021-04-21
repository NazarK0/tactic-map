import ErrorInterface from '../../shared/types/error.interface';
import VMenuItemInterface from '../../shared/types/vmenuItem.interface'

export default interface DSG_TogglerState {
  isLoading: boolean;
  error: ErrorInterface | null;
  data: VMenuItemInterface[] | null;
}
