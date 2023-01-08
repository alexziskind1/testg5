import { PublishingScheduleItem } from '../models/publishing-schedule-item.model';


export function publishingScheduleItemFromPublishingSchdule_2(
  si: Queries.CoursesJsonPublishingSchedule
): PublishingScheduleItem {
  return {
    publishingScheduleItemId: si.publishingScheduleItemId,
    date: new Date(si.date)
  };
}
