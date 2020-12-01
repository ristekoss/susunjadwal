import pytest
from mongoengine import connect, disconnect, ValidationError

from .period import ScheduleItem, Class
from .major import Major
from .user import User


class TestBase:
    @classmethod
    def setup_class(cls):
        connect(db="mongoenginetest", host="mongomock://localhost")

    @classmethod
    def teardown_class(cls):
        disconnect()


class TestMajor(TestBase):
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


class TestUser(TestBase):
    def test_user_creation(self):
        major = Major.objects().create(name="Test_Name", kd_org="Test_KD_ORG")
        User.objects().create(
            name="John", username="wick", npm="12345678", batch="2020", major=major
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
            name="John", username="wick", npm="12345678", batch="2020", major=old_major
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
            major=Major.objects().create(name="Test_Name", kd_org="Test_KD_ORG"),
        )

        assert len(User.objects) == 1
        assert user in User.objects

        user.delete()
        assert len(User.objects) == 0
        assert user not in User.objects

    def test_user_fields_validation(self):
        major = Major.objects().create(name="Name", kd_org="KD_ORG")
        test_cases = [
            {
                "name": "A" * 300,
                "username": "username",
                "npm": "123",
                "batch": "123",
                "major": major,
            },
            {
                "name": "A" * 300,
                "username": "A" * 100,
                "npm": "123",
                "batch": "123",
                "major": major,
            },
            {
                "name": "A" * 300,
                "username": "A" * 100,
                "npm": "A" * 30,
                "batch": "123",
                "major": major,
            },
            {
                "name": "A" * 300,
                "username": "A" * 100,
                "npm": "A" * 30,
                "batch": "A" * 10,
                "major": major,
            },
            {
                "name": "A" * 300,
                "username": "A" * 100,
                "npm": "A" * 30,
                "batch": "A" * 10,
                "major": 1,
            },
        ]

        for case in test_cases:
            with pytest.raises(ValidationError):
                User.objects().create(
                    name=case["name"],
                    username=case["username"],
                    npm=case["npm"],
                    batch=case["batch"],
                    major=case["major"],
                )


class TestScheduleItem(TestBase):
    def test_serialization_contains_required_keys(self):
        schedule_item = ScheduleItem(
            day="Monday",
            start="12-01-2020 22:00:00",
            end="12-01-2020 23:59:00",
            room="Canteen",
        )

        serialized_schedule_item = schedule_item.serialize()

        assert "day" in serialized_schedule_item.keys()
        assert "start" in serialized_schedule_item.keys()
        assert "end" in serialized_schedule_item.keys()
        assert "room" in serialized_schedule_item.keys()

    def test_serialization_values(self):
        schedule_item = ScheduleItem(
            day="Monday",
            start="12-01-2020 22:00:00",
            end="12-01-2020 23:59:00",
            room="Canteen",
        )

        serialized_schedule_item = schedule_item.serialize()

        assert serialized_schedule_item["day"] == schedule_item.day
        assert serialized_schedule_item["start"] == schedule_item.start
        assert serialized_schedule_item["end"] == schedule_item.end
        assert serialized_schedule_item["room"] == schedule_item.room


class TestClass(TestBase):
    def test_serialize_contains_required_keys(self):
        class_item = Class(
            name="Class",
            schedule_items=[
                ScheduleItem(
                    day="Monday",
                    start="12-01-2020 21:00:00",
                    end="12-01-2020 23:00:00",
                    room="Canteen",
                )
            ],
            lecturer=["John", "Troy"],
        )

        serialized_class_item = class_item.serialize()

        assert "name" in serialized_class_item.keys()
        assert "lecturer" in serialized_class_item.keys()
        assert "schedule_items" in serialized_class_item.keys()

    def test_serialize_with_empty_schedules(self):
        class_item = Class(
            name="Class",
            schedule_items=[],
            lecturer=["John", "Troy"],
        )

        serialized_class = class_item.serialize()

        assert serialized_class["name"] == class_item.name
        assert serialized_class["schedule_items"] == []
        assert serialized_class["lecturer"] == class_item.lecturer

    def test_serialize_with_schedules(self):
        class_item = Class(
            name="Class",
            schedule_items=[
                ScheduleItem(
                    day="Monday",
                    start="12-01-2020 21:00:00",
                    end="12-01-2020 23:00:00",
                    room="Canteen",
                ),
                ScheduleItem(
                    day="Tuesday",
                    start="12-02-2020 21:00:00",
                    end="12-02-2020 23:00:00",
                    room="Auditorium",
                ),
            ],
            lecturer=["John", "Troy"],
        )

        serialized_class = class_item.serialize()

        assert serialized_class["name"] == class_item.name
        assert len(serialized_class["schedule_items"]) == 2
        assert (
            serialized_class["schedule_items"][0]
            == class_item.schedule_items[0].serialize()
        )
        assert (
            serialized_class["schedule_items"][1]
            == class_item.schedule_items[1].serialize()
        )
        assert serialized_class["lecturer"] == class_item.lecturer
