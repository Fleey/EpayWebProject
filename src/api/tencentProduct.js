import request from "../utils/request";

/**
 * 获取商品列表
 * @param deviceType?
 * @param name?
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getProductList = ({
                                   deviceType,
                                   name
                               }) => request.get(`/management/payPlugins/tencentPay/product/list?deviceType=${deviceType}&name=${name}&pagesize=50`)

/**
 * 获取商品大区列表
 * @param productid
 * @param name
 * @param page
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getProductZoneList = ({
                                       productid,
                                       name,
                                       page
                                   }) => request.get(`/management/payPlugins/tencentPay/product/${productid}/zone/list?page=${page}&name=${name}&pagesize=50`)

/**
 * 获取商品大区角色
 * @param productId
 * @param zoneId
 * @param tacid
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getProductZoneRole = ({
                                       productId,
                                       zoneId,
                                       tacid
                                   }) => request.get(`/management/payPlugins/tencentPay/product/${productId}/zone/${zoneId}/role?tacid=${tacid}`)