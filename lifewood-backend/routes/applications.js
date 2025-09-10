const express = require('express');
const router = express.Router();

const Application = require('../models/application'); // ✅ fixed filename
const { sendEmail } = require('../utils/mailer');

// GET all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    console.error('❌ Error fetching applications:', err.message);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// POST new application
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      age,
      degree,
      experience,
      email,
      project,
      projectName,
    } = req.body;

    const application = new Application({
      fullName,
      age,
      degree,
      experience,
      email,
      project,
      projectName,
      status: 'PENDING',
    });

    await application.save();

    // Send confirmation email
    const subject = 'Application Received';
    const message = `Hi ${fullName},\n\nThank you for applying to the project "${projectName}". We have received your application and will get back to you soon.\n\nBest regards,\nYour Team`;

    await sendEmail(email, subject, message);

    res.status(201).json(application);
  } catch (err) {
    console.error('❌ Error creating application:', err.message);
    res.status(500).json({ error: 'Failed to create application' });
  }
});

// PUT /api/applications/:id/accept - Accept an application
router.put('/:id/accept', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = 'ACCEPTED';
    await application.save();

    // Send acceptance email
    const subject = '🎉 Application Accepted';
    const message = `Hi ${application.fullName},\n\nGreat news! Your application for "${application.projectName}" has been accepted.\n\nWelcome aboard!\n\nBest regards,\nYour Team`;

    await sendEmail(application.email, subject, message);

    res.json(application);
  } catch (error) {
    console.error('❌ Error accepting application:', error.message);
    res.status(500).json({ error: 'Failed to accept application' });
  }
});

// PUT /api/applications/:id/decline - Reject an application
router.put('/:id/decline', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = 'REJECTED'; // ✅ fixed to match schema
    await application.save();

    // Send rejection email
    const subject = 'Application Status Update';
    const message = `Hi ${application.fullName},\n\nThank you for your interest. We regret to inform you that your application for "${application.projectName}" has not been accepted at this time.\n\nWe wish you the best in your future endeavors.\n\nBest regards,\nYour Team`;

    await sendEmail(application.email, subject, message);

    res.json(application);
  } catch (error) {
    console.error('❌ Error rejecting application:', error.message);
    res.status(500).json({ error: 'Failed to reject application' });
  }
});

// PUT /api/applications/:id - Update an application
router.put('/:id', async (req, res) => {
  try {
    const { fullName, age, degree, experience, email, projectName, status } = req.body;

    const updatedApp = await Application.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        age,
        degree,
        experience,
        email,
        projectName,
        status,
      },
      { new: true } // return updated document
    );

    if (!updatedApp) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(updatedApp);
  } catch (error) {
    console.error('❌ Error updating application:', error.message);
    res.status(500).json({ error: 'Failed to update application' });
  }
});

// DELETE /api/applications/:id - Delete an application
router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting application:', error.message);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

module.exports = router;
