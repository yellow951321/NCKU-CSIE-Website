import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';

const Award = faculty.define( 'award', {
    awardId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
        unique:        true,
    },
    profileId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
    },
    receivedYear: {
        type:      Sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
    },
    receivedMonth: {
        type:      Sequelize.TINYINT.UNSIGNED,
        allowNull: true,
    },
    receivedDay: {
        type:      Sequelize.TINYINT.UNSIGNED,
        allowNull: true,
    },
} );

export default Award;
