const express = require("express");
const memories = express.Router();
const validateMemory = require("../validations/validateMemory.js");

const commentsController = require("./commentsController.js");

const {
    getAllMemories,
    getMemory,
    createMemory,
    deleteMemory,
    updateMemory,
} = require("../queries/memories.js");

memories.use("/:memory_id/comments", commentsController);

memories.get("/", async (req, res) => {
    const { error, result } = await getAllMemories();
    if (error) {
        res.status(500).json({ error: "server error" });
    } else {
        // Modify the image URLs to remove the extra "/assets/" segment
        const memoriesWithFixedImageURLs = result.map(memory => ({
            ...memory,
            image: memory.image.replace("/", "/")
        }));

        res.status(200).json(memoriesWithFixedImageURLs);
    }
});

memories.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { error, result } = await getMemory(id);
    if (error) {
        if (error.code === 0) {
            res.status(404).json({ error: "memory not found" });
        } else {
            res.status(500).json({ error: "server error" });
        }
    } else {
        res.status(200).json(result);
    }
});


memories.post("/", validateMemory, async (req, res) => {
    const {error, result} = await createMemory(req.body);
    if (error) {
        console.log(error);
        res.status(500).json({ error: "server error"});
    } else {
        res.status(201).json(result);
    }
});

memories.put("/:id", validateMemory, async (req, res) => {
    const {id} = req.params;
    const {error, result} = await updateMemory(id, req.body);
    if (error) {
        console.log(error);
        res.status(500).json({ error: "server error"});
    } else {
        res.status(200).json(result);
    }
});

memories.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const {error, result} = await deleteMemory(id);
    if (error) {
        res.status(404).json({ error: "memory not found"});
    } else {
        res.status(201).json(result);
    }
});

module.exports = memories;