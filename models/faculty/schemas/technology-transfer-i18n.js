import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import LanguageUtils from 'models/common/utils/language.js';

const TechnologyTransferI18n = faculty.define( 'technologyTransferI18n', {
    technologyTransferId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
        primaryKey: true,
    },
    language: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        primaryKey:   true,
        defaultValue: LanguageUtils.defaultLanguageId,
    },
    technology: {
        type:      Sequelize.STRING( 300 ),
        allowNull: false,
    },
    authorizingParty: {
        type:      Sequelize.STRING( 100 ),
        allowNull: false,
    },
    authorizedParty: {
        type:      Sequelize.STRING( 100 ),
        allowNull: false,
    },
} );

export default TechnologyTransferI18n;
