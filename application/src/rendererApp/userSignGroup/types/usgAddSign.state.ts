import ErrorInterface from '../../shared/types/error.interface';

export default interface USG_AddSignState {
  isSubmitting: boolean;
  error: ErrorInterface | null;
}
