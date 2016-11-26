from mongoengine import *

class User(Document):
	name = StringField(max_length=255)
	npm = StringField(max_length=20)
	angkatan = StringField(max_length=5)
	major = ReferenceField('Major')
	role = StringField()