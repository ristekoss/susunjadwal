import ../app
import unittest
import json
import helper
class AuthorizationTest(unittest.TestCase):
	def setUp(self):
		self.app = app.app.test_client()

	def test_