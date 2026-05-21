import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUserId = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUserId);
    } catch (error) {
        console.error("Error in getUsersForSidebbar", error.message);
        res.status(500).json({error: "Internal server error"})
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;

        // Validate user ID format
        if (!userToChatId) {
            return res.status(400).json({error: "User ID is required"});
        }

        // Prevent user from chatting with themselves
        if (userToChatId === myId.toString()) {
            return res.status(400).json({error: "Cannot chat with yourself"});
        }

        const messages = await Message.find({
            $or:[
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Validate input
    if (!receiverId) {
      return res.status(400).json({ error: "Receiver ID is required" });
    }

    if (!text && !image) {
      return res.status(400).json({ error: "Message must contain text or image" });
    }

    // Validate text length
    if (text && text.trim().length > 5000) {
      return res.status(400).json({ error: "Message is too long (max 5000 characters)" });
    }

    // Prevent user from messaging themselves
    if (receiverId === senderId.toString()) {
      return res.status(400).json({ error: "Cannot send message to yourself" });
    }

    // Check if receiver exists
    const receiverExists = await User.findById(receiverId);
    if (!receiverExists) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    let imageUrl;
    if (image) {
      // Validate base64 image
      if (typeof image !== 'string' || !image.startsWith('data:image')) {
        return res.status(400).json({ error: "Invalid image format" });
      }

      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image, {
        resource_type: 'auto',
        quality: 'auto',
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text: text ? text.trim() : null,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
