from notes.notes_utils.model_utils import convert_model_to_dict
from notes.models import User
from django.contrib.auth.hashers import make_password

class AuthUserModel:
    
    def create_user(self, name, role, password):
        hashed_pwd = make_password(password)
        user = User.objects.create(
            username=name,
            role=role,
            password=hashed_pwd
        )
        return convert_model_to_dict(user)

