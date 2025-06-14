import { Schema, model } from "mongoose";

const calendarSchema = new Schema({
    id: { type: String, required: true, unique: true },
    year: { type: Number, required: true, min: 1900, max: 2100 },
    month: { type: Number, required: true, min: 1, max: 12 },
    days: { type: Number, required: true, min: 1, max: 31 },
    isHoliday: { type: Boolean, default: false },
    isWeekend: { type: Boolean, default: false },
    nameDay: { type: String, required: true },
    nameMonth: { type: String, required: true },
    holidayDescription: { type: String, default: null },
}, {
    timestamps: true,
});

const CalendarModel = model("Calendar", calendarSchema);

export { CalendarModel };