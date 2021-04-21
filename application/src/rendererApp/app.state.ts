import DSG_AddSignState from "./defaultSignGroup/types/dsgAddSign.state";
import DSG_CreateState from "./defaultSignGroup/types/dsgCreate.state";
import DSG_EditState from "./defaultSignGroup/types/dsgEdit.state";
import DSG_EditSignState from "./defaultSignGroup/types/dsgEditSign.state";
import DSG_PageState from "./defaultSignGroup/types/dsgPage.state";
import DSG_SignFormState from './defaultSignGroup/types/dsgSignForm.state';
import DSG_TogglerState from "./defaultSignGroup/types/dsgToggler.state";
import CanvasState from './mainPage/types/canvas.state';
import LeftToolbarState from "./mainPage/types/leftToolbar.state";
import UploadMapState from './mainPage/types/uploadMap.state';
import USG_AddSignState from "./userSignGroup/types/usgAddSign.state";
import USG_CreateState from "./userSignGroup/types/usgCreate.state";
import USG_EditState from "./userSignGroup/types/usgEdit.state";
import USG_EditSignState from "./userSignGroup/types/usgEditSign.state";
import USG_PageState from "./userSignGroup/types/usgPage.state";
import USG_SignFormState from './userSignGroup/types/usgSignForm.state';
import USG_TogglerState from "./userSignGroup/types/usgToggler.state";
import AddSignsPageState from './usgAddSigns/types/addSignsPage.state';
import AddSignsTogglerState from "./usgAddSigns/types/addSignsToggler.state";

export default interface AppState {
  dsgCreate: DSG_CreateState;
  dsgEdit: DSG_EditState;
  dsgPage: DSG_PageState;
  dsgToggler: DSG_TogglerState;
  dsgAddSign: DSG_AddSignState;
  dsgEditSign: DSG_EditSignState;
  dsgSignForm: DSG_SignFormState;

  usgCreate: USG_CreateState;
  usgEdit: USG_EditState;
  usgPage: USG_PageState;
  usgToggler: USG_TogglerState;
  usgAddSign: USG_AddSignState;
  usgEditSign: USG_EditSignState;
  usgSignForm: USG_SignFormState;

  addSignsPage: AddSignsPageState;
  addSignsToggler: AddSignsTogglerState;

  leftToolbar: LeftToolbarState;
  uploadMap: UploadMapState;
  canvas: CanvasState;
}