from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from notes.controllers.authuser_controllers import AuthUserController

class RegisterUserView(APIView):
    
    def post(self, request):
        data = request.data
        name = data.get("name")
        role = data.get("role")
        password = data.get("password")

        if not all([name, role, password]):
            return Response({"error": "All fields are required (name, role, password)"}, status=status.HTTP_400_BAD_REQUEST)

        controller = AuthUserController()
        result = controller.register_user(name, role, password)
        return Response(result, status=status.HTTP_201_CREATED)
