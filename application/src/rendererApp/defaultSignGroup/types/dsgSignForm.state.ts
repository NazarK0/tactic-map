import ErrorInterface from '../../shared/types/error.interface';

export default interface DSG_SignFormState {
  isUploading: boolean;
  error: ErrorInterface | null;
  imageUrl: string | null;
}
