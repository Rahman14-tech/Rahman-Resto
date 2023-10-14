export const isLessThanTheMB = (fileSize: number, smallerThanSizeMB: number) => {
   const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
   return isOk
}