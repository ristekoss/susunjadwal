import mongoengine as mongo


class ScheduleItem(mongo.EmbeddedDocument):
    day = mongo.StringField()
    start = mongo.StringField()
    end = mongo.StringField()
    room = mongo.StringField()

    def serialize(self):
        return {
            "day": self.day,
            "start": self.start,
            "end": self.end,
            "room": self.room
        }


class Class(mongo.EmbeddedDocument):
    name = mongo.StringField()
    schedule_items = mongo.ListField(mongo.EmbeddedDocumentField(ScheduleItem))
    lecturer = mongo.ListField(mongo.StringField())

    def __get_schedule_items(self):
        data = []
        for item in self.schedule_items:
            data.append(item.serialize())
        return data

    def serialize(self):
        return {
            "name": self.name,
            "lecturer": self.lecturer,
            "schedule_items": self.__get_schedule_items()
        }


class Course(mongo.EmbeddedDocument):
    name = mongo.StringField()
    credit = mongo.IntField()
    term = mongo.IntField()
    classes = mongo.ListField(mongo.EmbeddedDocumentField(Class))

    def __get_classes(self):
        data = []
        for class_ in self.classes:
            data.append(class_.serialize())
        return data

    def serialize(self):
        return {
            "name": self.name,
            "credit": self.credit,
            "term": self.term,
            "classes": self.__get_classes()
        }


class Major(mongo.Document):
    name = mongo.StringField()
    courses = mongo.ListField(mongo.EmbeddedDocumentField(Course))

    def create_course(self, name, credit, term):
        course = Course(name=name, credit=credit, term=term)
        self.courses.append(course)
        return course

    def __get_courses(self):
        data = []
        for course in self.courses:
            data.append(course.serialize())

        return data

    def serialize(self):
        return {
            "name": self.name,
            "courses": self.__get_courses()
        }
