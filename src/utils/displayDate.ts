export function displayDate(data: string): string {
  const date = new Date(parseInt(data));
  const dateNow = new Date();
  const year = dateNow.getFullYear() - date.getFullYear();
  if (year === 0) {
    const day = dateNow.getDay() - date.getDay();
    if (day === 0) {
      const hours = dateNow.getHours() - date.getHours();
      if (hours === 0) {
        const minutes = dateNow.getMinutes() - date.getMinutes();
        if (minutes < 5) return "1 минуту назад";
        if (minutes >= 5 && minutes < 10) return "5 минут назад";
        if (minutes >= 10 && minutes < 30) return "10 минут назад";
        return "30 минут назад";
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    }
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
    })}`;
  }
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}
