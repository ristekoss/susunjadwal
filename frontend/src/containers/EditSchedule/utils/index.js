import { getCourses } from "services/api"

const formatScheduleFromCourse = (courses, schedule) => {
    let savedSchedule = schedule;
    let result = [];
    let added = {};
    for (let i = 0; i < courses.courses.length; i++) {
        for (let j = 0; j < courses.courses[i].classes.length; j++) {
            for (let k = 0; k < schedule.schedule_items.length; k++) {
                if (schedule.schedule_items[k].name === courses.courses[i].classes[j].name) {
                    if (!added[courses.courses[i].classes[j].name]) {
                        // push the schedule to the result array
                        result.push({ ...courses.courses[i].classes[j], credit: courses.courses[i].credit, parentName: courses.courses[i].name, term: courses.courses[i].term, name: courses.courses[i].classes[j].name });
                        // remove the schedule from savedSchedule
                        savedSchedule.schedule_items = savedSchedule.schedule_items.filter(sched => sched.name !== courses.courses[i].classes[j].name)
                        added[courses.courses[i].classes[j].name] = 1;
                    }
                }
            }
        }
    }
    return [result, savedSchedule];
}


export const generateScheduledCourseListFromSchedule = async (majorId, schedule) => {
    const { data: courses } = await getCourses(majorId);
    // copy of schedule
    let [formattedSchedule, remainingSchedule] = formatScheduleFromCourse(courses, schedule);
    remainingSchedule.schedule_items.forEach(sched => {
        formattedSchedule.push({ parentName: `__agenda-${sched.name}`, term: 0, credit: 0, name: sched.name, schedule_items: [sched] })
    })
    return formattedSchedule;
}