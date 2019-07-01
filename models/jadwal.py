import mongoengine as mongo
from datetime import datetime


class JadwalData(mongo.Document):
    name = mongo.StringField()
    day = mongo.StringField()
    room = mongo.StringField()
    start = mongo.StringField()
    end = mongo.StringField()

    def serialize(self):
        return {
            'name': self.name,
            'day': self.day,
            'room': self.room,
            'start': self.start,
            'end': self.end
        }


class Jadwal(mongo.Document):
    user_id = mongo.ReferenceField('User')
    jadwals = mongo.ListField(EmbeddedDocumentField(JadwalData))
    primary = mongo.BooleanField()
    deleted = mongo.BooleanField(default=False)
    private = mongo.BooleanField(default=False)
    created_at = mongo.DateTimeField(default=datetime.now)

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
