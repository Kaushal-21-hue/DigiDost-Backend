const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Define static doctors with their time slots
const doctors = [
    {
        id: 1,
        name: 'Dr. Asha Mehta',
        specialty: 'Cardiologist',
        timeSlots: ['9:00', '10:00', '11:30', '12:45']
    },
    {
        id: 2,
        name: 'Dr. Leela Gupta',
        specialty: 'Dentist',
        timeSlots: ['1:00', '2:00', '2:30']
    },
    {
        id: 3,
        name: 'Dr. Ramesh Verma',
        specialty: 'Neurologist',
        timeSlots: ['10:00', '11:00', '2:00', '3:00']
    },
    {
        id: 4,
        name: 'Dr. Rahul Tripathi',
        specialty: 'Neurologist',
        timeSlots: ['9:00', '10:30', '1:00', '4:00']
    },
    {
        id: 5,
        name: 'Dr. Vijay Singh',
        specialty: 'Gastroenterologist',
        timeSlots: ['11:00', '12:00', '3:00', '5:00']
    }
];

// ✅ GET: Doctors with available time slots
router.get('/all', async (req, res) => {
    try {
        // Temporarily return all doctors without filtering
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching doctors', error: err.message });
    }
});

// ✅ GET: All booked appointments
router.get('/allAppointments', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching appointments', error: err.message });
    }
});

// ✅ POST: Book appointment
router.post('/book', async (req, res) => {
    const { doctor, patientName, date, time } = req.body;

    if (!doctor || !patientName || !date || !time) {
        return res.status(400).json({ message: 'All fields required' });
    }

    try {
        // Prevent double booking
        const existing = await Appointment.findOne({ doctor, date, time });
        if (existing) {
            return res.status(409).json({ message: 'This time slot is already booked' });
        }

        const appointment = new Appointment({
            doctor,
            mobile: patientName,
            date,
            time
        });

        await appointment.save();

        console.log(`📱 SMS: Appointment booked with ${doctor} at ${time}`);
        res.status(201).json({ message: 'Appointment booked', appointment });
    } catch (err) {
        res.status(500).json({ message: 'Error booking appointment', error: err.message });
    }
});

// ✅ DELETE: Delete appointment
router.delete('/delete/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting appointment', error: err.message });
    }
});

module.exports = router;
