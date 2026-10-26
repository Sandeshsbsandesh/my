export function publicUrl(file: string) {
  return `${import.meta.env.BASE_URL}${file.replace(/^\//, "")}`
}
