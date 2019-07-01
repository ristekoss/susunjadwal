import json

from flask import request, redirect

from .utils import (
    get_cas_client,
    get_service_url,
    authenticate,
    normalize_username,
    get_additional_info,
)
import functools


def with_sso_ui(f, force_login=True):

    @functools.wraps(f)
    def sso_ui_wrapper(*args, **kwargs):
        service_url = get_service_url(request)
        client = get_cas_client(service_url)
        login_url = client.get_login_url()

        ticket = request.args.get("ticket")
        if ticket:
            sso_profile = authenticate(ticket, client)

            if sso_profile is None and force_login:
                return redirect(login_url)

            kwargs.update({"sso_profile": sso_profile})
            return f(*args, **kwargs)
        else:
            return redirect(login_url)

    return sso_ui_wrapper
