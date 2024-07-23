import mongoose, { Document, Schema } from 'mongoose';

export interface Message extends Document {
  feedback: string;
  name: string;
  email: string;
  image: string;
}

export interface Space extends Document {
  name: string;
  image: string;
  headline: string;
  description: string;
  isDarkTheme: boolean;
  thankyouPageTitle: string;
  thankyouPageText: string;
  sticker: string;
  messages: Message[];
  owner: mongoose.Schema.Types.ObjectId;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  feedback: {
    type: String,
    required: [true, 'feedback is required'],
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
});

const SpaceSchema: Schema<Space> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  image: {
    type: String,
    required: [true, 'image is required'],
  },
  headline: {
    type: String,
    required: [true, 'headline is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  isDarkTheme: {
    type: Boolean,
    default: true,
  },
  thankyouPageTitle: {
    type: String,
    // default: 'Thank you',
  },
  thankyouPageText: {
    type: String,
    default: 'Your feedback means a lot to us',
  },
  sticker: {
    type: String,
    default: 'https://media.giphy.com/media/8qD1FHjc4wllVBL3ln/giphy.gif?cid=ecf05e47gvya2nlu06oll65e05mxeg23paqfdhwynqmzbbyf&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  },
  messages: [MessageSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export const SpaceModel = mongoose.models.Space || mongoose.model<Space>('Space', SpaceSchema);
export const MessageModel = mongoose.models.Message || mongoose.model<Message>('Message', MessageSchema);
