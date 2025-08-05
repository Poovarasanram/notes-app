from rest_framework.response import Response
from django.http import JsonResponse

from django.utils.translation import gettext_lazy as _

def build_api_success_response(status, request_id=None, message=None, data=dict()):
    try:
        return JsonResponse(
                {'status': status, 'request_id': request_id, 'message': message, 'data': data},
                status=status,
            )
    except Exception as e:
        print(e)

def build_api_error_response(status, message=None, errors=None):
    try:
        return JsonResponse(
            {'status': status, 'message': message},
            status=status,
        )
    
    except Exception as e:
        print(e)


HTTP_REST_MESSAGES = {"200": _("Success"),
                      "400": _("Failed"),
                      "401": _("Authentication Failed"),
                      "426": _("Version Mismatch"),
                      "429": _("Too many requests"),
                      "500": _("Internal server error")}
