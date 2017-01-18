import requests
from mongoengine import *
from models.Major import *
from flask import jsonify
from bs4 import BeautifulSoup
import json
import re
from app import app

BASE_URL        = 'https://academic.ui.ac.id/main/'
AUTH_URL        = BASE_URL + 'Authentication/Index'
CHANGEROLE_URL  = BASE_URL + 'Authentication/ChangeRole'
JADWAL_URL      = BASE_URL + 'Schedule/Index?period=2016-2&search='
LOGOUT_URL      = BASE_URL + 'Authentication/Logout'


BASE_PATH = '/susunjadwal/api'
@app.route(BASE_PATH + '/jadwals/fetch/<major>')
def fetch_jadwal(major):
    username, password = fetch_credential(major)
    req = requests.Session()
    r = req.post(AUTH_URL, data = {'u': username, 'p': password}, verify=False)
    r = req.get(CHANGEROLE_URL)
    r = req.get(JADWAL_URL)
    course_list = scrape_jadwal(r.text)
    major_obj = Major.objects(name=major).first()
    if major_obj == None:
    	major_obj = Major(name=major)
    major_obj.courses = course_list
    major_obj.save()
    return jsonify(), 200

def fetch_credential(major):
    credentials = json.loads(open('credentials.json').read())
    for key, value in credentials.items():
        if (key == major):
            return (value['username'], value['password'])


def scrape_jadwal(html):
    soup = BeautifulSoup(html, 'html.parser')
    classes = soup.find_all('th', class_='sub border2 pad2')
    first = True
    course_list = []
    for class_ in classes:
        course_name = class_.strong.text
        m = re.search('([0-9]+) SKS, Term ([0-9]+)', class_.text)
        if m:
            found = m.group().split(' SKS, Term ')
            sks = found[0]
            term = found[1]
        class_list = []
        for sib in class_.parent.find_next_siblings('tr'):
            if (sib.get('class') == None):
                break
            class_name = sib.a.text
            try:
                jadwals = str(sib.contents[9]).split('<br/>')
                jadwals[0] = jadwals[0].split('<td nowrap="">')[1].split('</td>')[0]
                jadwals[-1] = jadwals[-1].split('</td>')[0]

                rooms = str(sib.contents[11]).split('<br/>')
                rooms[0] = rooms[0].split('<td>')[1].split('</td>')[0]
                rooms[-1] = rooms[-1].split('</td>')[0]

                lecturers = str(sib.contents[13]).split('<br/>')
                lecturers[0] = lecturers[0].split('<td>')[1].split('</td>')[0]
                lecturers[-1] = lecturers[-1].split('</td>')[0]
                for i, val in enumerate(lecturers):
                    lect = val.split('- ')
                    lecturers[i] = lect[-1]
                
                jadwals = zip(jadwals, rooms)
                j = []
                for i, jadwal in enumerate(jadwals):
                    day, jdw = jadwal[0].split(', ')
                    start, end = jdw.split('-')
                    j.append(Jadwal(**{
                        'day': day,
                        'start':start, 
                        'end':end,
                        'room': jadwal[1]
                    }))
                class_list.append(Class(name=class_name, jadwal=j, lecturer=lecturers))
            except IndexError as e:
                pass
        course_list.append(Course(name=course_name, sks=sks, term=term, classes=class_list))
    return course_list
    