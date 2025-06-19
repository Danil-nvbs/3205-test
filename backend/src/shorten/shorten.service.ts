import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { nanoid } from 'nanoid';
import { Shorten } from './models/shorten.model';
import { ShortenLog } from './models/shorten-logs.model';
import { Op, Sequelize } from 'sequelize';
import { CreateShortenDto, DeleteShortenDto, GetShortenAnalyticsDto, GetShortenInfoDto } from './dto/index';

@Injectable()
export class ShortenService {
    constructor(
        @InjectModel(Shorten) private shorten: typeof Shorten,
        @InjectModel(ShortenLog) private shortenLog: typeof ShortenLog,
    ) {}

    private readonly logger = new Logger(ShortenService.name)

    async getByShortUrl({ shortUrl, clientIp }: {shortUrl: string, clientIp: string}): Promise<string> {
        let shorten = await this.shorten.findOne({
             where: {
                shortUrl,
                [Op.or]: [
                    { expiresAt: { [Op.gt]: new Date() } },
                    { expiresAt: { [Op.eq]: null as unknown as Date } },
                ],
            },
        });

        if (!shorten) throw new HttpException('Ссылка не существует или истекла', HttpStatus.BAD_REQUEST);
        await this.shortenLog.create({
            ip_address: clientIp,
            shorten_id: shorten.id,
        });
        return shorten.originalUrl;
    }

    async createShorten(createShortenDto: CreateShortenDto): Promise<Shorten> {
        const shorten = await this.shorten.create({
            ...createShortenDto,
            shortUrl: nanoid(8),
        });
        this.logger.log(`Создана ссылка ${shorten.shortUrl}`)
        return shorten
    }

    async getShortUrlInfo(getShortenInfo: GetShortenInfoDto) {
        let shorten = await this.shorten.findOne({
            where: { shortUrl: getShortenInfo.shortUrl },
            attributes: [
                'originalUrl',
                'createdAt',
                [Sequelize.literal('(SELECT COUNT(*) FROM shorten_logs WHERE shorten_logs.shorten_id = "Shorten".id)'), 'clickCount'],
            ],
        });
        if (!shorten) throw new HttpException('Ссылка не существует', HttpStatus.BAD_REQUEST);
        return shorten;
    }

    async deleteShortUrl(deleteShortenDto: DeleteShortenDto) {
        let shorten = await this.shorten.findOne({
            where: { shortUrl: deleteShortenDto.shortUrl },
        });

        if (!shorten) throw new HttpException('Ссылка не существует', HttpStatus.BAD_REQUEST);

        await shorten.destroy();
        return { deleted: true };
    }

    async getShortenAnalytics(getShortenAnalyticsDto: GetShortenAnalyticsDto) {
        let shorten = await this.shorten.findOne({
            where: { shortUrl: getShortenAnalyticsDto.shortUrl },
            include: [{
                model: ShortenLog,
                limit: 5,
                order: [['createdAt', 'DESC']],
                attributes: ['ip_address'],
            }],
            attributes: [
                [Sequelize.literal('(SELECT COUNT(*) FROM shorten_logs WHERE shorten_logs.shorten_id = "Shorten".id)'), 'clickCount'],
            ],
        });

        if (!shorten) throw new HttpException('Ссылка не существует', HttpStatus.BAD_REQUEST);
        return {
            clickCount: Number(shorten.get('clickCount')),
            lastClicksIps: shorten.logs.map(log => log.ip_address),
        };
    }
}
