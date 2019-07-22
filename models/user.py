import mongoengine as mongo


class User(mongo.Document):
    name = mongo.StringField(max_length=255)
    username = mongo.StringField(max_length=64)
    npm = mongo.StringField(max_length=20)
    angkatan = mongo.StringField(max_length=5)
    major = mongo.ReferenceField("Major")
