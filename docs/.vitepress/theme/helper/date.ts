export function getNowDate() {
  return formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
}

export function formatDate(d: any, fmt = "yyyy-MM-dd hh:mm:ss") {
  if (!(d instanceof Date)) {
    d = new Date(d);
  }
  const o: any = {
    "M+": d.getMonth() + 1, // 月份
    "d+": d.getDate(), // 日
    "h+": d.getHours(), // 小时
    "m+": d.getMinutes(), // 分
    "s+": d.getSeconds(), // 秒
    "q+": Math.floor((d.getMonth() + 3) / 3), // 季度
    S: d.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${d.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
  }
  return fmt;
}

export function formatShowDate(date: Date | string) {
  const source = +new Date(date);
  const now = +new Date();
  const diff = now - source;
  const oneSeconds = 1000;
  const oneMinute = oneSeconds * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneWeek = oneDay * 7;
  if (diff < oneMinute) {
    return `${Math.floor(diff / oneSeconds)}秒前`;
  }
  if (diff < oneHour) {
    return `${Math.floor(diff / oneMinute)}分钟前`;
  }
  if (diff < oneDay) {
    return `${Math.floor(diff / oneHour)}小时前`;
  }
  if (diff < oneWeek) {
    return `${Math.floor(diff / oneDay)}天前`;
  }

  return formatDate(new Date(date), "yyyy-MM-dd");
}

/**
 * 获取两个日期相差多少天
 */
export function dayDiff(startDate: string, endDate?: string): number {
  const startTimestamp = new Date(startDate).getTime();
  const endTimestamp = endDate ? new Date(endDate).getTime() : new Date().getTime();

  return Math.floor(Math.abs(endTimestamp - startTimestamp) / (1000 * 60 * 60 * 24));
}

/**
 * 计算相差多少年/月/日/时/分/秒
 */
export function timeDiff(startDate: Date | string, endDate?: Date | string): string {
  if (!endDate) {
    endDate = startDate;
    startDate = new Date();
  }
  if (!(startDate instanceof Date)) {
    startDate = new Date(startDate);
  }
  if (!(endDate instanceof Date)) {
    endDate = new Date(endDate);
  }

  // 计算时间戳的差
  const diffValue = Math.abs(endDate.getTime() - startDate.getTime()) / 1000;

  if (diffValue < 60) {
    return "刚刚";
  } else if (diffValue < 3600) {
    return `${Math.floor(diffValue / 60)} 分钟前`;
  } else if (diffValue < 86400) {
    return `${Math.floor(diffValue / 3600)} 小时前`;
  } else if (diffValue < 2592000) {
    return `${Math.floor(diffValue / 86400)} 天前`;
  } else if (diffValue < 31104000) {
    const months = Math.floor(diffValue / 2592000);
    return `${months} 月前`;
  } else {
    const years = Math.floor(diffValue / 31104000);
    return `${years} 年前`;
  }
}
