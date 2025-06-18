import { Controller, Get, Post, Param, Redirect, Body, Req, Ip, Delete, ValidationPipe } from '@nestjs/common';
import { ShortenService } from './shorten.service';
import { CreateShortenDto } from './dto/create-shorten.dto';
import { Request } from 'express';
import { GetShortenInfo } from './dto/get-shorten-info.dto';
import { DeleteShortenDto } from './dto/delete-shorten.dto';
import { GetShortenAnalyticsDto } from './dto/get-shorten-analytics.dto';


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
        @Param(ValidationPipe) getShortenInfo: GetShortenInfo,
    ) {
        return await this.shortenService.getShortUrlInfo(getShortenInfo)         
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
