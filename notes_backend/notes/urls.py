from django.urls import path
from notes.endpoints.authuser_views import RegisterUserView
from notes.endpoints.note_views import NoteCRUDView


urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register-user'),
    path("notes/", NoteCRUDView.as_view()),
    path("notes/<int:note_id>/", NoteCRUDView.as_view()),

]

