//Importing express and router
const express = require("express");
const group = require("../schemaModels/groupSchema");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const {
  validateEmail,
  validatePassword,
} = require("../middlewares/middlewares");

const router = new express.Router();

router.post("/groups", (req, res) => {
  const body = req.body;
  group
    .insertMany(req.body)
    .then((data) => res.status(200).send(data))

    .catch((err) => res.status(404).send(err));
});



router.get("/groups", (req, res) => {
  const query = req.query.search;
  group.find({ groupName: { $regex: new RegExp(query, 'i') } }).then(async (data) => {
    if (data) {
     
      res.status(200).send(data);
    } else {
      res.status(406).send("No Data Found");
    }
  });
});


const checkPermissions = async (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  try {
    const groupFind = await group.findById(groupId);

    // Check if the group exists
    if (!groupFind) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // Check if the user has permission (replace 'userId' with actual user ID)
    if (groupFind.createdBy !== userId /* Add additional admin checks if needed */) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    // Pass control to the next middleware/route handler
    next();
  } catch (error) {
    console.error('Error checking permissions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Express route to delete a group
router.delete('/groups/:groupId/:userId', checkPermissions, async (req, res) => {
  const groupId = req.params.groupId;

  try {
    const deletedGroup = await group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/groups/:groupId/:userId/members', checkPermissions, async (req, res) => {
  const groupId = req.params.groupId;
  const { members } = req.body;

  try {
    // Validate that members is an array of user IDs
    if (!Array.isArray(members) || members.some(member => typeof member !== 'string')) {
      return res.status(400).json({ error: 'Invalid members format' });
    }

    const updatedGroup = await group.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: { $each: members } } },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.json({ message: 'Members added successfully', group: updatedGroup });
  } catch (error) {
    console.error('Error adding members to group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const checkGroupMembership = async (req, res, next) => {
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  

  try {
    const groupfind = await group.findOne({ _id: groupId, members: userId });

    if (!groupfind) {
      return res.status(403).json({ error: 'You are not a member of this group' });
    }

    // Attach the group to the request for use in subsequent middleware/route handler
    req.group = groupfind;

    next();
  } catch (error) {
    console.error('Error checking group membership:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Express route to send a message in a group
router.post('/groups/:groupId/:userId/messages', checkGroupMembership, async (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.params.userId;
  const { content } = req.body;
  const sender = userId; // Replace with actual user ID from authentication

  try {
    // Validate message content
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Invalid message content' });
    }

    // Update the group with the new message
    const updatedGroup = await group.findByIdAndUpdate(
      groupId,
      {
        $push: {
          messages: {
            content,
            sender
          }
        }
      },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ error: 'Group not found' });
    }

    res.json({ message: 'Message sent successfully', group: updatedGroup });
  } catch (error) {
    console.error('Error sending message in group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/groups/:groupId/:userId/messages/:messageId/like', checkGroupMembership, async (req, res) => {
  const groupId = req.params.groupId;
  const messageId = req.params.messageId;
  const userId = req.params.userId;

  try {
    // Update the group with the new like
    const updatedGroup = await group.findOneAndUpdate(
      { _id: groupId, 'messages._id': messageId },
      {
        $addToSet: {
          'messages.$.likes': userId,
        },
      },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ error: 'Group or message not found' });
    }

    // Find the liked message
    const likedMessage = updatedGroup.messages.find(message => message._id.toString() === messageId);

    res.json({ message: 'Message liked successfully', likedMessage });
  } catch (error) {
    console.error('Error liking message in group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
