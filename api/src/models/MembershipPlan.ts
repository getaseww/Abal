import { DataTypes, Model, Sequelize } from "sequelize";

export class MembershipPlan extends Model {
    public id!: number;
    public name!: string;
    public description!: string | null;
    public duration!: number;
    public max_member!: number | null;
    public access_level: number;
    public price!: number;
    public image!: string | null;
    public user_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
    MembershipPlan.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            duration: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            max_member: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            access_level: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "membership_plan",
            tableName: "membership_plans",
            timestamps: true,
        }
    );

};
