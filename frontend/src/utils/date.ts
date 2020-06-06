export const getDateString = (dateString?: string): string => {
  if (!dateString) return ''

  const [year, month, day] = dateString.slice(0, 10).split('-')

  return `${year}-${month}-${day}`
}
