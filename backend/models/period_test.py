import pytest
from mongoengine import ValidationError

from .period import ScheduleItem, Class
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

        assert "day" in serialized_schedule_item.keys()
        assert "start" in serialized_schedule_item.keys()
        assert "end" in serialized_schedule_item.keys()
        assert "room" in serialized_schedule_item.keys()

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

    def test_class_fields_validation(self):
        test_cases = [
            {
                "name": "Name" * 40,
                "schedule_items": [
                    ScheduleItem(
                        day="Tuesday",
                        start="12-02-2020 21:00:00",
                        end="12-02-2020 23:00:00",
                        room="Auditorium",
                    )
                ],
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
