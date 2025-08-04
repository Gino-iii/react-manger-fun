export default {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return null
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}
