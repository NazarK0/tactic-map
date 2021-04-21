import DSG_SignInterface from '../../shared/types/dsgSign.interface';
import ErrorInterface from '../../shared/types/error.interface';

export default interface USG_EditSignState {
  isSubmitting: boolean;
  isLoading: boolean;
  data: DSG_SignInterface;
  error: ErrorInterface | null;
}
