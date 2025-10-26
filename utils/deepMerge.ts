/**
 * Faz merge profundo (deep merge) de dois objetos sem perder campos do destino.
 * Valores do usuário (source) sempre têm prioridade sobre os defaults (target).
 */
export function deepMerge<T>(target: T, source: Partial<T>): T {
  if (typeof target !== 'object' || target === null) return source as T;
  if (typeof source !== 'object' || source === null) return target;

  const result: any = Array.isArray(target) ? [...target] : { ...target };

  for (const key of Object.keys(source)) {
    const srcVal = (source as any)[key];
    const tgtVal = (target as any)[key];

    if (Array.isArray(srcVal)) {
      result[key] = srcVal; // arrays do usuário substituem
    } else if (typeof srcVal === 'object' && srcVal !== null) {
      result[key] = deepMerge(tgtVal ?? {}, srcVal);
    } else if (srcVal !== undefined) {
      result[key] = srcVal;
    }
  }

  return result;
}
