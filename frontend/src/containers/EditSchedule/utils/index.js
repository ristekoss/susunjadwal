import { getCourses } from "services/api"



export const generateScheduledCourseListFromSchedule = async (majorId, schedule) => {
    const { data: courses } = await getCourses(majorId);
    let result = [];
    let added = {};

    for (let i = 0; i < courses.courses.length; i++) {
        for (let j = 0; j < courses.courses[i].classes.length; j++) {
            for (let k = 0; k < schedule.schedule_items.length; k++) {
                if (schedule.schedule_items[k].name === courses.courses[i].classes[j].name) {
                    if (!added[courses.courses[i].classes[j].name]) {
                        result.push({ ...courses.courses[i].classes[j], credit: courses.courses[i].credit, parentName: courses.courses[i].name, term: courses.courses[i].term, name: courses.courses[i].classes[j].name });
                        added[courses.courses[i].classes[j].name] = 1;
                    }
                }
            }
        }
    }


    return result;
}