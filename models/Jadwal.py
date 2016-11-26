from mongoengine import *
from datetime import datetime

class JadwalData(EmbeddedDocument):
	name = StringField()
	day = StringField()
	room = StringField()
	start = StringField()
	end = StringField()

	def serialize(self):
		return {
			'name': self.name,
			'day': self.day,
			'room': self.room,
			'start': self.start,
			'end': self.end
		}
	
class Jadwal(Document):
	user_id = ReferenceField('User')
	jadwals = ListField(EmbeddedDocumentField(JadwalData))
	primary = BooleanField()
	deleted = BooleanField()
	private = BooleanField()
	created_at = DateTimeField(default=datetime.now)

	def add_jadwal(self, **kwargs):
		data = JadwalData(**kwargs)
		self.jadwals.append(data)
		return data

	def get_jadwal(self):
		data = []
		for jadwal in self.jadwals:
			data.append(jadwal.serialize())
		return data

	def serialize(self):
		return {
			'id': str(self.id),
			'utama': self.primary,
			'created_at': self.created_at
		}