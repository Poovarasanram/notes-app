from notes.db_models.authuser import AuthUserModel

class AuthUserController:
    
    def register_user(self, name, role, password):
        user_model = AuthUserModel()
        new_user = user_model.create_user(name, role, password)
        return new_user
