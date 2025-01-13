const express = require('express');
const { body, query, validationResult  } = require('express-validator');
const RentalController = require('../controllers/rentalController');
const router = express.Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Book Car Rental
router.post(
  '/book',
  [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('car_model').notEmpty().withMessage('Car model is required.'),
    body('start_date').isISO8601().withMessage('Valid start date is required.'),
    body('end_date').isISO8601().withMessage('Valid end date is required.'),
    handleValidationErrors,
  ],
  RentalController.bookCarRental
);

// View Rental Details
router.get(
  '/details',
  [
    query('email').isEmail().withMessage('Valid email is required.'),
    handleValidationErrors,
  ],
  RentalController.viewRentalDetails
);

// View All Rentals
router.get('/all', RentalController.viewAllRentals);

// Cancel Car Rental
router.post(
  '/cancel',
  [
    body('email').isEmail().withMessage('Valid email is required.'),
    body('car_model').notEmpty().withMessage('Car model is required.'),
    handleValidationErrors,
  ],
  RentalController.cancelCarRental
);

// Modify Rental Duration
router.put(
  '/modify',
  [
    body('email').isEmail().withMessage('Valid email is required.'),
    body('new_start_date').isISO8601().withMessage('Valid new start date is required.'),
    body('new_end_date').isISO8601().withMessage('Valid new end date is required.'),
    handleValidationErrors,
  ],
  RentalController.modifyRentalDuration
);

module.exports = router;
