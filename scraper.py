import json
import re
import os
import requests
from bs4 import BeautifulSoup

from models.major import (
    Course,
    Class,
    ScheduleItem
)


JADWAL_PERIOD = '2018-3'

BASE_URL = 'https://academic.ui.ac.id/main'
AUTH_URL = f"{BASE_URL}/Authentication/Index"
CHANGEROLE_URL = f"{BASE_URL}/Authentication/ChangeRole"
JADWAL_URL = f"{BASE_URL}/Schedule/Index?period={JADWAL_PERIOD}&search="


def scrape_major(major):
    username, password = fetch_credential(major)
    if (username is None) or (password is None):
        return None

    req = requests.Session()
    r = req.post(AUTH_URL, data={'u': username, 'p': password}, verify=False)
    r = req.get(CHANGEROLE_URL)
    r = req.get(JADWAL_URL)

    courses = parse_schedule(r.text)
    return courses


def fetch_credential(major):
    with open("credentials.json") as cred:
        credentials = json.loads(cred.read())
        val = credentials.get(major, {})
        return (val.get("username"), val.get("password"))


def parse_schedule(html):
    soup = BeautifulSoup(html, 'html.parser')
    classes = soup.find_all('th', class_='sub border2 pad2')

    courses = []
    for class_ in classes:
        course_name = class_.strong.text
        m = re.search('([0-9]+) SKS, Term ([0-9]+)', class_.text)
        if m:
            found = m.group().split(' SKS, Term ')
            credit = found[0]
            term = found[1]

        classes = []
        for sib in class_.parent.find_next_siblings('tr'):
            if (sib.get('class') == None):
                break
            class_name = sib.a.text
            try:
                schedule_items = str(sib.contents[9]).split('<br/>')
                schedule_items[0] = schedule_items[0].split('<td nowrap="">')[
                    1].split('</td>')[0]
                schedule_items[-1] = schedule_items[-1].split('</td>')[0]

                rooms = str(sib.contents[11]).split('<br/>')
                rooms[0] = rooms[0].split('<td>')[1].split('</td>')[0]
                rooms[-1] = rooms[-1].split('</td>')[0]

                lecturers = str(sib.contents[13]).split('<br/>')
                lecturers[0] = lecturers[0].split('<td>')[1].split('</td>')[0]
                lecturers[-1] = lecturers[-1].split('</td>')[0]
                for i, val in enumerate(lecturers):
                    lect = val.split('- ')
                    lecturers[i] = lect[-1]

                schedule_items = zip(schedule_items, rooms)
                result = []
                for i, item in enumerate(schedule_items):
                    day, jdw = item[0].split(', ')
                    start, end = jdw.split('-')
                    result.append(ScheduleItem(**{
                        'day': day,
                        'start': start,
                        'end': end,
                        'room': item[1]
                    }))

                classes.append(
                    Class(name=class_name, schedule_items=result, lecturer=lecturers))

            except IndexError as e:
                pass
        courses.append(Course(name=course_name, credit=credit,
                              term=term, classes=classes))
    return courses
