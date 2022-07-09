import mongoose, { Schema } from "mongoose";
import timestamps from "mongoose-timestamp";

export const ActivitySchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    foreign_id: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: false,
    },
    extra: {
      type: Object,
    },
    time: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "activity" }
);

ActivitySchema.plugin(timestamps);

ActivitySchema.pre("find", function () {
  this.start = Date.now();
});

ActivitySchema.post("find", function (result) {
  console.log("find() took " + (Date.now() - this.start) + " millis");
});

module.exports = exports = mongoose.model("Activity", ActivitySchema);
