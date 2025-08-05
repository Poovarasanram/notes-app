# notes/controllers/note_controllers.py

from notes.db_models.note import NoteModel

class NoteController:

    def create_note(self, title, content, user):
        model = NoteModel()
        return model.create_note(title, content, user)

    def list_notes(self, user, page=1, page_size=8):
        model = NoteModel()
        return model.list_notes(user, page, page_size)

 
    def update_note(self, note_id, title, content, user):
        model = NoteModel()
        return model.update_note(note_id, title, content, user)

    def delete_note(self, note_id, user):
        model = NoteModel()
        return model.delete_note(note_id, user)
