# notes/endpoints/note_views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from notes.controllers.note_controllers import NoteController
from notes.models import Note
from notes.permissions.permissions import IsOwnerOrAdmin

class NoteCRUDView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        controller = NoteController()
        page = int(request.query_params.get('page', 1))
        page_size = int(request.query_params.get('page_size', 10))
        search = request.query_params.get('search', None)

        notes = controller.list_notes(
            user=request.user,
            page=page,
            page_size=page_size,
            search=search
        )
        return Response(notes, status=status.HTTP_200_OK)



    def post(self, request):
        data = request.data
        title = data.get("title")
        content = data.get("content")

        if not title or not content:
            return Response({"error": "Title and content required"}, status=status.HTTP_400_BAD_REQUEST)

        controller = NoteController()
        note = controller.create_note(title, content, request.user)
        return Response(note, status=status.HTTP_201_CREATED)

    def put(self, request, note_id):
        from notes.models import Note 
        try:
            note = Note.objects.get(id=note_id)
        except Note.DoesNotExist:
            return Response({"error": "Note not found"}, status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, note)

        data = request.data
        title = data.get("title")
        content = data.get("content")

        controller = NoteController()
        updated = controller.update_note(note_id, title, content, request.user)
        return Response(updated, status=status.HTTP_200_OK)

    def delete(self, request, note_id):
        try:
            note = Note.objects.get(id=note_id)
        except Note.DoesNotExist:
            return Response({"error": "Note not found"}, status=status.HTTP_404_NOT_FOUND)

        self.check_object_permissions(request, note)

        controller = NoteController()
        deleted = controller.delete_note(note_id, request.user)
        if deleted:
            return Response({"message": "Note deleted"}, status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Delete failed"}, status=status.HTTP_400_BAD_REQUEST)
