/*
 * @Author: Czy
 * @Date: 2025-02-07 11:17:07
 * @FilePath: /b2b-official-website/src/composable/open-api/open-api.d.ts
 *
 */
/**
 * OpenClientDTO
 */
export interface OpenClientDTO {
  apiId?: string;
  bizCode?: string;
  enableStatus?: number;
  lastUseTime?: string;
  secretStatus?: number;
  secret?: string;
  [property: string]: any;
}
