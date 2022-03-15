import {
  CATEGORY_LIST_REQUEST, 
  CATEGORY_LIST_SUCCESS, 
  CATEGORY_LIST_FAIL, 
  CATEGORY_DETAIL_REQUEST, 
  CATEGORY_DETAIL_FAIL,
  CATEGORY_DETAIL_SUCCESS
} from '../constants/categoryConstants'

export const categoryListReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, ...state }
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        category: action.payload
      }
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload.error }
    default:
      return state
  }
}

export const categoryDetailReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DETAIL_REQUEST:
      return { loading: true, ...state }
    case CATEGORY_DETAIL_SUCCESS:
      return {
        loading: false,
        category: action.payload
      }
    case CATEGORY_DETAIL_FAIL:
      return { loading: false, error: action.payload.error }
    default:
      return state
  }
}