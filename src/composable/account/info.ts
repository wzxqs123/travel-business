export interface UserInfo {
  userId: string;
  orginfo: string;
  phone: string;
  ext: EXT;
}
export interface EXT {
  userInfo: UserInfoItem;
}

export interface UserInfoItem {
  id: string;
  username: string;
  nickname: string;
  name: string;
  phone: string;
  email: string;
  profilePhoto: string;
  gender: string;
  remark: string;
}
export interface CustomerDetailVO {
  /**
   * 描述
   */
  description: string;
  /**
   * 联系手机
   */
  phone: string;
  /**
   * 联系电话座机
   */
  tel: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 微信二维码
   */
  wechatQrCodeUrl: string;
  /**
   * 企业微信二维码
   */
  weworkQrCodeUrl: string;
  /**
   * 邮箱
   */
  email: string;
}
