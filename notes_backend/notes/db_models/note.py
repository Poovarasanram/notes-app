# notes/db_models/note_model.py

from notes.models import Note
from notes.notes_utils.model_utils import convert_model_to_dict

class NoteModel:
    
    def create_note(self, title, content, user):
        note = Note.objects.create(
            title=title,
            content=content,
            created_by=user
        )
        return convert_model_to_dict(note)
    
    def list_notes(self, user):
        if user.role == "admin": 
            notes = Note.objects.all()
        else:
            notes = Note.objects.filter(created_by=user)
        return [convert_model_to_dict(n) for n in notes]
    
    def update_note(self, note_id, title, content, user):
        try:
            note = Note.objects.get(id=note_id, created_by=user)
            note.title = title
            note.content = content
            note.save()
            return convert_model_to_dict(note)
        except Note.DoesNotExist:
            return None

    def delete_note(self, note_id, user):
        try:
            note = Note.objects.get(id=note_id, created_by=user)
            note.delete()
            return True
        except Note.DoesNotExist:
            return False
