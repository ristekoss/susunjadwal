import pytest
from mongoengine import ValidationError

from .user_schedule import ScheduleItem
from .utils import TestBase


class TestScheduleItem(TestBase):
    def test_serialization_contains_required_keys(self):
        schedule_item = ScheduleItem(
            name="Random",
            day="Monday",
            start="Start",
            end="End",
            room="Canteen",
        )

        serialized_schedule_item = schedule_item.serialize()

        keys = serialized_schedule_item.keys()
        assert "name" in keys
        assert "day" in keys
        assert "start" in keys
        assert "end" in keys
        assert "room" in keys

    def test_serialization_values(self):
        schedule_item = ScheduleItem(
            name="New Name",
            day="Monday",
            start="Start",
            end="End",
            room="Canteen",
        )

        serialized_schedule_item = schedule_item.serialize()

        assert serialized_schedule_item["name"] == schedule_item.name
        assert serialized_schedule_item["day"] == schedule_item.day
        assert serialized_schedule_item["start"] == schedule_item.start
        assert serialized_schedule_item["end"] == schedule_item.end
        assert serialized_schedule_item["room"] == schedule_item.room

    def test_schedule_item_fields_validation(self):
        test_cases = [
            {
                "name": "Name" * 40,
                "day": "Monday" * 10,
                "start": "Start",
                "end": "End",
                "room": "Room",
            },
            {
                "name": "Name" * 40,
                "day": "Monday" * 10,
                "start": "Start" * 5,
                "end": "End",
                "room": "Room",
            },
            {
                "name": "Name" * 40,
                "day": "Monday" * 10,
                "start": "Start" * 5,
                "end": "End" * 10,
                "room": "Room",
            },
            {
                "name": "Name" * 40,
                "day": "Monday" * 10,
                "start": "Start" * 5,
                "end": "End" * 10,
                "room": "Room" * 20,
            },
        ]

        for case in test_cases:
            with pytest.raises(ValidationError):
                ScheduleItem(
                    name=case["name"],
                    day=case["day"],
                    start=case["start"],
                    end=case["end"],
                    room=case["room"],
                ).validate()
