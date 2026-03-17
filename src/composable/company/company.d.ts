/**
 * B2bCompanyInfoVO
 */
export enum AccountStatus {
  IN_REVIEW = "0",
  NORMAL = "1",
  BAN = "2",
}
export interface B2BCompanyInfoVO {
  address: string;
  /**
   * 封禁信息
   */
  banRecode: BanRecordVO;
  businessLicenseNumber: string;
  city: B2BCityVO;
  companyName: string;
  contactInfo: B2BContactInfoVO;
  /**
   * 合作方式
   */
  cooperationMode: string;
  /**
   * id
   */
  id?: string;
  /**
   * 状态(0审核中/1正常/2封禁)
   */
  status?: string;
  [property: string]: any;
}

/**
 * 封禁信息
 *
 * BanRecordVO
 */
export interface BanRecordVO {
  /**
   * 封禁原因
   */
  banCause?: null | string;
  /**
   * 封禁结束时间
   */
  banDateEnd?: null | string;
  /**
   * 封禁天数 100年以上为永封
   */
  banTerm?: number | null;
  [property: string]: any;
}

/**
 * B2bCityVO
 */
export interface B2BCityVO {
  cityId: string;
  cityName: string;
  provinceId: string;
  provinceName: string;
  [property: string]: any;
}

/**
 * B2bContactInfoVO
 */
export interface B2BContactInfoVO {
  email: string;
  /**
   * 姓名
   */
  fullName: string;
  phone: string;
  [property: string]: any;
}
