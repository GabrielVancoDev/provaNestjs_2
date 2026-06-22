import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class User extends Model
{
    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER})
    declare id: number;

    @Column({ type: DataType.STRING })
    nome!: string;

    @Column({ type: DataType.STRING })
    cpf!:string;

    @Column({ type: DataType.STRING })
    telefone!:string;

    @Column({ type: DataType.STRING })
    matricula!:string;
}
