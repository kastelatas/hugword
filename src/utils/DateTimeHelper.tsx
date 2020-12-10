export function convertFromTimeStampToDate(ts) {
  return new Date(ts * 1000).toLocaleString('en-US', {hour: '2-digit', minute:'2-digit'})
}

export function convertFromTimeStampToDateWithoutTime(ts) {
  return new Date(ts * 1000).toLocaleDateString()
}

export function convertFromTimeStampToDateFullDate(ts) {
  return new Date(ts * 1000).toLocaleString('en-US', )
}