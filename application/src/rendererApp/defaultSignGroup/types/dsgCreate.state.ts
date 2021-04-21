import ErrorInterface from '../../shared/types/error.interface';

export default interface DSG_CreateState {
  isSubmitting: boolean;
  error: ErrorInterface | null;
}
