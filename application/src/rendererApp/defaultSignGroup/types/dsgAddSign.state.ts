import ErrorInterface from '../../shared/types/error.interface';

export default interface DSG_AddSignState {
  isSubmitting: boolean;
  error: ErrorInterface | null;
}
