import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ unique: true })
  email: string;

  @Column
  password: string;
}
