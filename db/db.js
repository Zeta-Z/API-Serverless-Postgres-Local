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


*/
const getUsers = async(event) =>{

    const query = await pool.query('SELECT * FROM example1 ORDER BY id ASC')
    //const users = json(query)
    return Responses._200(query)
}

/*

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
};
*/
const getUserById = async (event) =>{
    
    const {ID} = event.pathParameters
    const query = await pool.query('SELECT * FROM example1 WHERE id =  $1', [ID]);
    //const task = JSON.parse(query)
    return Responses._200(query);
};
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

*/
const updateUser  = async (event) =>{

    const {id} = event.pathParameters;
    const {name} = JSON.parse(event.body);
    console.log(name,id)
    const query = await pool.query('UPDATE example1 SET name = $1 WHERE id = $2', [name,id]);
    const query2 = await pool.query('SELECT * FROM example1 WHERE id = $1 ',[id])

    return {

        statusCode: 200,
        body: JSON.stringify(query2,"Contacto actualizado exitosamente")
    }
}
/*
const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};
*/

const deleteUser = async (event) =>{

    const {id} = event.pathParameters;
    const query = await pool.query('DELETE FROM example1 where id = $1',[id]);
    return{
        statusCode: 200,
        body: JSON.stringify("Contacto eliminado exitosamente!")
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

