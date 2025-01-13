
const users = [];
const cars = [
    { id: 1, model: 'Toyota Camry', is_available: true },
    { id: 2, model: 'Honda Accord', is_available: true },
];
const rentals = [];

class RentalController {
    static async bookCarRental(req, res) {
        const { name, email, car_model, start_date, end_date } = req.body;

        const car = cars.find((c) => c.model === car_model && c.is_available);
        if (!car) {
            return res.status(400).json({ message: 'Car not available' });
        }

        const user = { name, email };
        users.push(user);

        const rental = { user, car, start_date, end_date, is_active: true };
        rentals.push(rental);

        car.is_available = false;

        res.json({
            message: 'Car rental confirmed.',
            rental_details: rental,
        });
    };

    static async viewRentalDetails(req, res) {
        const { email } = req.query;

        const rental = rentals.find((r) => r.user.email === email && r.is_active);
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        res.json({ rental_details: rental });
    };

    static async viewAllRentals(req, res) {
        const activeRentals = rentals.filter((r) => r.is_active);
        res.json({ rentals: activeRentals });
    };

    static async cancelCarRental(req, res) {
        const { email, car_model } = req.body;

        const rental = rentals.find(
            (r) => r.user.email === email && r.car.model === car_model && r.is_active
        );
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        rental.is_active = false;

        const car = cars.find((c) => c.model === car_model);
        car.is_available = true;

        res.json({ message: 'Car rental canceled successfully.' });
    };

    static async modifyRentalDuration(req, res) {
        const { email, new_start_date, new_end_date } = req.body;

        const rental = rentals.find((r) => r.user.email === email && r.is_active);
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        rental.start_date = new_start_date;
        rental.end_date = new_end_date;

        res.json({
            message: 'Rental duration updated successfully.',
            new_rental_duration: { start_date: new_start_date, end_date: new_end_date },
        });
    };
}

module.exports = RentalController;