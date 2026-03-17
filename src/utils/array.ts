// 将一维数组，切成指定长度的二维数组
export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    let chunk: T[] = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
};
