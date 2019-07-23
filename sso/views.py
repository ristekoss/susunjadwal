from flask import (
    Blueprint,
    current_app as app,
    render_template
)

from models.user import User
from models.major import Major, Course
from jwt_utils import generate_token
from scraper import scrape_major
from sso.decorators import login_sso_ui, logout_sso_ui

router_sso = Blueprint('router_sso', __name__, template_folder="templates")


@router_sso.route("/login/")
@login_sso_ui
def login(sso_profile):
    major_name = sso_profile["attributes"]["study_program"]
    major = Major.objects(name=major_name).first()
    if major is None or len(major.filter_courses(app.config["ACTIVE_PERIOD"])) == 0:
        courses = scrape_major(major_name, app.config["ACTIVE_PERIOD"])
        if courses:
            major = (major if major is not None else Major(name=major_name))
            major.courses.extend(courses)
            major.save()
    if major is None:
        context = {
            "sender": app.config["CLIENT_URL"],
            "payload": {
                "err": f"Your faculty {major} isn't supported yet. Please contact Ristek Fasilkom UI if you are interested"
            }
        }
    else:
        npm = sso_profile["attributes"]["npm"]
        user = User.objects(npm=npm).first()
        if user is None:
            data = {
                "name": sso_profile["attributes"]["ldap_cn"],
                "username": sso_profile["username"],
                "npm": npm,
                "angkatan": f"20{npm[:2]}",
                "major": major,
            }
            user = User(**data)
            user.save()

        token = generate_token(user.id, user.major.id)
        context = {
            "sender": app.config["CLIENT_URL"],
            "payload": {
                "user_id": str(user.id),
                "major_id": str(user.major.id),
                "token": token
            }
        }
    return (render_template("sso/post_message.html", **context), 200)


@router_sso.route("/logout/")
@logout_sso_ui
def logout():
    context = {
        "sender": app.config["CLIENT_URL"],
        "payload": {
            "success": "true"
        }
    }
    return (render_template("sso/post_message.html", **context), 200)
