const db = require("../db/dbConfig.js");

const getAllMemories = async () => {
    try {
      const memories = await db.any("SELECT * FROM memories");
      return { result: memories };
    } catch (error) {
      return { error };
    }
  };
  

const getMemory = async (id) => {
    try {
        const result = await db.one(`SELECT * FROM memories WHERE id=${id}`);
        return {result}
    } catch (error) {
        return {error}
    }
};

const createMemory = async (memory) => {
    try {
        const result = await db.one(
            `INSERT INTO memories(name, image, description, year, is_favorite)
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING *;`,
            [memory.name, memory.image, memory.description, memory.year, memory.is_favorite]
        );
        return {result};
    } catch (error) {
        return {error};
    }
};

const deleteMemory = async (id) => {
    try {
        const result = db.one(
            `DELETE FROM memories WHERE id=$1 RETURNING *`,
             id
        );
        return {result};
    } catch (error) {
        return {error};
    }
};

const updateMemory = async (id, memory) => {
    try {
        console.log("Updating memory:", memory);
        const result = await db.one(
            `UPDATE memories SET name=$1, image=$2, description=$3, year=$4, is_favorite=$5 WHERE id=$6 RETURNING *`,
            [memory.name, memory.image, memory.description, memory.year, memory.is_favorite, id]
        );
        console.log('Update result:', result);
        return {result}    
    } catch (error) {
        return {error}
    }
};

module.exports = {
    getAllMemories,
    getMemory,
    createMemory,
    deleteMemory,
    updateMemory,
};

