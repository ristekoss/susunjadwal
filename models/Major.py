from mongoengine import *

class Jadwal(EmbeddedDocument):
	day = StringField()
	start = StringField()
	end = StringField()
	room = StringField()

	def serialize(self):
		return {
			'day': self.day,
			'start': self.start,
			'end': self.end,
			'room': self.room,
		}

class Class(EmbeddedDocument):
	name = StringField()
	jadwal = ListField(EmbeddedDocumentField(Jadwal))
	lecturer = ListField(StringField())

	def create_jadwal(self, **kwargs):
		jadwal = Jadwal(**kwargs)
		self.jadwal.append(jadwal)
		return jadwal

	def __get_jadwal(self):
		data = []
		for j in self.jadwal:
			data.append(j.serialize())
		return data

	def serialize(self):
		return {
			'name': self.name,
			'jadwal': self.__get_jadwal(),
			'lecturer': self.lecturer
		}

class Course(EmbeddedDocument):
	name = StringField()
	sks = IntField()
	term = IntField()
	classes = ListField(EmbeddedDocumentField(Class))

	def create_class(self, name, lecturer):
		print lecturer
		class_ = Class(name=name, lecturer=lecturer)
		self.classes.append(class_)
		return class_

	def __get_classes(self):
		data = []
		for class_ in self.classes:
			data.append(class_.serialize())
		return data

	def serialize(self):
		return {
			'name': self.name,
			'sks': self.sks,
			'term': self.term,
			'class': self.__get_classes()
		}

class Major(Document):
	name = StringField()
	courses = ListField(EmbeddedDocumentField(Course))

	def create_course(self, name, sks, term):
		course = Course(name=name, sks=sks, term=term)
		self.courses.append(course)
		return course

	def get_course(self):
		data = []
		for course in self.courses:
			data.append(course.serialize())
		return {
			'courses': data
		}
