class DateRange {
  dateFrom: Date;
  dateTo: Date;

  constructor(dateFrom: Date, dateTo: Date) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }

  public static weekWithOffset(weekOffset: number): DateRange {
    const daysOffset = weekOffset * 7;
    const dateNow = new Date();
    const monday = new Date(dateNow.setDate(dateNow.getDate() - dateNow.getDay() + 1 + daysOffset));
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(dateNow.setDate(monday.getDate() + 6));
    sunday.setHours(23, 59, 59, 999);
    return new DateRange(monday, sunday);
  }
}

export default DateRange;