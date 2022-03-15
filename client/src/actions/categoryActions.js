import axios from 'axios'
import { 
  CATEGORY_LIST_REQUEST, 
  CATEGORY_LIST_SUCCESS, 
  CATEGORY_LIST_FAIL, 
  CATEGORY_DETAIL_REQUEST, 
  CATEGORY_DETAIL_SUCCESS, 
  CATEGORY_DETAIL_FAIL 
} from './../constants/categoryConstants';

export const listCategory = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST })

    const { data } = await axios.get("http://localhost:5000/api/category")

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error
    })
  }
}

export const detailCategory = (slug) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAIL_REQUEST })

    const { data } = await axios.get(`http://localhost:5000/api/category/${slug}`)

    dispatch({
      type: CATEGORY_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAIL_FAIL,
      payload: error
    })
  }
}