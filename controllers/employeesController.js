const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ 'message': 'No employees found' })
    res.json(employees)
}

const createNewEmployee = async (req, res) => {
    // My Code
    const { firstname, lastname } = req.body;
    if (!firstname || !lastname) {
        return res.status(400).json({ 'message': 'First and last names are required' })
    }

    try {
        const result = await Employee.create({ firstname, lastname });
        res.status(201).json(result)
    } catch (error) {
        console.log(error);
    }

    // Dave's Code
    // if (!req?.body?.firstname || !req?.body?.lastname) {
    //     return res.status(400).json({ 'message': 'First and last names are required' })
    // }

    // try {
    //     const result = await Employee.create({
    //         firstname: req.body.firstname,
    //         lastname: req.body.lastname
    //     });

    //     res.status(201).json(result)
    // } catch (error) {
    //     console.log(error);
    // }
}

const updateEmployee = async (req, res) => {
    // My Code
    const { id, firstname, lastname } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Employee ID is required.' });
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
        { _id: id },
        { firstname, lastname },
        { new: true, runValidators: true }
    ).exec();

    if (!updatedEmployee) {
        return res.status(400).json({ "message": `No employees matches ID ${id}.` });
    }

    res.json(updatedEmployee);

    // Dave's Code
    // if (!req?.body?.id) {
    //     return res.status(400).json({ 'message': 'ID parameter is required.' });
    // }

    // const employee = await Employee.findOne({ _id: req.body.id }).exec();
    // if (!employee) {
    //     return res.status(204).json({ 'message': `No employees matches ID ${req.body.id}.` });
    // }
    // if (req.body?.firstname) employee.firstname = req.body.firstname;
    // if (req.body?.lastname) employee.lastname = req.body.lastname;
    // const result = await employee.save();
    // res.json(result);
}

const deleteEmployee = async (req, res) => {
    // My Code
    const { id } = req.body;
    const deletedEmployee = await Employee.findOneAndDelete({ _id: id }).exec();
    if (!deletedEmployee) {
        return res.status(400).json({ "message": `No employees matches ID ${id}.` });
    }

    res.json(deletedEmployee);

    // Dave's Code
    // if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee id required.' });
    // const employee = await Employee.findOne({ _id: req.body.id }).exec();
    // if (!employee) {
    //     return res.status(204).json({ 'message': `No employees matches ID ${req.body.id}.` });
    // }
    // const result = await employee.deleteOne({ _id: req.body.id });
    // res.json(result);
}

const getEmployee = async (req, res) => {
    // My Code
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Employee ID is required.' });
    }

    const employee = await Employee.findOne({ _id: id }).exec();
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${id} not found` });
    }
    res.json(employee);

    // Dave's Code
    // if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee id required.' });
    // const employee = await Employee.findOne({ _id: req.params.id }).exec();
    // if (!employee) {
    //     return res.status(204).json({ 'message': `No employees matches ID ${req.body.id}.` });
    // }
    // res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}