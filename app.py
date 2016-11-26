from functools import wraps
from flask import *
from mongoengine import *
from models import *
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
import jwt
import requests

app = Flask(__name__)
connect('susun-jadwal')
secret_key = '$Zk`^G8"LR<>C9r6D,+W3.}mr8UQ/*aU'

#                SEED DATA                #
###########################################
# User.drop_collection()
# Major.drop_collection()
# Jadwal.drop_collection()
# major = Major(name='ilmu-komputer')
# major.save()
# major = Major(name='sistem-informasi')
# major.save()
# user = User(**{
#   "name": "Kenny Dharmawan",
#   "npm": "1406527620",
#   "angkatan": "2015",
#   "role": "admin"
# })
# user.major = major
# user.save()
# jadwal = Jadwal(user_id=user.id)
# jadwal.save()
# jadwal = Jadwal(user_id=user.id)
# jadwal.save()
###########################################

#                AUTH MODULE              #
###########################################
BASE_PATH = '/susunjadwal/api'

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    if(data['token'] != '8VlGnna26REH6xrh'):
        return jsonify(), 401
    user = User.objects(npm=data['npm']).first()
    if(user == None):
        del data['token']
        user = User(**data)
        user.major = Major.objects(name=data['major']).first()
        user.role = 'user'
        user.save()
    token = jwt.encode({
        'exp': datetime.utcnow() + timedelta(minutes=30),
        'user_id': str(user.id),
        'major_id': str(user.major.id),
        'role': user.role
    }, secret_key, algorithm='HS256')
    return jsonify({
        'user_id': str(user.id),
        'token': token,
        'major_id': str(user.major.id)
    }), 200

def extract_data(header):
    try:
        header_type, value = tuple(header['Authorization'].split())
        data = jwt.decode(value, secret_key)
    except Exception:
        return None
    return data

@app.route(BASE_PATH + '/auth/validate')
def validate():
    data = extract_data(request.headers)
    status = True
    if(data == None):
        status = False
    return jsonify({
        'status': status
    }), 200

def require_token(func):
    @wraps(func)
    def decorated_func(*args, **kwargs):
        data = extract_data(request.headers)
        if(data == None):
            return jsonify({
                'message': 'There is no token/token is not valid'
            }), 401
        return func(*args, **kwargs)
    return decorated_func

def privilege(role):
    def check_privilege(func):
        @wraps(func)
        def decorated_func(*args, **kwargs):
            data = extract_data(request.headers)
            if(data['role'] == role):
                return func(*args, **kwargs)
            return jsonify({
                'message': 'Unauthorized. Only admin can access this endpoint'
            }), 401
        return decorated_func
    return check_privilege

def same_user_id(func):
    @wraps(func)
    def decorated_func(*args, **kwargs):
        data = extract_data(request.headers)
        if(data['user_id'] == kwargs['user_id']):
            return func(*args, **kwargs)
        return jsonify({
            'message': 'Unauthorized. Only the resource owner can access this endpoint'
        }), 401
    return decorated_func

def protected_resource():
    return jsonify({
        'message': 'Unauthorized. Only the resource owner can access this endpoint'
    }), 401
###########################################

#                MAJOR MODULE             #
###########################################
@app.route(BASE_PATH + '/majors/<int:major_id>/courses', methods=['POST'])
@require_token
@privilege('admin')
def save_course(major_id):
    data = request.json
    major = Major.objects(major_id=major_id).first()
    course = major.create_course(data['name'], data['sks'], data['term'])
    classes = data['classes']
    for class_ in classes:
        jadwals = class_['jadwals']
        class_ = course.create_class(class_['name'], class_['lecturer'])
        for jadwal in jadwals:
            class_.create_jadwal(**jadwal)
    major.save()
    return jsonify(major.get_course()), 201

@app.route(BASE_PATH + '/majors/<int:major_id>/courses', methods=['GET'])
@require_token
def get_courses(major_id):
    major = Major.objects(major_id=major_id).first()
    return jsonify(major.get_course()), 200
###########################################

#                USER MODULE              #
###########################################
@app.route(BASE_PATH + '/users/<user_id>/jadwals', methods=['POST'])
@require_token
@same_user_id
def save_jadwal(user_id):
    data = request.json
    jadwal = Jadwal(user_id=user_id)
    for j in data['jadwals']:
        jadwal.add_jadwal(**j)
    primary_jadwal = Jadwal.objects(user_id=user_id, primary=True).first()
    if(primary_jadwal == None):
        jadwal.primary = True
    else:
        jadwal.primary = False
    jadwal.save()
    return jsonify({
        'jadwal_id': str(jadwal.id),
        'primary': jadwal.primary
    }), 201

@app.route(BASE_PATH + '/users/<user_id>/jadwals/<jadwal_id>/set-utama', methods=['POST'])
@require_token
@same_user_id
def set_to_primary(user_id, jadwal_id):
    data = request.json
    jadwal = Jadwal.objects(user_id=user_id, id=jadwal_id).first()
    primary_jadwal = Jadwal.objects(primary=True).first()
    primary_jadwal.primary = False
    jadwal.primary = True
    primary_jadwal.save()
    jadwal.save()
    return jsonify(), 204

@app.route(BASE_PATH + '/users/<user_id>/jadwals', methods=['GET'])
@require_token
@same_user_id
def get_jadwal(user_id):
    jadwals = Jadwal.objects(user_id=user_id, deleted=False).all()
    data = []
    print jadwals
    for jadwal in jadwals:
        data.append(jadwal.serialize())
    return jsonify({
        'jadwals': data
    }), 200

@app.route(BASE_PATH + '/users/<user_id>/jadwals/<jadwal_id>', methods=['DELETE'])
@require_token
@same_user_id
def delete_jadwal(user_id, jadwal_id):
    jadwal = Jadwal.objects(jadwal_id=jadwal_id).first()
    jadwal.deleted = True
    jadwal.save()
    return jsonify(), 204

@app.route(BASE_PATH + '/users/<user_id>/jadwals/<jadwal_id>/set-private', methods=['POST'])
@require_token
@same_user_id
def set_to_private(user_id, jadwal_id):
    jadwal = Jadwal.objects(jadwal_id=jadwal_id).first()
    jadwal.private = True
    jadwal.save()
    return jsonify(), 204
###########################################

#                JADWAL MODULE            #
###########################################
@app.route(BASE_PATH + '/jadwals/<jadwal_id>')
def get_public_jadwal(jadwal_id):
    jadwal = Jadwal.objects(id=jadwal_id).first()
    if(jadwal.private):
        return protected_resource()
    return jsonify({
        'user_id': str(jadwal.user_id),
        'jadwals': jadwal.get_jadwal()
    })

@app.route(BASE_PATH + '/jadwals/join')
def join_jadwal():
    jadwal_ids = request.json['jadwal_ids']
    data = []
    for jadwal_id in jadwal_ids:
        jadwal = Jadwal.objects(id=jadwal_id).first()

        if(jadwal.private):
            return protected_resource()
        data.extend(jadwal.get_jadwal())
    return jsonify({
        'jadwals': data
    })
###########################################

#               SCRAPER MODULE            #
###########################################
import scraper
###########################################