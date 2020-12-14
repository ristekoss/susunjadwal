import random
import string

from mongoengine import connect, disconnect


class TestBase:
    @classmethod
    def setup_class(cls):
        connect(db="mongoenginetest", host="mongomock://localhost")

    @classmethod
    def teardown_class(cls):
        disconnect()

    @classmethod
    def get_random_string(cls, length):
        letters = string.ascii_letters
        return "".join(random.choice(letters) for _ in range(length))
