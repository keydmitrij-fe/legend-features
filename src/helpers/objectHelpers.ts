export const getChangedFields = <T>(newData: T, oldData: T): Partial<T> => {
  const changedFields: Partial<T> = {}

  for (const key in newData) {
    if (newData[key] !== oldData[key]) {
      changedFields[key] = newData[key]
    }
  }

  return changedFields
}
