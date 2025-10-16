const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// Route 1 : Get all the notes created by the user using GET:/fetchallnotes Login required
try {
  router.get("/fetchallnotes", fetchuser, async (req, res) => {
    console.log("User from middleware:", req.user);
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Something went wrong" });
}

// Route 2 : Create a note  using POST:/postnotes Login required

router.post(
  "/postnotes",
  [
    body("title").not().isEmpty().withMessage("Title Cannot be empty"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("The description must be at least 5 characters long"),
    body("importance")
    .isInt({ min: 1 })
    .withMessage('Importance must be a positive integer'),
  ],
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);

    // validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //store the note in the database
      const notes = await Notes.create({
        title: req.body.title,
        description: req.body.description,
        importance: req.body.importance,
        user: req.user.id,
      });
      //save the notes in the database using save()
      notes.save;

      //return a successful message
      res.status(200).json({ message: "Notes saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

// Route 3 : Update a note  using PUT:/updatenotes Login required

router.put(
  "/updatenotes/:id",
  [
    body("title").not().isEmpty().withMessage("Title Cannot be empty"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("The description must be at least 5 characters long"),
    body("importance")
    .isInt({ min: 1 })
    .withMessage('Importance must be a positive integer'),
  ],
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    // validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // destructure the title,description and importance
      const { title, description, importance } = req.body;

      const newNote = {};

      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (importance) {
        newNote.importance = importance;
      }

      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(400).send("Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(400).send("Not allowed");
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);

      //return a successful message
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);


// Route 4 : Delete a note  using DELETE:/removenote Login required

router.delete(
  "/removenote/:id",fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    // validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(400).send("Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(400).send("Not allowed");
      }
      const removedNote = await Notes.findByIdAndDelete(note);
      res.status(200).json({message : "Note deleted successfully"});

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

module.exports = router;
