from mongoengine import connect, disconnect


class TestBase:
    @classmethod
    def setup_class(cls):
        connect(db="mongoenginetest", host="mongomock://localhost")

    @classmethod
    def teardown_class(cls):
        disconnect()
