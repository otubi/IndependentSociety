const controller = (Model, modelName) => {
  const name = modelName || "data";

  return {
    // Create
    add: async (req, res) => {
      try {
        const doc = await Model.create(req.body);
        res.status(201).json({
          status: "success",
          data: { [name]: doc },
        });
      } catch (err) {
        res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
    },

    // Get all
    getAll: async (req, res) => {
      try {
        const docs = await Model.find();
        res.status(200).json({
          status: "success",
          total: docs.length, 
          data: { [name]: docs },
        });
      } catch (err) {
        res.status(500).json({
          status: "failed",
          message: err.message,
        });
      }
    },

    
    getOne: async (req, res) => {
      try {
        const doc = await Model.findById(req.params.id);
        if (!doc) {
          return res.status(404).json({
            status: "failed",
            message: `${name} not found`,
          });
        }

        res.status(200).json({
          status: "success",
          data: { [name]: doc },
        });
      } catch (err) {
        res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
    },

    // Update
    update: async (req, res) => {
      try {
        const toUpdate = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!toUpdate) {
          return res.status(404).json({
            status: "failed",
            message: `${name} not found`,
          });
        }

        res.status(200).json({
          status: "success",
          data: { [name]: toUpdate },
        });
      } catch (err) {
        res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
    },

    getByQuery: async (req, res) => {
      try {
        const query = req.query;
        console.log(req.query) 
        const docs = await Model.find(query);

        if (docs.length === 0) {
          return res.status(404).json({
            status: "failed",
            message: `No ${name} found matching query`,
          });
        }

        res.status(200).json({
          status: "success",
          total: docs.length,
          data: { [name]: docs },
        });
      } catch (err) {
        res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
    },

    // Delete
    delete: async (req, res) => {
      try {
        const toDelete = await Model.findByIdAndDelete(req.params.id);
        if (!toDelete) {
          return res.status(404).json({
            status: "failed",
            message: `${name} not found`,
          });
        }

        res.status(204).json({
          status: "success",
          data: null,
        });
      } catch (err) {
        res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
    },
  };
};

module.exports = controller;
