import DSG_Interface from '../../shared/types/dsg.interface';
import ErrorInterface from '../../shared/types/error.interface';

export default interface DSG_PageState {
  isLoading: boolean;
  error: ErrorInterface | null;
  data: DSG_Interface | null;
}
