enum IpcMessage {
  UploadSigns = 'upload-signs',
  DSG_Create = 'dsg-create-message',
  DSG_Update = 'dsg-update-message',
  DSG_GetById = 'dsg-getById-message',
  DSG_DeleteById = 'dsg-deleteById-message',
  DSG_DeleteSignById = 'dsg-deleteSignById-message',
  DSG_GetList = 'dsg-getList-message',
  DSG_GetMenu = 'dsg-getMenu-message',
  DSG_AddSign = 'dsg-addSign-message',
  DSG_GetSign = 'dsg-getSign-message',
  DSG_EditSign = 'dsg-editSign-message',
  DSG_UploadImage = 'dsg-uploadImage-message',
  DSG_GetSignsList = 'dsg-getSignsList-message',

  USG_Create = 'usg-create-message',
  USG_Update = 'usg-update-message',
  USG_GetById = 'usg-getById-message',
  USG_DeleteById = 'usg-deleteById-message',
  USG_DeleteSignById = 'usg-deleteSignById-message',
  USG_GetList = 'usg-getList-message',
  USG_GetMenu = 'usg-getMenu-message',
  USG_AddSign = 'usg-addSign-message',
  USG_GetSign = 'usg-getSign-message',
  USG_EditSign = 'usg-editSign-message',
  USG_ToggleSignStatus = 'usg-toggleSignStatus-message',
  USG_UploadImage = 'usg-uploadImage-message',
  USG_GetSignsList = 'usg-getSignsList-message',

  uploadMap = 'uploadMap-message',
}

export default IpcMessage;