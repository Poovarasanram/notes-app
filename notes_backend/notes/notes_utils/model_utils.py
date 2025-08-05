
import logging
from django.db import models
from django.contrib.auth import get_user_model

log = logging.getLogger(__name__)
User = get_user_model()  # gets the active User model (custom or default)


def is_django_model_instance(value):
    return isinstance(value, models.Model)


def convert_model_to_dict(instance):
    my_dict = {}
    try:
        for field in instance._meta.fields:
            field_name = field.name
            field_value = getattr(instance, field_name)

            if is_django_model_instance(field_value):
                # Customize only if the related model is User
                if isinstance(field_value, User):
                    field_value = {
                        "id": field_value.id,
                        "username": field_value.username,
                    }
                else:
                    # Safe for all other models
                    field_value = convert_model_to_dict(field_value)

            my_dict[field_name] = field_value

    except Exception:
        log.exception("Error while converting model to dict")
        return my_dict

    return my_dict
