import request from "../utils/request";

/**
 * 获取QQ登陆二维码
 * @returns {Promise<AxiosResponse<{code,msg,data:{qrsig,imgData}}>>}
 */
export const getLoginQrCode = () => request.get('/management/payPlugins/tencentPay/qqLogin/getLoginQrCode')

/**
 * 检查QQ登陆二维码状态
 * @param qrsig
 * @returns {Promise<AxiosResponse<code,msg>>}
 */
export const checkQrCodeStatus = ({qrsig}) => request.get(`/management/payPlugins/tencentPay/qqLogin/checkQrCodeStatus?qrsig=${qrsig}`)

/**
 * 获取
 * @param uin
 * @param mchid
 * @param status
 * @param page
 * @param pagesize
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getQQLoginList = ({
                                   uin,
                                   mchid,
                                   status,
                                   page,
                                   pagesize
                               }) => request({
    url: `/management/payPlugins/tencentPay/qqLogin/list?uin=${uin}&mchid=${mchid}&status=${status}`, method: 'get'
})

/**
 * 删除qq账号
 * @param tacid
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteQQAccount = ({tacid}) => request.delete(`/management/payPlugins/tencentPay/qqLogin/${tacid}/delete`)

/**
 * 更新QQ账号备注信息
 * @param tacid
 * @param remark
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateQQAccountRemark = ({
                                          tacid,
                                          remark
                                      }) => request.patch(`/management/payPlugins/tencentPay/qqLogin/${tacid}/remark`, {remark: remark})

/**
 * 更新QQ账号mchid
 * @param tacid
 * @param mchid
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateQQAccountMchId = ({
                                         tacid,
                                         mchid
                                     }) => request.patch(`/management/payPlugins/tencentPay/qqLogin/${tacid}/mchid`, {mchid: mchid})