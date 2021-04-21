import ErrorInterface from '../../shared/types/error.interface';

export default interface UploadMapState {
  isSubmitting: boolean;
  error: ErrorInterface | null;
}
