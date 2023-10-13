import { DataTypes, Model, Sequelize } from "sequelize";

export class MembershipPlan extends Model {
    public id!: string;
    public name!: string;
    public description!: string | null;
    public duration!:string;
    public maxMembers!:number|null;
    public price!: number;
    public image!: string | null;
    public userId!:number;
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
            userId: {
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
                type: DataTypes.STRING,
                allowNull: true,
            },
            maxMembers: {
                type: DataTypes.INTEGER,
                allowNull: true,
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
            modelName: "membershipPlan",
            tableName: "membership_plans",
            timestamps: true,
        }
    );
    
};
