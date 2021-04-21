import ErrorInterface from '../../../types/error.interface';
import MenuItemInterface from '../../../types/menuItem.interface';

export default interface VerticalMenuStateInterface {
  isLoading: boolean;
  errors: ErrorInterface | null;
  data: MenuItemInterface[] | null;
}