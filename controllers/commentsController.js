const express = require("express");
const comments = express.Router({ mergeParams: true });

const {
  getAllCommentsByMemory,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../queries/comments.js");
const validateComment = require("../validations/validateComment.js");

comments.get("/", async (req, res) => {
    const { memory_id } = req.params; // Extract memory_id from req.params
    console.log(memory_id);
  
    const parsedMemoryId = parseInt(memory_id, 10);
    if (isNaN(parsedMemoryId)) {
      res.status(400).json({ error: "Invalid memory_id. Please provide a valid integer." });
      return;
    }
  
    const { error, result } = await getAllCommentsByMemory(parsedMemoryId);
    if (error) {
      console.error("Error retrieving comments:", error);
      res.status(500).json({ error: "Server error" });
    } else {
      res.status(200).json(result);
    }
  });

comments.get("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { error, result } = await getComment(commentId);
  if (error) {
    console.error("Error retrieving comment:", error);
    res.status(500).json({ error: "Server error" });
  } else if (!result) {
    res.status(404).json({ error: "Comment not found" });
  } else {
    res.status(200).json(result);
  }
});

comments.post("/", validateComment, async (req, res) => {
  const { error, result } = await createComment(req.body);
  if (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Server error" });
  } else {
    res.status(201).json(result);
  }
});

comments.put("/:commentId", validateComment, async (req, res) => {
  const { commentId } = req.params;
  const { error, result } = await updateComment(commentId, req.body);
  if (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Server error" });
  } else if (!result) {
    res.status(404).json({ error: "Comment not found" });
  } else {
    res.status(200).json(result);
  }
});

comments.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { error, result } = await deleteComment(commentId);
  if (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Server error" });
  } else if (!result) {
    res.status(404).json({ error: "Comment not found" });
  } else {
    res.status(200).json(result);
  }
});

module.exports = comments;
