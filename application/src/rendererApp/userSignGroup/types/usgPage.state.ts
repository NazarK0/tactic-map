import USG_Interface from '../../shared/types/usg.interface';
import ErrorInterface from '../../shared/types/error.interface';

export default interface USG_PageState {
  isLoading: boolean;
  error: ErrorInterface | null;
  data: USG_Interface | null;
}
