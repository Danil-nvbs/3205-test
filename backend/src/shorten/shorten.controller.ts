import { Controller, Get, Post, Param, Redirect, Body, Ip, Delete, ValidationPipe } from '@nestjs/common';
import { ShortenService } from './shorten.service';
import { CreateShortenDto, DeleteShortenDto, GetShortenAnalyticsDto, GetShortenInfoDto } from './dto/index';


@Controller()
export class ShortenController {
    constructor(
        private readonly shortenService: ShortenService
    ) {}

    @Post('shorten')
    async createShorten(@Body(ValidationPipe) createShortenDto: CreateShortenDto) {
        return await this.shortenService.createShorten(createShortenDto); 
    }

    @Get(':shortUrl')
    @Redirect()
    async getByShortUrl(
        @Param('shortUrl') shortUrl: string,
        @Ip() clientIp: string
    ) {
        const url = await this.shortenService.getByShortUrl({ shortUrl, clientIp });
        return { url };
    }

    @Get('info/:shortUrl')
    async getShortUrlInfo(
        @Param(ValidationPipe) getShortenInfoDto: GetShortenInfoDto,
    ) {
        return await this.shortenService.getShortUrlInfo(getShortenInfoDto)         
    }

    @Delete('delete/:shortUrl')
    async deleteShortUrl(
        @Param(ValidationPipe) deleteShortenDto: DeleteShortenDto,
    ) {
        return await this.shortenService.deleteShortUrl(deleteShortenDto)
    }

    @Get('analytics/:shortUrl')
    async getShortenAnalytics(
        @Param(ValidationPipe) getShortenAnalyticsDto: GetShortenAnalyticsDto,
    ) {
        return await this.shortenService.getShortenAnalytics(getShortenAnalyticsDto)
    }
}
