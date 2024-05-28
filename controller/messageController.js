const express = require("express");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId } = require("../socket/socket");
const { io } = require("../socket/socket");

const sendMessage = asyncHandler(async (req, res) => {
  const senderId = req.user.id;
  const receiverId = req.params.id;
  const { message } = req.body;
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }
  let newMessage = new Message({ senderId, receiverId, message });
  await conversation.messages.push(newMessage._id);
  //* await newMessage.save(); if takes 1 sec
  //* await conversation.save() it will wait for 1 sec
  //TODO ! this will run parallel
  Promise.all([conversation.save(), newMessage.save()]);

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    console.log(
      "receiver socket id ",
      receiverId,
      " and newMessage is ",
      newMessage
    );
    io.to(receiverId).emit("newMessage", newMessage);
  }
  res.status(200).send({ message: `message sent successfully`, success: true });
});

const getMessage = asyncHandler(async (req, res) => {
  const { id: UserToChatId } = req.params; // ! check the req.params.id
  const senderId = req.user.id;
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, UserToChatId] },
  }).populate("messages");
  if (!conversation) {
    return res.status(200).json({ error: "No conversation exist" });
  }
  const messages = conversation.messages;
  res.status(200).send(messages);
});
module.exports = { sendMessage, getMessage };

//this 6643c966b556558520fabdce 66439ba894c24c7e993097b8 null
//this 6638ce08a31c1edfd71dfc0f 66439ba894c24c7e993097b8
