import React, { useState } from 'react';

const SightingForm = () => {
    const [formData, setFormData] = useState({
        animalName: '',
        location: '',
        date: '',
        notes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="animalName">Animal Name:</label>
                <input
                    type="text"
                    id="animalName"
                    name="animalName"
                    value={formData.animalName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="notes">Notes:</label>
                <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                ></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default SightingForm;