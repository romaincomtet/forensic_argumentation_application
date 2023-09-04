import { Paginated, Params } from "@feathersjs/feathers";

//
export async function fetchAllDataPaginated<T>(
  func: (params?: Params) => Promise<Paginated<T>>,
  baseQuery: Record<string, any>,
): Promise<T[]> {
  let page = 0;
  const pageSize = 100;
  let allData: T[] = [];
  let hasMoreData = true;

  while (hasMoreData) {
    const query = {
      ...baseQuery,
      $limit: pageSize,
      $skip: page * pageSize,
    };
    const result = await func({ query });

    if (result?.data) {
      allData = allData.concat(result.data);
    }

    if (!result?.data || result.data.length < pageSize) {
      hasMoreData = false;
    } else {
      page++;
    }
  }

  return allData;
}
