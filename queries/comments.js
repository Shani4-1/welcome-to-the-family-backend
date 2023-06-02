const db = require("../db/dbConfig.js");

const getAllCommentsByMemory = async (memory_id) => {
    // Validate memory_id as an integer
    const memoryIdInt = parseInt(memory_id, 10);
    if (isNaN(memoryIdInt)) {
      return { error: "Invalid memory_id. Please provide a valid integer." };
    }
  
    try {
      const result = await db.any(
        `SELECT * FROM comments WHERE memory_id = $1`,
        [memoryIdInt]
      );
  
      return { result };
    } catch (error) {
      console.error("Error retrieving comments:", error);
      return { error };
    }
  };
  



const getComment = async (id) => {
    try {
        const result = await db.one(`SELECT * FROM comments WHERE id = $1`, [id]);

        return { result };
    } catch (error) {
        console.error("Error retrieving comment:", error); // Add error logging
        return { error };
    }
};

const createComment = async (comment) => {
    try {
        const result = await db.one(
            `INSERT INTO comments(commenter, content, is_favorite, memory_id)
            VALUES ($1, $2, $3, $4) 
            RETURNING *`,
            [comment.commenter, comment.content, comment.is_favorite, comment.memory_id]
        );
        return { result };
    } catch (error) {
        console.error("Error creating comment:", error); // Add error logging
        return { error };
    }
};

const deleteComment = async (id) => {
    try {
        const result = await db.one(
            `DELETE FROM comments WHERE id=$1 RETURNING *`,
            id
        );
        return { result };
    } catch (error) {
        console.error("Error deleting comment:", error); // Add error logging
        return { error };
    }
};

const updateComment = async (id, comment) => {
    try {
        const result = await db.one(
            `UPDATE comments SET commenter=$1, content=$2, is_favorite=$3, memory_id=$4 WHERE id=$5 RETURNING *`,
            [comment.commenter, comment.content, comment.is_favorite, comment.memory_id, id]
        );
        return { result };
    } catch (error) {
        console.error("Error updating comment:", error); // Add error logging
        return { error };
    }
};

module.exports = {
    getAllCommentsByMemory,
    getComment,
    createComment,
    deleteComment,
    updateComment
};
