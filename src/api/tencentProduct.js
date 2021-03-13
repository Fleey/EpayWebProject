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


/**
 * 获取收款账号商品列表
 * @param tacid
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getProductAccount = ({tacid}) => request.get(`/management/payPlugins/tencentPay/product/account?tacid=${tacid}`)

/**
 * 添加商品收款账号
 * @param productid
 * @param zoneid
 * @param tacid
 * @returns {Promise<AxiosResponse<any>>}
 */
export const addProductAccount = ({
                                      productid,
                                      zoneid,
                                      tacid
                                  }) => request.post(`/management/payPlugins/tencentPay/product/${productid}/zone/${zoneid}/account`, {tacid: tacid})


/**
 * 删除商品收款账号
 * @param productid
 * @param zoneid
 * @param tacid
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteProductAccount = ({
                                         productid,
                                         zoneid,
                                         tacid
                                     }) => request.delete(`/management/payPlugins/tencentPay/product/${productid}/zone/${zoneid}/account`, {
    data: {
        tacid: tacid
    }
})