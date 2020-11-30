import unittest
from mongoengine import connect, disconnect, ValidationError

from models.major import Major


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


if __name__ == "__main__":
    unittest.main()
