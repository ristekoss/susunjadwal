import random
import string

import pytest
from mongoengine import ValidationError

from .period import ScheduleItem, Class, Course
from .utils import TestBase


class TestScheduleItem(TestBase):
    def test_serialization_contains_required_keys(self):
        schedule_item = ScheduleItem(
            day="Monday",
            start="Start",
            end="End",
            room="Canteen",
        )

        serialized_schedule_item = schedule_item.serialize()

        keys = serialized_schedule_item.keys()
        assert "day" in keys
        assert "start" in keys
        assert "end" in keys
        assert "room" in keys

    def test_serialization_values(self):
        schedule_item = ScheduleItem(
            day="Monday",
            start="Start",
            end="End",
            room="Canteen",
        )

        serialized_schedule_item = schedule_item.serialize()

        assert serialized_schedule_item["day"] == schedule_item.day
        assert serialized_schedule_item["start"] == schedule_item.start
        assert serialized_schedule_item["end"] == schedule_item.end
        assert serialized_schedule_item["room"] == schedule_item.room

    def test_schedule_item_fields_validation(self):
        test_cases = [
            {"day": "Monday" * 10, "start": "Start", "end": "End", "room": "Room"},
            {"day": "Monday" * 10, "start": "Start" * 5, "end": "End", "room": "Room"},
            {
                "day": "Monday" * 10,
                "start": "Start" * 5,
                "end": "End" * 10,
                "room": "Room",
            },
            {
                "day": "Monday" * 10,
                "start": "Start" * 5,
                "end": "End" * 10,
                "room": "Room" * 20,
            },
        ]

        for case in test_cases:
            with pytest.raises(ValidationError):
                ScheduleItem(
                    day=case["day"],
                    start=case["start"],
                    end=case["end"],
                    room=case["room"],
                ).validate()


class TestClass(TestBase):
    @classmethod
    def generate_random_schedule_item(cls):
        letters = string.ascii_letters
        return ScheduleItem(
            day="".join(random.choice(letters) for _ in range(16)),
            start="".join(random.choice(letters) for _ in range(16)),
            end="".join(random.choice(letters) for _ in range(16)),
            room="".join(random.choice(letters) for _ in range(64)),
        )

    def test_serialize_contains_required_keys(self):
        class_item = Class(
            name="Class",
            schedule_items=[self.generate_random_schedule_item()],
            lecturer=["John", "Troy"],
        )

        serialized_class_item = class_item.serialize()

        keys = serialized_class_item.keys()
        assert "name" in keys
        assert "lecturer" in keys
        assert "schedule_items" in keys

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
            schedule_items=[self.generate_random_schedule_item() for _ in range(10)],
            lecturer=["John", "Troy"],
        )

        serialized_class = class_item.serialize()

        assert serialized_class["name"] == class_item.name
        assert len(serialized_class["schedule_items"]) == len(class_item.schedule_items)
        for i in range(len(serialized_class["schedule_items"])):
            assert (
                serialized_class["schedule_items"][i]
                == class_item.schedule_items[i].serialize()
            )
        assert serialized_class["lecturer"] == class_item.lecturer

    def test_class_fields_validation(self):
        test_cases = [
            {
                "name": "Name" * 40,
                "schedule_items": [self.generate_random_schedule_item()],
                "lecturer": ["Smith"],
            },
            {"name": "Name" * 40, "schedule_items": 1, "lecturer": ["Smith"]},
            {"name": "Name" * 40, "schedule_items": 1, "lecturer": 2},
        ]

        for case in test_cases:
            with pytest.raises(ValidationError):
                Class(
                    name=case["name"],
                    schedule_items=case["schedule_items"],
                    lecturer=case["lecturer"],
                ).validate()


class TestCourse(TestBase):
    @classmethod
    def generate_random_class_item(cls):
        letters = string.ascii_letters
        return Class(
            name="".join(random.choice(letters) for _ in range(128)),
            schedule_items=[
                ScheduleItem(
                    day="".join(random.choice(letters) for _ in range(10)),
                    start="".join(random.choice(letters) for _ in range(10)),
                    end="".join(random.choice(letters) for _ in range(10)),
                    room="".join(random.choice(letters) for _ in range(50)),
                )
                for _ in range(10)
            ],
            lecturer=[
                "".join(random.choice(letters) for _ in range(5)) for _ in range(10)
            ],
        )

    def test_serialization_contains_required_keys(self):
        course = Course(
            name="Course",
            credit=4,
            term=1,
            classes=[self.generate_random_class_item()],
        )

        serialized_course = course.serialize()

        keys = serialized_course.keys()
        assert "name" in keys
        assert "credit" in keys
        assert "term" in keys
        assert "classes" in keys

    def test_serialization_with_empty_classes(self):
        course = Course(
            name="Course",
            credit=4,
            term=1,
            classes=[],
        )

        serialized_course = course.serialize()

        assert serialized_course["name"] == course.name
        assert serialized_course["credit"] == course.credit
        assert serialized_course["term"] == course.term
        assert serialized_course["classes"] == []

    def test_serialization_with_classes(self):
        course = Course(
            name="Course",
            credit=4,
            term=1,
            classes=[self.generate_random_class_item() for _ in range(5)],
        )

        serialized_course = course.serialize()

        assert serialized_course["name"] == course.name
        assert serialized_course["credit"] == course.credit
        assert serialized_course["term"] == course.term
        for i in range(len(serialized_course["classes"])):
            assert serialized_course["classes"][i] == course["classes"][i].serialize()

    def test_course_fields_validation(self):
        test_cases = [
            {
                "name": "Name" * 40,
                "credit": 3,
                "term": 2,
                "classes": [self.generate_random_class_item()],
            },
            {
                "name": "Name" * 40,
                "credit": "3",
                "term": 2,
                "classes": [self.generate_random_class_item()],
            },
            {
                "name": "Name" * 40,
                "credit": "3",
                "term": "2",
                "classes": [self.generate_random_class_item()],
            },
            {"name": "Name" * 40, "credit": "3", "term": "2", "classes": 1},
        ]

        for case in test_cases:
            with pytest.raises(ValidationError):
                Course(
                    name=case["name"],
                    credit=case["credit"],
                    term=case["term"],
                    classes=case["classes"],
                ).validate()
