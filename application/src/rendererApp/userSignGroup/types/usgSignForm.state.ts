import ErrorInterface from '../../shared/types/error.interface';

export default interface USG_SignFormState {
  isUploading: boolean;
  error: ErrorInterface | null;
  imageUrl: string | null;
}
