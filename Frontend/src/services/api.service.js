import axios from 'axios'

import JwtService from './jwt.service'

const getHeader = () => {
  const token = JwtService.getToken()
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `JWT ${token}` || '',
      Accept: 'application/json',
    },
  }
}
export const getRequestHeader = getHeader

const formatErrors = (errors) => {
  const serverError = ['Oops something went wrong!']
  const error = errors.error.response.data
  if (error && error.length > 0) {
    return [error]
  }
  if (error && error.statusCode >= 400) {
    return error.message
  }
  if (error && (error.status === 403 || error.status === 401)) {
    window.location.reload()
  }
  const err = error.error
  if (err && err.error_params && err.error_params.length > 0) {
    errors = err.error_params.map((e) => e.msg)
    return errors || serverError
  }
  if (err && err.errors && err.errors.length > 0) {
    return [err.errors] || serverError
  }
  if (err && err.error && err.error.length > 0) {
    return [err.error] || serverError
  }
  return serverError
}

const unAuthorized = (err) => {
  if (
    err.response &&
    (err.response.status === 401 || err.response.status === 403)
  ) {
    JwtService.clearToken()
    window.location.href = '/'
  }
}

export const post = async (url, data) => {
  try {
    return await axios.post(url, data, getHeader())
  } catch (error) {
    unAuthorized(error)
    throw formatErrors({error})
  }
}

export const put = async (url, data) => {
  try {
    return await axios.put(url, data, getHeader())
  } catch (error) {
    unAuthorized(error)
    throw formatErrors({error})
  }
}
export const httpDelete = async (url) => {
  try {
    return await axios.delete(url, getHeader())
  } catch (error) {
    unAuthorized(error)
    throw formatErrors({error})
  }
}

export const mediaPut = async (url, data, headers) => {
  try {
    return await axios.put(url, data, {...headers})
  } catch (error) {
    unAuthorized(error)
    throw formatErrors({error})
  }
}

export const get = async (url, queryData) => {
  try {
    const config = getHeader()
    config.params = queryData
    return await axios.get(url, config)
  } catch (error) {
    unAuthorized(error)
    throw formatErrors({error})
  }
}

export const customPost = async (url, data, customHeaders = {}) => {
  try {
    const headers = getHeader()
    return await axios.post(url, data, {...headers, ...customHeaders})
  } catch (error) {
    throw formatErrors({error})
  }
}
