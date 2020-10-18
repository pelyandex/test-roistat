// тк телефон не будет являться числом - локальная сортировка подходит для обоих случаев
export function compareStrings (lsValue, rsValue, direction) {
  if (direction > 0) {
    return lsValue.localeCompare(rsValue)
  }
  return rsValue.localeCompare(lsValue)
}
