from flask import (
    Blueprint,
    jsonify,
    request
)

from decorators import require_same_user_id
from jwt_utils import require_jwt_token
from models.major import Major
from models.user_schedule import UserSchedule


router_main = Blueprint('router_sunjad', __name__)


@router_main.route('/majors/<major_id>/courses', methods=['GET'])
@require_jwt_token
def get_courses(major_id):
    major = Major.objects(id=major_id).first()
    return (jsonify(major.serialize()), 200)


@router_main.route('/users/<user_id>/user_schedule', methods=['POST'])
@require_jwt_token
@require_same_user_id
def save_user_schedule(user_id):
    data = request.json
    user_schedule = UserSchedule(user_id=user_id)
    for item in data['schedule_items']:
        user_schedule.add_schedule_item(**item)
    user_schedule.save()

    return (jsonify({
        'id': str(user_schedule.id),
    }), 201)


@router_main.route('/user_schedules/<user_schedule_id>')
def get_user_schedule_detail(user_schedule_id):
    user_schedule = UserSchedule.objects(id=user_schedule_id).first()
    return (jsonify({
        'user_schedule': user_schedule.serialize()
    }), 200)


@router_main.route('/users/<user_id>/user_schedules', methods=['GET'])
@require_jwt_token
@require_same_user_id
def get_user_schedule_list(user_id):
    schedules = UserSchedule.objects(user_id=user_id, deleted=False).all()
    data = []
    for schedule in schedules:
        data.append(schedule.serialize())
    return (jsonify({
        'user_schedules': data
    }), 200)


@router_main.route('/users/<user_id>/user_schedules/<user_schedule_id>', methods=['DELETE'])
@require_jwt_token
@require_same_user_id
def delete_user_schedule(user_id, user_schedule_id):
    user_schedule = UserSchedule.objects(id=user_schedule_id).first()
    user_schedule.deleted = True
    user_schedule.save()
    return (jsonify(), 204)
