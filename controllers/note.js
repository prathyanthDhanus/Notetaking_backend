const noteSchema = require("../models/note");

module.exports = {
  //------------- create notes ---------------

  createNote: async (req, res) => {
    const { title, description, colour } = req.body;
    const userId = req.params.id;
    
    if(!title,!description,!colour){
        return res.status(499).json({
            status: "Failure",
            Message: "All fields required",
          });
    }
    
    const newNote = new noteSchema({
      title: title,
      description: description,
      colour: colour,
      user: userId,
    });
    await newNote.save();

    return res.status(200).json({
      status: "Success",
      Message: "Note saved successfully",
    });
  },

  //------------------- get notes ------------------

  getNotes: async (req, res) => {
    const userId = req.params.id;
    const findNotes = await noteSchema.find({ user: userId, isDeleted: false });

    if (findNotes.length > 0) {
      return res.status(200).json({
        status: "Success",
        Message: "Note fetched successfully",
        data: findNotes,
      });
    }

    return res.status(404).json({
      status: "Failure",
      Message: "Notes not found",
    });
  },

  //----------------- get a single task --------------

  getAnote : async(req,res)=>{
      const taskId = req.params.id;
      const findNotes = await noteSchema.findById(taskId);

      if(findNotes.isDeleted===false){
        return res.status(200).json({
            status: "Success",
            Message: "Note fetched successfully",
            data: findNotes,
          });
      }
      return res.status(404).json({
        status: "Failure",
        Message: "Notes not found",
      });
  },

  //--------------------- update notes --------------------

  updateNote: async (req, res) => {
    const taskId = req.params.id;
    const data = req.body;

    const updateTask = await noteSchema.findByIdAndUpdate(taskId, data, {
      new: true,
    });

    if (!updateTask) {
      return res.status(500).json({
        status: "Failure",
        Message: "Something went wrong",
      });
    }
    return res.status(200).json({
      status: "Success",
      Message: "Task updated successfully",
      data: updateTask,
    });
  },

  //---------------------- delete notes ---------------------

  deleteNote: async (req, res) => {

    const taskId = req.params.id;

    const findNotes = await noteSchema.findById(taskId);

    if (!findNotes) {
      return res.status(404).json({
        status: "Failure",
        Message: "No task available",
      });
    }

    findNotes.isDeleted = true;
    findNotes.save();
    return res.status(404).json({
      status: "Success",
      Message: "Note deleted successfully",
    });
  },
};
