import ErrorInterface from '../../shared/types/error.interface';

export default interface USG_CreateState {
  isSubmitting: boolean;
  error: ErrorInterface | null;
}
