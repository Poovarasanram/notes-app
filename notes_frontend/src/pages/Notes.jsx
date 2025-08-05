import { useEffect, useState } from "react";
import {
  Table,
  message,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Spin,
} from "antd";
import axios from "axios";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [form] = Form.useForm();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const fetchNotes = async (page = 1, pageSize = 6) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/notes/?page=${page}&page_size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setNotes(response.data.results);
      setTotalItems(response.data.total);
      setCurrentPage(response.data.page);
    } catch (error) {
      console.error("Fetch notes error:", error);
      message.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(currentPage, pageSize);
  }, []);

  const handleDelete = async (id) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      await axios.delete(`http://127.0.0.1:8000/api/notes/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      message.success("Note deleted");
      fetchNotes(currentPage, pageSize);
    } catch (error) {
      console.error("Delete failed:", error);
      message.error("Failed to delete note");
    }
  };

  const handleUpdate = (note) => {
    setEditingNote(note);
    form.setFieldsValue(note);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingNote(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const accessToken = localStorage.getItem("access_token");

      if (editingNote) {
        await axios.put(
          `http://127.0.0.1:8000/api/notes/${editingNote.id}/`,
          values,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        message.success("Note updated successfully");
      } else {
        await axios.post(`http://127.0.0.1:8000/api/notes/`, values, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        message.success("Note added successfully");
      }

      setIsModalOpen(false);
      fetchNotes(currentPage, pageSize);
    } catch (error) {
      console.error("Save error:", error);
      message.error("Failed to save note");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "User",
      dataIndex: "created_by",
      key: "created_by",
      render: (user) => user?.username || "Unknown",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) =>
        new Date(text).toLocaleString("en-IN", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>Notes</h2>
        <Button type="primary" onClick={handleAdd}>
          + Add Note
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={notes}
          columns={columns}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalItems,
            onChange: (page, size) => {
              setCurrentPage(page);
              fetchNotes(page, size);
            },
          }}
        />
      )}

      <Modal
        title={editingNote ? "Update Note" : "Add Note"}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        okText={editingNote ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Notes;
