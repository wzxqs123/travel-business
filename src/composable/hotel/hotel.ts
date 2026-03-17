import useFetch from "@/fetch/use-fetch";
import { Result } from "@/types/fetch";
import { PageResult } from "@/types/page";
import {
  HotCityRes,
  SuggestRes,
  HotelSuggestQuery,
  HotelSearchRes,
  HotelBaseList,
  HotelQuoteQuery,
  HotelQuoteRes,
  HotelDetailRes,
  RatePlanQuoteQuery,
  RatePriceList,
} from "./hotel.d";
import { BUSINESS_GATEWAY } from "../constant";

const fetch = useFetch();
export const useHotel = () => {
  // 获取热门城市列表
  const getHotCityList = () => {
    return fetch.get<PageResult<HotCityRes>>(
      `/app/${BUSINESS_GATEWAY}/query/b2b/hot-city/list`
    );
  };

  // 获取城市搜索建议
  const getCitySuggest = (params: { keyword: string }) => {
    return fetch.post<PageResult<SuggestRes>>(
      `/app/${BUSINESS_GATEWAY}/query/b2b/city/suggest`,
      params
    );
  };

  // 获取酒店搜索建议
  const getHotelSuggest = (params: HotelSuggestQuery) => {
    return fetch.post<PageResult<SuggestRes>>(
      `/app/${BUSINESS_GATEWAY}/query/b2b/hotel/suggest`,
      params
    );
  };

  // 获取推荐酒店列表
  const getSuggestHotelList = () => {
    return fetch.get<PageResult<HotelBaseList>>(
      `/app/${BUSINESS_GATEWAY}/query/b2b/suggest-hotel/list`
    );
  };

  // 搜索B2B酒店静态信息
  const getHotelSearch = (params: HotelSuggestQuery) => {
    return fetch.post<Result<HotelSearchRes>>(
      `/app/${BUSINESS_GATEWAY}/query/b2b/hotel/search`,
      params
    );
  };

  // 查询B2B酒店优选报价
  const getHotelQuote = (params: HotelQuoteQuery) => {
    return fetch.post<PageResult<RatePriceList>>(
      `/app/${BUSINESS_GATEWAY}/query/b2b/hotel/quote`,
      params
    );
  };

  // 查询酒店详情静态信息
  const getHotelDetail = (params: { b2bHotelId: string }) => {
    return fetch.get<Result<HotelDetailRes>>(
      `/app/${BUSINESS_GATEWAY}/query/b2b/hotel-detail/get`,
      {
        params,
      }
    );
  };

  // 查询B2B RatePlan优选报价
  const getRatePlanQuote = (params: RatePlanQuoteQuery) => {
    return fetch.post<Result<HotelQuoteRes>>(
      `/app/${BUSINESS_GATEWAY}/query/b2b/rateplan/quote`,
      params
    );
  };

  return {
    getHotCityList,
    getCitySuggest,
    getHotelSuggest,
    getSuggestHotelList,
    getHotelSearch,
    getHotelQuote,
    getHotelDetail,
    getRatePlanQuote,
  };
};
