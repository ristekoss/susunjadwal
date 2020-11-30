import unittest
from mongoengine import connect, disconnect, ValidationError

from models.major import Major
from models.user import User


class TestMajor(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        connect(db="mongoenginetest", host="mongomock://localhost")

    @classmethod
    def tearDownClass(cls) -> None:
        disconnect()

    def test_major_creation(self):
        major = Major.objects().create(name="Test_Name", kd_org="Test_KD_ORG")

        majors = Major.objects
        self.assertEqual(len(majors), 1)
        self.assertIn(major, majors)

        fetched_major = majors().first()
        self.assertEqual("Test_Name", fetched_major.name)
        self.assertEqual("Test_KD_ORG", fetched_major.kd_org)

        major.delete()

    def test_major_update(self):
        major = Major.objects.create(name="Old_Name", kd_org="Old_KD_ORG")

        major.name = "Updated_Name"
        major.kd_org = "Updated_KD_ORG"
        major.save()
        major.reload()

        self.assertEqual("Updated_Name", major.name)
        self.assertEqual("Updated_KD_ORG", major.kd_org)

        major.delete()

    def test_major_deletion(self):
        major = Major.objects().create(name="Test_Name", kd_org="Test_KD_ORG")

        self.assertEqual(1, len(Major.objects))
        self.assertIn(major, Major.objects)

        major.delete()
        self.assertEqual(0, len(Major.objects))
        self.assertNotIn(major, Major.objects)

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
            with self.assertRaises(ValidationError):
                Major.objects().create(name=values["name"], kd_org=values["kd_org"])


class TestUser(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        connect(db="mongoenginetest", host="mongomock://localhost")

    @classmethod
    def tearDownClass(cls) -> None:
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
        self.assertEqual(1, len(users))

        fetched_user = users.first()
        self.assertEqual("John", fetched_user.name)
        self.assertEqual("wick", fetched_user.username)
        self.assertEqual("12345678", fetched_user.npm)
        self.assertEqual("2020", fetched_user.batch)
        self.assertEqual(major, fetched_user.major)

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

        self.assertEqual("Smith", user.name)
        self.assertEqual("wock", user.username)
        self.assertEqual("0123", user.npm)
        self.assertEqual("123", user.batch)
        self.assertEqual(new_major, user.major)

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

        self.assertEqual(1, len(User.objects))
        self.assertIn(user, User.objects)

        user.delete()
        self.assertEqual(0, len(User.objects))
        self.assertNotIn(user, User.objects)


if __name__ == "__main__":
    unittest.main()
