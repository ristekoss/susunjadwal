from flask import (
    Blueprint,
    current_app as app,
    jsonify,
    render_template,
    request
)

from jwt_utils import generate_token
from models.major import Major
from models.period import Period
from models.user import User
from scraper import scrape_courses
from sso.utils import (
    authenticate,
    get_cas_client
)

router_sso = Blueprint('router_sso', __name__, template_folder="templates")


def process(sso_profile):
    period_name = app.config["ACTIVE_PERIOD"]

    user_npm = sso_profile["attributes"]["npm"]
    major_name = sso_profile["attributes"]["study_program"]
    major_kd_org = sso_profile["attributes"]["kd_org"]

    major = Major.objects(kd_org=major_kd_org).first()
    if major is None:
        major = Major(name=major_name, kd_org=major_kd_org)
        major.save()

    period = Period.objects(major_id=major.id, name=period_name).first()
    if period is None:
        courses = scrape_courses(major_name, period_name)
        if not courses:
            result = {
                "payload": {
                    "err": f"Your faculty {major} isn't supported yet. Please contact Ristek Fasilkom UI if you are interested."
                }
            }
            return result

        period = Period(major_id=major.id, name=period_name, courses=courses)
        period.save()

    user = User.objects(npm=user_npm).first()
    if user is None:
        user = User(
            name=sso_profile["attributes"]["ldap_cn"],
            username=sso_profile["username"],
            npm=user_npm,
            batch=f"20{user_npm[:2]}",
            major=major,
        )
        user.save()

    token = generate_token(user.id, user.major.id)
    result = {
        "payload": {
            "user_id": str(user.id),
            "major_id": str(user.major.id),
            "token": token
        }
    }

    return result


@router_sso.route("/auth/", methods=['POST'])
def auth():
    data = request.json
    ticket = data.get("ticket")
    service_url = data.get("service_url")
    if (ticket is not None) and (service_url is not None):
        client = get_cas_client(service_url)
        sso_profile = authenticate(ticket, client)
        if sso_profile is not None:
            user_data = process(sso_profile)
            return (jsonify(user_data), 200)

    return (jsonify(), 400)
