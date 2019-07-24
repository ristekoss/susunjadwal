from flask import (
    Blueprint,
    current_app as app,
    render_template
)

from jwt_utils import generate_token
from models.major import Major
from models.period import Period
from models.user import User
from scraper import scrape_courses
from sso.decorators import login_sso_ui, logout_sso_ui

router_sso = Blueprint('router_sso', __name__, template_folder="templates")


@router_sso.route("/login/")
@login_sso_ui
def login(sso_profile):
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
            context = {
                "sender": app.config["CLIENT_URL"],
                "payload": {
                    "err": f"Your faculty {major} isn't supported yet. Please contact Ristek Fasilkom UI if you are interested."
                }
            }
            return (render_template("sso/post_message.html", **context), 200)

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
