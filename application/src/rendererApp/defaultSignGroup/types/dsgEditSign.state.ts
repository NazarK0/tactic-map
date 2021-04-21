import DSG_SignInterface from '../../shared/types/dsgSign.interface';
import ErrorInterface from '../../shared/types/error.interface';

export default interface DSG_EditSignState {
  isSubmitting: boolean;
  isLoading: boolean;
  data: DSG_SignInterface | null;
  error: ErrorInterface | null;
}
