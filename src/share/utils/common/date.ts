import type { ConfigType } from 'dayjs';
import dayjs from 'dayjs';

/**
 * 日期处理工具类
 */

/**
 * 分钟计算
 * @param date 初始的日期
 * @param delta 需要变化的日期
 * @returns
 */
export function addMinutes(date: ConfigType, delta = 0) {
  return dayjs(date).add(delta, 'minute');
}

/**
 * 小时计算
 * @param date 初始的日期
 * @param delta 需要变化的日期
 * @returns
 */
export function addHours(date: ConfigType, delta = 0) {
  return dayjs(date).add(delta, 'hour');
}

/**
 * 日期计算
 * @param date 初始的日期
 * @param delta 需要变化的日期
 * @returns
 */
export function addDays(date: ConfigType, delta = 0) {
  return dayjs(date).add(delta, 'day');
}

/**
 * 月份计算
 * @param date 初始的日期
 * @param delta 需要变化的月份
 * @returns
 */
export function addMonth(date: ConfigType, delta = 0) {
  return dayjs(date).add(delta, 'month');
}

/**
 * 年份计算
 * @param date 初始的日期
 * @param delta 需要变化的年份
 * @returns
 */
export function addYear(date: ConfigType, delta = 0) {
  return dayjs(date).add(delta, 'year');
}

/**
 * 对比年份是否一致
 * @param date 日期
 * @param values 日期列表
 * @returns
 */
export function equalsYear(date: ConfigType, ...values: ConfigType[]) {
  const base = dayjs(date);
  return values.every(value => dayjs(value).year() === base.year());
}

/**
 * 对比月份是否一致
 * @param date 日期
 * @param values 日期列表
 * @returns
 */
export function equalsMonth(date: ConfigType, ...values: ConfigType[]) {
  const base = dayjs(date);
  return values.every(value => dayjs(value).year() === base.year() && dayjs(value).month() === base.month());
}

/**
 * 对比月份是否一致
 * @param date 日期
 * @param values 日期列表
 * @returns
 */
export function equalsDay(date: ConfigType, ...values: ConfigType[]) {
  const base = dayjs(date);
  return values.every(
    value =>
      dayjs(value).year() === base.year() &&
      dayjs(value).month() === base.month() &&
      dayjs(value).date() === base.date()
  );
}

/**
 * 格式化时间
 * @param date
 * @param template
 * @returns
 */
export function format(date: ConfigType, template = 'YYYY-MM-DD HH:mm:sss') {
  return dayjs(date).format(template);
}

/**
 * 获取日期的开始时间
 * @param date
 * @returns
 */
export function getStartDay(date: ConfigType) {
  return dayjs(date).startOf('day');
}

/**
 * 获取日期的结束时间
 * @param date
 * @returns
 */
export function getEndDay(date: ConfigType) {
  return dayjs(date).endOf('day');
}

/**
 * 获取日期下的周日
 * @param date
 * @returns
 */
export function getStartWeek(date: ConfigType) {
  return dayjs(date).startOf('week');
}

/**
 * 获取日期下的周六
 * @param date
 * @returns
 */
export function getEndWeek(date: ConfigType) {
  return dayjs(date).endOf('week');
}

/**
 * 获取日期下的当月的第一天
 * @param date
 * @returns
 */
export function getStartMonth(date: ConfigType) {
  return dayjs(date).startOf('month');
}

/**
 * 获取日期下的当月的最后一天
 * @param date
 * @returns
 */
export function getEndMonth(date: ConfigType) {
  return dayjs(date).endOf('month');
}

/**
 * 获取日期下的当年的第一天
 * @param date
 * @returns
 */
export function getStartYear(date: ConfigType) {
  return dayjs(date).startOf('year');
}

/**
 * 获取日期下的当年的最后一天
 * @param date
 * @returns
 */
export function getEndYear(date: ConfigType) {
  return dayjs(date).endOf('year');
}
