# notes/permissions/note_permissions.py

from rest_framework.permissions import BasePermission
from notes.models import Note

class IsOwnerOrAdmin(BasePermission):
    """
    Allow:
    - Admins to delete/update any note.
    - Users to delete/update only their own notes.
    """

    def has_permission(self, request, view):
        # Safe methods like GET, POST allowed for all authenticated users
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.user.role == "admin":
            return True
        return obj.created_by == request.user
