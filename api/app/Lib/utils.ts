export const handleMedicineRecurrence = (recurrenceMessage) => {
  const recurrenceHashTable = {
    'Uma vez ao dia': '1',
    'Duas vezes ao dia': '2',
    'Três vezes ao dia': '3',
    'Quatro vezes ao dia': '4',
    'Cinco vezes ao dia': '5',
  }

  return recurrenceHashTable[recurrenceMessage]
}

export const handleUniqueValue = (originalArray) => {
  let seen = {}
  return originalArray.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true)
  })
}
