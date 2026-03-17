export interface FormQuery {
  contactInfo: ContactInfo;
  companyName: string;
  city: City;
  address: string;
  cooperationMode: string;
  businessLicenseNumber: string;
}

export interface City {
  cityId: string;
  cityName: string;
  provinceId: string;
  provinceName: string;
  locationCode: string;
}

export interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
}
/**
 * AdCodeProvinceDTO
 */
export interface AdCodeProvinceDTO {
  /**
   * 省名
   */
  fullName: string;
  /**
   * 省adCode
   */
  id: string;
  /**
   * 市级集合
   */
  subList?: AdCodeProvinceDTO[] | null;
}

/**
 * AdCodeCityDTO
 */
export interface AdCodeCityDTO {
  /**
   * 市名
   */
  fullName: string;
  /**
   * 市adCode
   */
  id: string;
  /**
   * 省名adCode
   */
  provinceFullName: string;
  /**
   * 省adCode
   */
  provinceId: string;
  /**
   * 区集合
   */
  subList: AdCodeDistrictDTO[] | null;
}

/**
 * AdCodeDistrictDTO
 */
export interface AdCodeDistrictDTO {
  /**
   * 市adCode
   */
  cityFullName: string;
  /**
   * 市adCode
   */
  cityId: string;
  /**
   * 区名
   */
  fullName: string;
  /**
   * 区adCode
   */
  id: string;
  /**
   * 省名adCode
   */
  provinceFullName: string;
  /**
   * 省adCode
   */
  provinceId: string;
}
