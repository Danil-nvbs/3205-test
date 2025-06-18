import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript"
import { ShortenLog } from "./shorten-logs.model";

interface ShortenCreationAttrs {
    originalUrl: string;
    shortUrl: string;
    expiresAt?: Date;
    alias?: string;
}

@Table({ tableName: 'shortens' })
export class Shorten extends Model<Shorten, ShortenCreationAttrs> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false })
    id: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    shortUrl: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    originalUrl: string;

    @Column({ type: DataType.DATE })
    expiresAt: Date;

    @Column({ type: DataType.TEXT })
    alias: string;

    @HasMany(() => ShortenLog)
    logs: ShortenLog[];
}