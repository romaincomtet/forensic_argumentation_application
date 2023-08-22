export default function makeParamsInternal<T>(params: T): T & { provider: undefined } {
  return { ...params, provider: undefined, ability: undefined, rules: undefined }
}
