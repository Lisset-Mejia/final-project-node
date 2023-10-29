const express = require('express');
const jwt = require('jsonwebtoken');
const employee = express.Router();
const db = require('../config/database');

employee.post("/agregar", async (req, res, next) => {
    console.log("Llegó");
    const {name, last_name , phone, email , address} = req.body;
    if (name && last_name && phone && email && address) {
        let query = "INSERT INTO employees (name, last_name, phone , email, address) ";
        query += `VALUES ('${name}', '${last_name}', '${phone}', '${email}', '${address}')`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(200).json({
                code: 200,
                message: "Empleado agregado Correctamente"
            });
        }
        return res.status(200).json({
            code: 500,
            message: "Ocurrió un error"
        });
    }
    return res.status(200).json({
        code: 500,
        message: "Campos incompletos"
    });
});

employee.patch("/modificar", async (req, res, next) => {
    const { employee_id, name, last_name, phone, email, address } = req.body;
    if (employee_id && name && last_name && phone && email && address) {
        let query = `UPDATE employees SET name='${name}', last_name='${last_name}',`;
        query += `phone='${phone}', email='${email}', address='${address }' WHERE employee_id=${employee_id}`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(200).json({
                code: 200,
                message: "Empleado actualizado Correctamente"
            });
        }
        return res.status(200).json({
            code: 500,
            message: "Ocurrió un error"
        });
    }
    return res.status(200).json({
        code: 500,
        message: "Campos incompletos"
    });
});

employee.delete("/eliminar", async (req, res, next) => {
    const { employee_id } = req.body;
    if (employee_id) {
        const query = `DELETE FROM employees WHERE employee_id=${employee_id}`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(200).json({
                code: 200,
                message: "Empleado eliminado"
            });
        }
        return res.status(200).json({
            code: 500,
            message: "Ocurrió un error"
        });
    }
    return res.status(200).json({
        code: 500,
        message: "Campos incompletos"
    });
});

employee.post("/buscar", async (req, res) => {
    const { name } = req.body.data;
    if (name) {
        const query = `SELECT * FROM employees WHERE name='${name}'`;
        const rows = await db.query(query);

        if (rows.length > 0) {
            return res.status(200).json({
                code: 200,
                message: "Empleado encontrado",
                empleado: rows
            });
        }
        return res.status(200).json({
            code: 500,
            message: "Ocurrió un error"
        });
    }
    return res.status(200).json({
        code: 500,
        message: "Campos incompletos"
    });
});

employee.get("/", async (req, res, next) => {
    const emp = await db.query("SELECT * FROM employees");
    return res.status(200).json({
        code: 200,
        message: emp
    });
});

module.exports = employee;