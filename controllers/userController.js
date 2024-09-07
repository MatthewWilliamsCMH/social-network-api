const { ObjectId } = require('mongoose').Types; //requires mongoose type object id, which we'll use in some of the functions
const { User, Thought, Reaction } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //post a user
    async postUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    //get a user
    async getOneUser(req, res) {
        try {
            const user = await User.findOne(
                { _id: req.params.userId }
            )
            .select('-__v'); //this ensures that it retrieves the most recent user data (in case it was updated in another process)

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID found.' })
            }
        } 
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
  
    //put a user
    async putUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body}, //what does $set do?
                {runValidators: true, new: true} //what is the new: true statement for?
            );
            res.json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
//HERE
  // Delete a student and remove them from the course
  async deleteStudent(req, res) {
    try {
      const student = await Student.findOneAndRemove({ _id: req.params.studentId });

      if (!student) {
        return res.status(404).json({ message: 'No such student exists' });
      }

      const course = await Course.findOneAndUpdate(
        { students: req.params.studentId },
        { $pull: { students: req.params.studentId } },
        { new: true }
      );

      if (!course) {
        return res.status(404).json({
          message: 'Student deleted, but no courses found',
        });
      }

      res.json({ message: 'Student successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an assignment to a student
  async addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);

    try {
      const student = await Student.findOneAndUpdate(
        { _id: req.params.studentId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      );

      if (!student) {
        return res
          .status(404)
          .json({ message: 'No student found with that ID :(' });
      }

      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove assignment from a student
  async removeAssignment(req, res) {
    try {
      const student = await Student.findOneAndUpdate(
        { _id: req.params.studentId },
        { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
        { runValidators: true, new: true }
      );

      if (!student) {
        return res
          .status(404)
          .json({ message: 'No student found with that ID :(' });
      }

      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
