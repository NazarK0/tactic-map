enum CanvasActionTypes {
  GET_MAP = '[mainPage/canvas] Get Map',
  GET_MAP_SUCCESS = '[mainPage/canvas] Get Map success',
  GET_MAP_FAILURE = '[mainPage/canvas] Get Map failure',

  GET_SELECTED_TOOL = '[mainPage/canvas] Get selected tool',
  GET_SELECTED_TOOL_SUCCESS = '[mainPage/canvas] Get selected tool success',
  GET_SELECTED_TOOL_FAILURE = '[mainPage/canvas] Get selected tool failure',

  GET_SVG_SOURCE = '[mainPage/canvas] Get SVG source (string)',
  GET_SVG_SOURCE_SUCCESS = '[mainPage/canvas] Get SVG source success',
  GET_SVG_SOURCE_FAILURE = '[mainPage/canvas] Get SVG source failure',
}

export default CanvasActionTypes;
