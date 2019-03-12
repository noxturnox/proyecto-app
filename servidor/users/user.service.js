const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validacion
    if (await User.findOne({ username: userParam.username })) {
        throw 'Nombre de usuario "' + userParam.username + '" ya existe';
    }

    const user = new User(userParam);

    // contraseña hash
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // se guarda el usuario
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validacion
    if (!user) throw 'Usuario no encontrado';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Nombre de usuario "' + userParam.username + '" ya existe';
    }

    // contraseña hash si fue introducida
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // se copia las propiedades userParam del usuario
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}