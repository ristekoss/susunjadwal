import pytest
from mongoengine import connect, disconnect, ValidationError

from .major import Major
from .user import User


class TestMajor:

    @classmethod
    def setup_class(cls):
        connect(db="mongoenginetest", host="mongomock://localhost")

    @classmethod
    def teardown_class(cls):
        disconnect()

    def test_major_creation(self):
        major = Major.objects().create(name="Test_Name", kd_org="Test_KD_ORG")

        majors = Major.objects
        assert len(majors) == 1
        assert major in majors

        fetched_major = majors().first()
        assert fetched_major.name == "Test_Name"
        assert fetched_major.kd_org == "Test_KD_ORG"

        major.delete()

    def test_major_update(self):
        major = Major.objects.create(name="Old_Name", kd_org="Old_KD_ORG")

        major.name = "Updated_Name"
        major.kd_org = "Updated_KD_ORG"
        major.save()
        major.reload()

        assert major.name == "Updated_Name"
        assert major.kd_org == "Updated_KD_ORG"

        major.delete()

    def test_major_deletion(self):
        major = Major.objects().create(name="Test_Name", kd_org="Test_KD_ORG")

        assert len(Major.objects) == 1
        assert major in Major.objects

        major.delete()
        assert len(Major.objects) == 0
        assert major not in Major.objects

    def test_major_fields_with_invalid_values(self):
        field_values = [
            {"name": "A" * 257, "kd_org": ""},
            {"name": "A" * 257, "kd_org": "KD_ORG"},
            {"name": "A" * 257, "kd_org": "B" * 17},
            {"name": "A" * 257, "kd_org": "B" * 20},
            {"name": "A" * 300, "kd_org": ""},
            {"name": "A" * 300, "kd_org": "KD_ORG"},
            {"name": "A" * 300, "kd_org": "B" * 17},
            {"name": "A" * 300, "kd_org": "B" * 20},
        ]

        for values in field_values:
            with pytest.raises(ValidationError):
                Major.objects().create(name=values["name"], kd_org=values["kd_org"])


class TestUser:

    @classmethod
    def setup_class(cls):
        connect(db="mongoenginetest", host="mongomock://localhost")

    @classmethod
    def teardown_class(cls):
        disconnect()

    def test_user_creation(self):
        major = Major.objects().create(name="Test_Name", kd_org="Test_KD_ORG")
        User.objects().create(
            name="John",
            username="wick",
            npm="12345678",
            batch="2020",
            major=major
        )

        users = User.objects
        assert len(users) == 1

        fetched_user = users.first()
        assert fetched_user.name == "John"
        assert fetched_user.username == "wick"
        assert fetched_user.npm == "12345678"
        assert fetched_user.batch == "2020"
        assert fetched_user.major == major

        fetched_user.delete()
        major.delete()

    def test_user_update(self):
        old_major = Major.objects().create(name="Test_Name", kd_org="Test_KD_ORG")
        user = User.objects().create(
            name="John",
            username="wick",
            npm="12345678",
            batch="2020",
            major=old_major
        )

        user.name = "Smith"
        user.username = "wock"
        user.npm = "0123"
        user.batch = "123"
        new_major = Major.objects().create(name="New_Major", kd_org="New_KD_ORG")
        user.major = new_major
        user.save()
        user.reload()

        assert user.name == "Smith"
        assert user.username == "wock"
        assert user.npm == "0123"
        assert user.batch == "123"
        assert user.major == new_major

        user.delete()
        new_major.delete()
        old_major.delete()

    def test_user_deletion(self):
        user = User.objects().create(
            name="John",
            username="wick",
            npm="12345678",
            batch="2020",
            major=Major.objects().create(name="Test_Name", kd_org="Test_KD_ORG")
        )

        assert len(User.objects) == 1
        assert user in User.objects

        user.delete()
        assert len(User.objects) == 0
        assert user not in User.objects
