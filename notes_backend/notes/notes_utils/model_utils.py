import logging
from django.db import models
log = logging.getLogger(__name__)


# Example function to check if a value is a Django model instance
def is_django_model_instance(value):
    return isinstance(value, models.Model)


def convert_model_to_dict(instance):
    my_dict = {}
    try:
        for field in instance._meta.fields:
            field_name = field.name
            field_value = getattr(instance, field_name)
            if is_django_model_instance(field_value):
                field_value = convert_model_to_dict(field_value)
            my_dict[field_name] = field_value
    except Exception:
        log.exception("Error happened")
        return my_dict
    return my_dict


def convert_object_list_to_list(instance_list):
    _list = []
    for instance in instance_list:
        _dict = convert_model_to_dict(instance)
        _list.append(_dict)
    return _list



def apply_filters(instance, filters):
    # queryset = instance.objects.none()
    queryset = instance.filter(**filters).first()
    log.info("query_set Len %s", (queryset))
    query_dict = convert_model_to_dict(queryset)
    log.info("QueryDict %s", query_dict)
    return query_dict

