import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Shorten } from "./shorten.model";

interface LinkLogCreationAttrs {
    shorten_id: number;
    ip_address: string;
}

@Table({ tableName: 'shorten_logs' })
export class ShortenLog extends Model<ShortenLog, LinkLogCreationAttrs> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false })
    id: number;

    @ForeignKey(() => Shorten)
    @Column({ type: DataType.INTEGER, allowNull: false })
    shorten_id: number;

    @BelongsTo(() => Shorten)
    shorten: Shorten;

    @Column({ type: DataType.TEXT, allowNull: false })
    ip_address: string;
}