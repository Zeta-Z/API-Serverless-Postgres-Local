const { Pool } = require('pg');
const Responses = require('../responses/response');

//Aqui configuran sus credenciales
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Auto2022',
    database: 'example1',
    port: '5432'
});

/*
const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};
*/

/*
const createUser = async (req, res) => {
    const { id, name } = req.body;
    const response = await pool.query('INSERT INTO example1 (id, name) VALUES ($1, $2)', [id, name]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: {id, name}
        }
    })
};
*/
const createUser = async(event)=>{

    let messages1= "Created!"

    const {id, name } = JSON.parse(event.body);
    const query = await pool.query('INSERT INTO example1 (id,name) VALUES ($1,$2)', [id,name], (error, results) => {
        if (error) {
          throw error
        }
        else{
            return messages1
        }
      })

    

};

/*
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const response =await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};
*/
module.exports = {
    //getUsers,
    //getUserById,
    createUser
    //updateUser,
    //deleteUser
};

