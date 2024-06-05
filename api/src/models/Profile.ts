import { DataTypes, Model, Sequelize } from "sequelize";

export class Profile extends Model {
    public id!: number;
    public sex!: string;
    public bmi!: number;
    public address!: string;
    public user_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
    Profile.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            sex: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            bmi: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "profile",
            tableName: "profiles",
        }
    );


};