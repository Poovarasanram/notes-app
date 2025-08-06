# notes/db_models/note_model.py

from notes.models import Note
from django.core.paginator import Paginator
from django.db.models import Q
from notes.notes_utils.model_utils import convert_model_to_dict

class NoteModel:
    
    def create_note(self, title, content, user):
        note = Note.objects.create(
            title=title,
            content=content,
            created_by=user
        )
        return convert_model_to_dict(note)
    

    def list_notes(self, user, page=1, page_size=8, search=None):
        if user.role == "Admin":
            notes = Note.objects.all()
        else:
            notes = Note.objects.filter(created_by=user)

        # 🔍 Apply search filter if present
        if search:
            notes = notes.filter(
                Q(title__icontains=search) |
                Q(content__icontains=search)
            )

        notes = notes.order_by('-id')
        paginator = Paginator(notes, page_size)
        page_obj = paginator.get_page(page)

        return {
            "results": [convert_model_to_dict(n) for n in page_obj],
            "total": paginator.count,
            "page": page_obj.number,
            "num_pages": paginator.num_pages,
            "has_next": page_obj.has_next(),
            "has_previous": page_obj.has_previous(),
        }
    
    def update_note(self, note_id, title, content, user):
        try:
            note = Note.objects.get(id=note_id )
            note.title = title
            note.content = content
            note.save()
            return convert_model_to_dict(note)
        except Note.DoesNotExist:
            return None

    def delete_note(self, note_id, user):
        try:
            note = Note.objects.get(id=note_id)
            note.delete()
            return True
        except Note.DoesNotExist:
            return False
