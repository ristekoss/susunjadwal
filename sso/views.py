from flask import (
    Blueprint,
    current_app as app,
    render_template
)

from models.user import User
from models.major import Major
from jwt_utils import generate_token
from scraper import scrape_major
from sso.decorators import with_sso_ui

router_sso = Blueprint('router_sso', __name__, template_folder="templates")


@router_sso.route("/login/")
@with_sso_ui
def login(sso_profile):
    major_name = sso_profile["attributes"]["study_program"]
    major = Major.objects(name=major_name).first()
    if major is None:
        major = Major(name=major_name)
        major.courses = scrape_major(major_name)
        major.save()

    npm = sso_profile["attributes"]["npm"]
    user = User.objects(npm=npm).first()
    if user is None:
        data = {
            "name": sso_profile["attributes"]["ldap_cn"],
            "username": sso_profile["username"],
            "npm": npm,
            "angkatan": f"20{npm[:2]}",
            "major": major,
            "role": "UNUSED"
        }
        user = User(**data)
        user.save()

    token = generate_token(user.id, user.major.id, user.role)
    context = {
        "sender": app.config["CLIENT_URL"],
        "payload": {
            "user_id": str(user.id),
            "major_id": str(user.major.id),
            "token": token
        }
    }
    return (render_template("sso/login.html", **context), 200)
