import ErrorInterface from '../../shared/types/error.interface';
import USG_Interface from '../../shared/types/usg.interface';

export default interface USG_EditState {
  isSubmitting: boolean;
  isLoading: boolean;
  error: ErrorInterface | null;
  data: USG_Interface | null;
}
